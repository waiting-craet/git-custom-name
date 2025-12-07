from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# 根据环境配置数据库
if os.environ.get('CLOUDFLARE_ENV') == 'production':
    # Cloudflare Pages 生产环境
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-here')
    # 在生产环境中，应该使用 Cloudflare D1 或其他云数据库
    # 这里暂时使用 SQLite，但实际部署时需要更改
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///blog.db')
else:
    # 本地开发环境
    app.config['SECRET_KEY'] = 'your-secret-key-here'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 初始化数据库
db = SQLAlchemy(app)

# 数据库模型
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    posts = db.relationship('Post', backref='author', lazy=True)
    comments = db.relationship('Comment', backref='author', lazy=True)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    posts = db.relationship('Post', backref='category', lazy=True)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    views = db.Column(db.Integer, default=0)
    likes = db.Column(db.Integer, default=0)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    comments = db.relationship('Comment', backref='post', lazy=True)
    tags = db.relationship('Tag', secondary='post_tags', backref='posts')

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)

class PostTag(db.Model):
    __tablename__ = 'post_tags'
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), primary_key=True)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# 辅助函数
def create_default_categories():
    # 创建默认分类
    default_categories = ['技术', '生活', '学习', '工作']
    for category_name in default_categories:
        category = Category.query.filter_by(name=category_name).first()
        if not category:
            category = Category(name=category_name)
            db.session.add(category)
    db.session.commit()

# 路由
@app.route('/')
def index():
    page = request.args.get('page', 1, type=int)
    posts = Post.query.order_by(Post.created_at.desc()).paginate(page=page, per_page=5)
    categories = Category.query.all()
    popular_posts = Post.query.order_by(Post.views.desc()).limit(5).all()
    # 获取所有标签
    tags = Tag.query.all()
    return render_template('index.html', posts=posts, categories=categories, popular_posts=popular_posts, tags=tags)

