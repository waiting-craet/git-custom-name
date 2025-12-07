# 必须是根目录/functions/[[path]].py，文件名严格双中括号
from flask import Flask, request, jsonify
import json

# 初始化Flask应用（无任何本地运行参数）
app = Flask(__name__)

# 根路由（测试用，必须保留）
@app.route('/')
def index():
    return "Flask部署成功！", 200

# 测试API路由
@app.route('/api/test')
def test_api():
    return {"status": "success", "message": "API正常响应"}, 200

# Pages Functions核心入口（必须有，否则识别不到路由）
def on_request(context):
    """Cloudflare Pages的请求入口函数"""
    # 获取请求信息
    req = context.request
    path = req.url.path
    method = req.method
    headers = dict(req.headers)
    
    # 构造Flask请求环境
    environ = {
        'REQUEST_METHOD': method,
        'PATH_INFO': path,
        'SERVER_NAME': 'cloudflare.pages.dev',
        'SERVER_PORT': '443',
        'wsgi.url_scheme': 'https',
        'wsgi.input': req.body if req.body else b'',
        'wsgi.errors': None,
        'wsgi.version': (1, 0),
        'wsgi.multithread': False,
        'wsgi.multiprocess': False,
        'wsgi.run_once': False,
    }
    
    # 添加请求头
    for key, value in headers.items():
        key = key.upper().replace('-', '_')
        if key not in ('CONTENT_TYPE', 'CONTENT_LENGTH'):
            key = f'HTTP_{key}'
        environ[key] = value
    
    try:
        # 执行Flask应用
        response = app(environ, lambda status, headers: None)
        
        # 提取响应内容
        response_data = b''.join(response)
        
        # 返回Pages兼容的响应
        return new_response(response_data, status=200, headers={'Content-Type': 'text/html'})
    except Exception as e:
        return new_response(f"错误：{str(e)}", status=500, headers={'Content-Type': 'text/plain'})

# 必须定义Response类（Pages运行时无默认Response）
def new_response(body, status=200, headers=None):
    """创建Cloudflare Pages兼容的响应"""
    if isinstance(body, dict):
        body = json.dumps(body)
        if headers is None:
            headers = {}
        headers['Content-Type'] = 'application/json'
    
    if isinstance(body, str):
        body = body.encode('utf-8')
    
    return {
        'status': status,
        'headers': headers or {},
        'body': body
    }