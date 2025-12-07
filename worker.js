// worker.js（Workers部署Flask的核心入口）
import { Python } from 'https://cdn.jsdelivr.net/npm/@cloudflare/python-wasm@0.2.1/+esm';

// 初始化Python运行时
const python = new Python();

// Flask应用的Python代码（内联写入，无需单独app.py）
const flaskCode = `
import sys
sys.path.append('/tmp')

from flask import Flask, jsonify, request, render_template, redirect, url_for, flash, session
from datetime import datetime
import os

# 初始化Flask应用
app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-here')

# 模拟数据（因为Cloudflare Workers不支持数据库）
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
    MockPost(3, 'Cloudflare Workers部署指南', '本文介绍如何将Flask应用部署到Cloudflare Workers平台。', 1, 3, 15, 3),
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

# 定义Flask路由（保留你所有的业务逻辑）
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
    
    # 简化响应，返回JSON而非HTML
    return jsonify({
        "message": "Flask on Cloudflare Workers - 部署成功！",
        "posts": [{"id": p.id, "title": p.title, "views": p.views} for p in paginated_posts],
        "popular_posts": [{"id": p.id, "title": p.title} for p in popular_posts]
    })

@app.route('/post/<int:post_id>')
def post_detail(post_id):
    post = get_post_by_id(post_id)
    if not post:
        return jsonify({"error": "文章不存在"}), 404
    
    # 增加阅读量
    post.views += 1
    
    post_comments = get_comments_by_post_id(post_id)
    
    # 获取上一篇和下一篇
    post_index = posts.index(post)
    prev_post = posts[post_index - 1] if post_index > 0 else None
    next_post = posts[post_index + 1] if post_index < len(posts) - 1 else None
    
    return jsonify({
        "post": {
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "views": post.views,
            "likes": post.likes
        },
        "comments": [{"id": c.id, "content": c.content} for c in post_comments],
        "prev_post": {"id": prev_post.id, "title": prev_post.title} if prev_post else None,
        "next_post": {"id": next_post.id, "title": next_post.title} if next_post else None
    })

@app.route('/api/user/<name>')
def user(name):
    return jsonify({"name": name, "status": "success"})

@app.route('/about')
def about():
    return jsonify({"message": "关于我们页面", "status": "success"})

@app.route('/contact')
def contact():
    return jsonify({"message": "联系我们页面", "status": "success"})

@app.route('/categories')
def categories_list():
    return jsonify({
        "categories": [{"id": c.id, "name": c.name} for c in categories],
        "status": "success"
    })

@app.route('/login', methods=['POST'])
def login():
    # 简化处理，实际应用中应该验证密码
    username_or_email = request.json.get('username_or_email', '') if request.is_json else request.form.get('username_or_email', '')
    
    user = None
    for u in users:
        if u.username == username_or_email or u.email == username_or_email:
            user = u
            break
    
    if user:
        return jsonify({"status": "success", "message": "登录成功", "user": {"id": user.id, "username": user.username}})
    else:
        return jsonify({"status": "error", "message": "用户名/邮箱或密码错误"}), 401

@app.route('/register', methods=['POST'])
def register():
    # 简化处理，实际应用中应该验证密码和检查重复
    username = request.json.get('username', '') if request.is_json else request.form.get('username', '')
    email = request.json.get('email', '') if request.is_json else request.form.get('email', '')
    
    # 检查用户名是否已存在
    if any(user.username == username for user in users):
        return jsonify({"status": "error", "message": "用户名已存在"}), 400
    
    # 检查邮箱是否已存在
    if any(user.email == email for user in users):
        return jsonify({"status": "error", "message": "邮箱已存在"}), 400
    
    # 创建新用户
    new_id = max(user.id for user in users) + 1
    users.append(MockUser(new_id, username, email))
    
    return jsonify({"status": "success", "message": "注册成功", "user": {"id": new_id, "username": username}})

# WSGI入口（必须）
application = app.wsgi_app

# 模拟WSGI服务器处理请求
def handle_request(path, method, headers, body):
    from werkzeug.test import create_environ
    from werkzeug.wrappers import Request, Response
    
    # 解析查询参数
    query_string = ""
    if "?" in path:
        path, query_string = path.split("?", 1)
    
    environ = create_environ(
        path=path,
        method=method,
        headers=headers,
        data=body,
        query_string=query_string
    )
    
    response = Response.from_app(application, environ)
    return {
        "status": response.status_code,
        "headers": dict(response.headers),
        "body": response.get_data(as_text=True)
    }
`;

// 加载Flask代码到Python运行时
await python.run(flaskCode);

// Workers主请求处理函数
export default {
  async fetch(request, env, ctx) {
    try {
      // 解析请求参数
      const url = new URL(request.url);
      const path = url.pathname + url.search;
      const method = request.method;
      const headers = Object.fromEntries(request.headers.entries());
      const body = await request.text();

      // 调用Python中的handle_request函数
      const result = await python.call("handle_request", [path, method, headers, body]);

      // 返回响应
      return new Response(result.body, {
        status: result.status,
        headers: result.headers
      });
    } catch (e) {
      return new Response(`Error: ${e.message}`, { status: 500 });
    }
  }
};