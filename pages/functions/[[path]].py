from flask import Flask, request, render_template, redirect, url_for, flash, session, jsonify
from datetime import datetime
import os

# 初始化Flask应用（无debug/port参数）
app = Flask(__name__)

# 配置
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-here')

# 模拟数据（因为Cloudflare Pages不支持数据库）
# 在实际部署中，应该使用Cloudflare D1或其他云数据库
class MockUser:
    def __init__(self, id, username, email):
        self.id = id
        self.username = username
        self.email = email

class MockCategory:
    def __init__(self, id, name):
        self.id = id
        self.name = name

class MockPost:
    def __init__(self, id, title, content, author_id, category_id, views=0, likes=0):
        self.id = id
        self.title = title
        self.content = content
        self.author_id = author_id
        self.category_id = category_id
        self.views = views
        self.likes = likes
        self.created_at = datetime.now()
        self.updated_at = datetime.now()

class MockComment:
    def __init__(self, id, content, post_id, author_id):
        self.id = id
        self.content = content
        self.post_id = post_id
        self.author_id = author_id
        self.created_at = datetime.now()

class MockTag:
    def __init__(self, id, name):
        self.id = id
        self.name = name

# 创建模拟数据
users = [
    MockUser(1, 'admin', 'admin@example.com'),
    MockUser(2, 'user1', 'user1@example.com')
]

categories = [
    MockCategory(1, '技术'),
    MockCategory(2, '生活'),
    MockCategory(3, '学习'),
    MockCategory(4, '工作')
]

tags = [
    MockTag(1, 'Python'),
    MockTag(2, 'Flask'),
    MockTag(3, 'Web开发'),
    MockTag(4, '教程')
]

posts = [
    MockPost(1, '欢迎来到我的博客', '这是我的第一篇博客文章。在这里，我将分享我的技术心得和生活感悟。', 1, 1, 10, 2),
    MockPost(2, 'Flask入门教程', 'Flask是一个轻量级的Python Web框架，非常适合开发小型应用和API。本文将介绍Flask的基本用法。', 1, 1, 25, 5),
    MockPost(3, 'Cloudflare Pages部署指南', '本文介绍如何将Flask应用部署到Cloudflare Pages平台。', 1, 3, 15, 3),
    MockPost(4, 'Python学习心得', '分享我在学习Python过程中的一些心得体会。', 2, 3, 8, 1)
]

comments = [
    MockComment(1, '很好的文章！', 1, 2),
    MockComment(2, '学到了很多，谢谢分享！', 2, 2),
    MockComment(3, '期待更多精彩内容。', 1, 1)
]

# 辅助函数
def get_user_by_id(user_id):
    for user in users:
        if user.id == user_id:
            return user
    return None

def get_category_by_id(category_id):
    for category in categories:
        if category.id == category_id:
            return category
    return None

def get_post_by_id(post_id):
    for post in posts:
        if post.id == post_id:
            return post
    return None

def get_comments_by_post_id(post_id):
    return [comment for comment in comments if comment.post_id == post_id]

# 路由
@app.route('/')
def index():
    # 模拟分页
    page = request.args.get('page', 1, type=int)
    per_page = 5
    start = (page - 1) * per_page
    end = start + per_page
    paginated_posts = posts[start:end]
    
    # 模拟热门文章
    popular_posts = sorted(posts, key=lambda x: x.views, reverse=True)[:5]
    
    return render_template('index.html', 
                          posts=paginated_posts, 
                          categories=categories, 
                          popular_posts=popular_posts, 
                          tags=tags)

