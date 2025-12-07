# 根目录/functions/[[path]].py（Pages原生Python Functions）
# 无需Flask框架，直接处理请求
def on_request(context):
    request = context.request
    path = request.url.path
    method = request.method

    # 模拟Flask路由逻辑
    if path == "/":
        return Response("博客首页 - 部署成功！", status=200)
    elif path == "/api/user" and method == "GET":
        # 获取URL参数（模拟Flask的request.args）
        name = request.url.search_params.get("name", "guest")
        return Response(
            f'{{"name":"{name}","status":"success"}}',
            status=200,
            headers={"Content-Type": "application/json"}
        )
    elif path.startswith("/post/"):
        # 模拟动态路由（如/post/123）
        post_id = path.split("/")[-1]
        return Response(f"文章ID：{post_id}，内容加载成功", status=200)
    elif path == "/about":
        return Response("关于我们页面", status=200)
    elif path == "/contact":
        return Response("联系我们页面", status=200)
    elif path == "/categories":
        return Response("博客分类页面", status=200)
    elif path == "/login" and method == "POST":
        # 处理登录请求
        return Response(
            '{"status":"success","message":"登录成功"}',
            status=200,
            headers={"Content-Type": "application/json"}
        )
    elif path == "/register" and method == "POST":
        # 处理注册请求
        return Response(
            '{"status":"success","message":"注册成功"}',
            status=200,
            headers={"Content-Type": "application/json"}
        )
    else:
        return Response("404 Not Found", status=404)

# 必须定义Response类（Pages运行时无默认）
class Response:
    def __init__(self, body, status=200, headers=None):
        self.body = body.encode('utf-8') if isinstance(body, str) else body
        self.status = status
        self.headers = headers or {}

    def __call__(self, environ, start_response):
        start_response(f"{self.status} OK", [(k, v) for k, v in self.headers.items()])
        return [self.body]