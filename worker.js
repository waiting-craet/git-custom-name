// worker.js（核心文件）
import { wrapFetch } from 'https://cdn.jsdelivr.net/npm/@cloudflare/flask-adapter@0.1.0/+esm';
import { createPythonRuntime } from 'https://cdn.jsdelivr.net/npm/@cloudflare/python-wasm@0.2.0/+esm';

// 初始化Python运行时
const pythonRuntime = await createPythonRuntime({
  version: '3.9', // 匹配你的Python版本
});

// Flask应用的Python代码（内联或读取文件）
const flaskAppCode = `
from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'  # 将替换为Cloudflare D1
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# 定义模型
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    posts = db.relationship('Post', backref='author', lazy=True)
    comments = db.relationship('Comment', backref='author', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.Text)
    posts = db.relationship('Post', backref='category', lazy=True)

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    posts = db.relationship('Post', secondary='post_tag', backref='tags', lazy=True)

# 文章标签关联表
post_tag = db.Table('post_tag',
    db.Column('post_id', db.Integer, db.ForeignKey('post.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True)
)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    summary = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    view_count = db.Column(db.Integer, default=0)
    like_count = db.Column(db.Integer, default=0)
    comments = db.relationship('Comment', backref='post', lazy=True, cascade="all, delete-orphan")
    tags = db.relationship('Tag', secondary='post_tag', backref='posts', lazy=True)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('comment.id'))
    replies = db.relationship('Comment', backref=db.backref('parent', remote_side=[id]))

# 辅助函数
def get_categories():
    return Category.query.all()

def get_tags():
    return Tag.query.all()

def get_recent_posts(limit=5):
    return Post.query.order_by(Post.created_at.desc()).limit(limit).all()

# 路由
@app.route('/')
def index():
    page = request.args.get('page', 1, type=int)
    posts = Post.query.order_by(Post.created_at.desc()).paginate(
        page=page, per_page=5, error_out=False)
    return render_template('index.html', posts=posts, 
                          categories=get_categories(), 
                          tags=get_tags(),
                          recent_posts=get_recent_posts())

@app.route('/post/<int:post_id>')
def post(post_id):
    post = Post.query.get_or_404(post_id)
    post.view_count += 1
    db.session.commit()
    return render_template('post.html', post=post,
                          categories=get_categories(),
                          tags=get_tags(),
                          recent_posts=get_recent_posts())

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        
        if User.query.filter_by(username=username).first():
            flash('用户名已存在')
            return redirect(url_for('register'))
        
        if User.query.filter_by(email=email).first():
            flash('邮箱已被注册')
            return redirect(url_for('register'))
        
        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        
        flash('注册成功，请登录')
        return redirect(url_for('login'))
    
    return render_template('register.html', 
                          categories=get_categories(),
                          tags=get_tags(),
                          recent_posts=get_recent_posts())

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        user = User.query.filter_by(username=username).first()
        
        if user and user.check_password(password):
            session['user_id'] = user.id
            flash('登录成功')
            return redirect(url_for('index'))
        
        flash('用户名或密码错误')
    
    return render_template('login.html',
                          categories=get_categories(),
                          tags=get_tags(),
                          recent_posts=get_recent_posts())

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    flash('已退出登录')
    return redirect(url_for('index'))

@app.route('/categories')
def categories():
    categories = Category.query.all()
    return render_template('categories.html', categories=categories,
                          categories_list=get_categories(),
                          tags=get_tags(),
                          recent_posts=get_recent_posts())

@app.route('/category/<int:category_id>')
def category_posts(category_id):
    category = Category.query.get_or_404(category_id)
    page = request.args.get('page', 1, type=int)
    posts = Post.query.filter_by(category_id=category_id).order_by(Post.created_at.desc()).paginate(
        page=page, per_page=5, error_out=False)
    return render_template('category_posts.html', category=category, posts=posts,
                          categories=get_categories(),
                          tags=get_tags(),
                          recent_posts=get_recent_posts())

@app.route('/tags')
def tags():
    tags = Tag.query.all()
    return render_template('tags.html', tags=tags,
                          categories=get_categories(),
                          tags_list=get_tags(),
                          recent_posts=get_recent_posts())

@app.route('/tag/<int:tag_id>')
def tag_posts(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    page = request.args.get('page', 1, type=int)
    posts = Post.query.filter(Post.tags.contains(tag)).order_by(Post.created_at.desc()).paginate(
        page=page, per_page=5, error_out=False)
    return render_template('tag_posts.html', tag=tag, posts=posts,
                          categories=get_categories(),
                          tags=get_tags(),
                          recent_posts=get_recent_posts())

@app.route('/about_us')
def about_us():
    return render_template('about_us.html',
                          categories=get_categories(),
                          tags=get_tags(),
                          recent_posts=get_recent_posts())

@app.route('/contact')
def contact():
    return render_template('contact.html',
                          categories=get_categories(),
                          tags=get_tags(),
                          recent_posts=get_recent_posts())

# API路由
@app.route('/api/posts')
def get_posts():
    posts = Post.query.all()
    return jsonify([{"id": p.id, "title": p.title, "content": p.content[:100] + "...", 
                    "author": p.author.username, "created_at": p.created_at.isoformat()} 
                   for p in posts])

# 初始化数据库
@app.before_first_request
def create_tables():
    db.create_all()
    
    # 创建默认分类
    if not Category.query.first():
        categories = [
            Category(name='技术', description='技术相关文章'),
            Category(name='生活', description='生活随笔'),
            Category(name='学习', description='学习笔记')
        ]
        for category in categories:
            db.session.add(category)
        
        # 创建默认标签
        tags = [
            Tag(name='Flask'),
            Tag(name='Python'),
            Tag(name='Web开发'),
            Tag(name='教程'),
            Tag(name='数据分析')
        ]
        for tag in tags:
            db.session.add(tag)
        
        # 创建默认管理员用户
        admin = User(username='admin', email='admin@example.com')
        admin.set_password('admin123')
        db.session.add(admin)
        
        db.session.commit()
        
        # 创建示例文章
        tech_category = Category.query.filter_by(name='技术').first()
        flask_tag = Tag.query.filter_by(name='Flask').first()
        python_tag = Tag.query.filter_by(name='Python').first()
        
        posts = [
            {
                'title': '欢迎来到小高博客',
                'content': '这是小高博客的首页。在这里，您可以分享您的技术心得和生活感悟。',
                'summary': '小高博客首页',
                'author': admin,
                'category': tech_category,
                'tags': [flask_tag, python_tag]
            },
            {
                'title': 'Flask入门教程',
                'content': 'Flask是一个轻量级的Python Web框架，非常适合开发小型应用和API。本文将介绍Flask的基本用法。',
                'summary': 'Flask入门教程',
                'author': admin,
                'category': tech_category,
                'tags': [flask_tag]
            }
        ]
        
        for post_data in posts:
            post = Post(
                title=post_data['title'],
                content=post_data['content'],
                summary=post_data['summary'],
                author=post_data['author'],
                category=post_data['category']
            )
            post.tags = post_data['tags']
            db.session.add(post)
        
        db.session.commit()

# WSGI入口
application = app.wsgi_app
`;

// 运行WSGI应用
const fetch = wrapFetch(pythonRuntime, flaskAppCode);
export default { fetch };