@app.route('/post/<int:post_id>')
def post_detail(post_id):
    post = get_post_by_id(post_id)
    if not post:
        return "文章不存在", 404
    
    # 增加阅读量
    post.views += 1
    
    post_comments = get_comments_by_post_id(post_id)
    
    # 获取上一篇和下一篇
    post_index = posts.index(post)
    prev_post = posts[post_index - 1] if post_index > 0 else None
    next_post = posts[post_index + 1] if post_index < len(posts) - 1 else None
    
    return render_template('post.html', 
                          post=post, 
                          comments=post_comments, 
                          prev_post=prev_post, 
                          next_post=next_post)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        
        # 检查用户名是否已存在
        if any(user.username == username for user in users):
            flash('用户名已存在', 'error')
            return redirect(url_for('register'))
        
        # 检查邮箱是否已存在
        if any(user.email == email for user in users):
            flash('邮箱已存在', 'error')
            return redirect(url_for('register'))
        
        # 创建新用户（在实际应用中应该保存到数据库）
        new_id = max(user.id for user in users) + 1
        users.append(MockUser(new_id, username, email))
        
        flash('注册成功，请登录', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username_or_email = request.form['username_or_email']
        password = request.form['password']
        
        # 在实际应用中应该验证密码，这里简化处理
        user = None
        for u in users:
            if u.username == username_or_email or u.email == username_or_email:
                user = u
                break
        
        if user:
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
        # 简单处理表单提交
        flash('您的消息已发送，我们将尽快回复您！', 'success')
    return render_template('contact.html')

@app.route('/categories')
def categories():
    return render_template('categories.html', categories=categories)

@app.route('/profile')
def profile():
    if 'user_id' not in session:
        flash('请先登录', 'warning')
        return redirect(url_for('login'))
    
    user = get_user_by_id(session['user_id'])
    user_posts = [post for post in posts if post.author_id == user.id]
    
    # 计算统计信息
    post_count = len(user_posts)
    comment_count = len([comment for comment in comments 
                        for post in user_posts if comment.post_id == post.id])
    view_count = sum(post.views for post in user_posts)
    
    # 获取用户创建的分类
    user_categories = []
    for post in user_posts:
        category = get_category_by_id(post.category_id)
        if category and category not in user_categories:
            user_categories.append(category)
    
    return render_template('profile.html', 
                          user=user, 
                          posts=user_posts, 
                          post_count=post_count, 
                          comment_count=comment_count, 
                          view_count=view_count,
                          user_categories=user_categories)

@app.route('/add_post', methods=['GET', 'POST'])
def add_post():
    if 'user_id' not in session:
        flash('请先登录', 'warning')
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        category_id = int(request.form['category_id'])
        
        # 创建新文章（在实际应用中应该保存到数据库）
        new_id = max(post.id for post in posts) + 1
        posts.append(MockPost(new_id, title, content, session['user_id'], category_id))
        
        flash('文章已发布', 'success')
        return redirect(url_for('post_detail', post_id=new_id))
    
    return render_template('edit_post.html', categories=categories, is_new=True)

@app.route('/category/<int:category_id>')
def category_posts(category_id):
    category = get_category_by_id(category_id)
    if not category:
        return "分类不存在", 404
    
    category_posts_list = [post for post in posts if post.category_id == category_id]
    popular_posts = sorted(posts, key=lambda x: x.views, reverse=True)[:5]
    
    return render_template('index.html', 
                          posts=category_posts_list, 
                          categories=categories, 
                          popular_posts=popular_posts, 
                          tags=tags, 
                          current_category=category)

@app.route('/tag/<int:tag_id>')
def tag_posts(tag_id):
    tag = next((t for t in tags if t.id == tag_id), None)
    if not tag:
        return "标签不存在", 404
    
    # 在实际应用中，应该根据标签筛选文章，这里简化处理
    tag_posts_list = posts[:2]  # 模拟标签关联的文章
    popular_posts = sorted(posts, key=lambda x: x.views, reverse=True)[:5]
    
    return render_template('index.html', 
                          posts=tag_posts_list, 
                          categories=categories, 
                          popular_posts=popular_posts, 
                          tags=tags, 
                          current_tag=tag)

# 自定义过滤器
@app.template_filter('datetimeformat')
def datetimeformat(value, format='%Y-%m-%d %H:%M:%S'):
    if isinstance(value, datetime):
        return value.strftime(format)
    return value

# 应用上下文处理器，在所有模板中可用
@app.context_processor
def inject_user():
    if 'user_id' in session:
        user = get_user_by_id(session['user_id'])
        return dict(current_user=user, now=datetime.now())
    return dict(current_user=None, now=datetime.now())

# 关键：Pages Functions入口（适配边缘运行时）
def on_request(context):
    """Cloudflare Pages Functions的请求处理入口"""
    # 忽略预览参数
    path = context.request.url.path.split('?')[0]
    
    # 将Pages的请求对象转为Flask可识别的格式
    with app.request_context(
        path=path,
        method=context.request.method,
        headers=dict(context.request.headers),
        data=context.request.body.read() if context.request.body else b''
    ):
        try:
            # 执行Flask路由匹配
            response = app.full_dispatch_request()
            # 返回Pages兼容的响应
            return new Response(
                response.response,
                status=response.status_code,
                headers=dict(response.headers)
            )
        except Exception as e:
            return new Response(f"Error: {str(e)}", status=500)