@app.route('/post/<int:post_id>')
def post_detail(post_id):
    post = Post.query.get_or_404(post_id)
    # 增加阅读量
    post.views += 1
    db.session.commit()
    comments = Comment.query.filter_by(post_id=post_id).order_by(Comment.created_at.desc()).all()
    # 获取上一篇和下一篇
    prev_post = Post.query.filter(Post.id < post_id).order_by(Post.id.desc()).first()
    next_post = Post.query.filter(Post.id > post_id).order_by(Post.id).first()
    return render_template('post.html', post=post, comments=comments, prev_post=prev_post, next_post=next_post)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        
        # 检查用户名是否已存在
        if User.query.filter_by(username=username).first():
            flash('用户名已存在', 'error')
            return redirect(url_for('register'))
        
        # 检查邮箱是否已存在
        if User.query.filter_by(email=email).first():
            flash('邮箱已存在', 'error')
            return redirect(url_for('register'))
        
        # 创建新用户
        user = User(
            username=username,
            email=email,
            password_hash=generate_password_hash(password)
        )
        db.session.add(user)
        db.session.commit()
        
        flash('注册成功，请登录', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username_or_email = request.form['username_or_email']
        password = request.form['password']
        
        # 尝试通过用户名或邮箱查找用户
        user = User.query.filter((User.username == username_or_email) | (User.email == username_or_email)).first()
        
        if user and check_password_hash(user.password_hash, password):
            session['user_id'] = user.id
            flash('登录成功', 'success')
            return redirect(url_for('index'))
        else:
            flash('用户名/邮箱或密码错误', 'error')
            return redirect(url_for('login'))
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    flash('已退出登录', 'info')
    return redirect(url_for('index'))

@app.route('/about_us')
def about_us():
    return render_template('about_us.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # 简单处理表单提交，可以后续扩展保存到数据库或发送邮件
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject')
        message = request.form.get('message')
        flash('您的消息已发送，我们将尽快回复您！', 'success')
    return render_template('contact.html')

@app.route('/categories')
def categories():
    categories = Category.query.all()
    return render_template('categories.html', categories=categories)

@app.route('/profile')
def profile():
    if 'user_id' not in session:
        flash('请先登录', 'warning')
        return redirect(url_for('login'))
    
    user = User.query.get(session['user_id'])
    user_posts = Post.query.filter_by(author_id=user.id).order_by(Post.created_at.desc()).all()
    
    # 计算统计信息
    post_count = Post.query.filter_by(author_id=user.id).count()
    comment_count = Comment.query.join(Post).filter(Post.author_id == user.id).count()
    view_count = sum(post.views for post in user_posts)
    
    # 获取用户创建的分类
    user_categories = Category.query.join(Post).filter(Post.author_id == user.id).distinct().all()
    
    return render_template('profile.html', user=user, posts=user_posts, 
                           post_count=post_count, comment_count=comment_count, view_count=view_count,
                           user_categories=user_categories)

@app.route('/edit_post/<int:post_id>', methods=['GET', 'POST'])
def edit_post(post_id):
    if 'user_id' not in session:
        flash('请先登录', 'warning')
        return redirect(url_for('login'))
    
    post = Post.query.get_or_404(post_id)
    
    # 检查是否是作者
    if post.author_id != session['user_id']:
        flash('没有权限编辑此文章', 'error')
        return redirect(url_for('post_detail', post_id=post_id))
    
    categories = Category.query.all()
    
    if request.method == 'POST':
        post.title = request.form['title']
        post.content = request.form['content']
        post.category_id = request.form['category_id']
        
        # 处理标签
        tag_names = [tag.strip() for tag in request.form['tags'].split(',') if tag.strip()]
        post.tags = []
        for tag_name in tag_names:
            tag = Tag.query.filter_by(name=tag_name).first()
            if not tag:
                tag = Tag(name=tag_name)
                db.session.add(tag)
            post.tags.append(tag)
        
        db.session.commit()
        flash('文章已更新', 'success')
        return redirect(url_for('post_detail', post_id=post.id))
    
    # 将标签转换为逗号分隔的字符串
    tag_string = ', '.join(tag.name for tag in post.tags)
    
    return render_template('edit_post.html', post=post, categories=categories, tag_string=tag_string)

@app.route('/add_post', methods=['GET', 'POST'])
def add_post():
    if 'user_id' not in session:
        flash('请先登录', 'warning')
        return redirect(url_for('login'))
    
    categories = Category.query.all()
    
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        category_id = request.form['category_id']
        
        # 创建新文章
        post = Post(
            title=title,
            content=content,
            category_id=category_id,
            author_id=session['user_id']
        )
        db.session.add(post)
        
        # 处理标签
        tag_names = [tag.strip() for tag in request.form['tags'].split(',') if tag.strip()]
        for tag_name in tag_names:
            tag = Tag.query.filter_by(name=tag_name).first()
            if not tag:
                tag = Tag(name=tag_name)
                db.session.add(tag)
            post.tags.append(tag)
        
        db.session.commit()
        flash('文章已发布', 'success')
        return redirect(url_for('post_detail', post_id=post.id))
    
    return render_template('edit_post.html', categories=categories, is_new=True)

@app.route('/delete_post/<int:post_id>')
def delete_post(post_id):
    if 'user_id' not in session:
        flash('请先登录', 'warning')
        return redirect(url_for('login'))
    
    post = Post.query.get_or_404(post_id)
    
    # 检查是否是作者
    if post.author_id != session['user_id']:
        flash('没有权限删除此文章', 'error')
        return redirect(url_for('post_detail', post_id=post_id))
    
    db.session.delete(post)
    db.session.commit()
    flash('文章已删除', 'success')
    return redirect(url_for('index'))

@app.route('/like_post/<int:post_id>')
def like_post(post_id):
    if 'user_id' not in session:
        return jsonify({'status': 'error', 'message': '请先登录'})
    
    post = Post.query.get_or_404(post_id)
    post.likes += 1
    db.session.commit()
    
    return jsonify({'status': 'success', 'likes': post.likes})

@app.route('/add_comment/<int:post_id>', methods=['POST'])
def add_comment(post_id):
    if 'user_id' not in session:
        return jsonify({'status': 'error', 'message': '请先登录'})
    
    content = request.form['content']
    if not content.strip():
        return jsonify({'status': 'error', 'message': '评论内容不能为空'})
    
    comment = Comment(
        content=content,
        post_id=post_id,
        author_id=session['user_id']
    )
    db.session.add(comment)
    db.session.commit()
    
    user = User.query.get(session['user_id'])
    
    return jsonify({
        'status': 'success',
        'comment': {
            'id': comment.id,
            'content': comment.content,
            'created_at': comment.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'author': user.username
        }
    })

@app.route('/category/<int:category_id>')
def category_posts(category_id):
    category = Category.query.get_or_404(category_id)
    page = request.args.get('page', 1, type=int)
    posts = Post.query.filter_by(category_id=category_id).order_by(Post.created_at.desc()).paginate(page=page, per_page=5)
    categories = Category.query.all()
    popular_posts = Post.query.order_by(Post.views.desc()).limit(5).all()
    tags = Tag.query.all()
    
    return render_template('index.html', posts=posts, categories=categories, popular_posts=popular_posts, tags=tags, current_category=category)

@app.route('/tag/<int:tag_id>')
def tag_posts(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    page = request.args.get('page', 1, type=int)
    posts = tag.posts
    categories = Category.query.all()
    popular_posts = Post.query.order_by(Post.views.desc()).limit(5).all()
    tags = Tag.query.all()
    
    return render_template('index.html', posts=posts, categories=categories, popular_posts=popular_posts, tags=tags, current_tag=tag)

# 自定义过滤器
@app.template_filter('datetimeformat')
def datetimeformat(value, format='%Y-%m-%d %H:%M:%S'):
    if isinstance(value, datetime):
        return value.strftime(format)
    return value

# 应用上下文处理器，在所有模板中可用
@app.context_processor
def inject_user():
    from datetime import datetime
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        return dict(current_user=user, now=datetime.now())
    return dict(current_user=None, now=datetime.now())

# 初始化应用
with app.app_context():
    # 创建数据库表
    db.create_all()
    # 创建默认分类
    create_default_categories()
    # 创建一些示例数据
    if not User.query.first():
        # 创建测试用户
        admin = User(
            username='admin',
            email='admin@example.com',
            password_hash=generate_password_hash('admin123')
        )
        db.session.add(admin)
        db.session.commit()
        
        # 创建测试文章
        category = Category.query.first()
        if category:
            post1 = Post(
                title='欢迎来到我的博客',
                content='这是我的第一篇博客文章。在这里，我将分享我的技术心得和生活感悟。',
                category_id=category.id,
                author_id=admin.id
            )
            post2 = Post(
                title='Flask入门教程',
                content='Flask是一个轻量级的Python Web框架，非常适合开发小型应用和API。本文将介绍Flask的基本用法。',
                category_id=category.id,
                author_id=admin.id
            )
            db.session.add_all([post1, post2])
            db.session.commit()

if __name__ == '__main__':
    app.run(debug=True, port=5009)
