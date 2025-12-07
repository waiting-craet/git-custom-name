# 必须是根目录/functions/[[path]].py，文件名严格双中括号
from flask import Flask, request

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
    # 构造Flask请求上下文
    with app.request_context(
        path=context.request.url.path,
        method=context.request.method,
        headers=dict(context.request.headers),
        data=context.request.body.read() if context.request.body else b'',
        query_string=context.request.url.query
    ):
        try:
            # 执行Flask路由匹配
            response = app.full_dispatch_request()
            # 返回Pages兼容的响应
            return Response(
                response.response,
                status=response.status_code,
                headers=dict(response.headers)
            )
        except Exception as e:
            return Response(f"错误：{str(e)}", status=500)

# 必须定义Response类（Pages运行时无默认Response）
class Response:
    def __init__(self, body, status=200, headers=None):
        self.body = body if isinstance(body, bytes) else str(body).encode('utf-8')
        self.status = status
        self.headers = headers or {}

    def __call__(self, environ, start_response):
        start_response(f"{self.status} OK", [(k, v) for k, v in self.headers.items()])
        return [self.body]