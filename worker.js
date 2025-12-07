// worker.js（纯JS版，无任何Python依赖）
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // 模拟Flask的路由逻辑
    if (path === "/") {
      return new Response("Flask替代方案 ✅ 部署成功！", { status: 200 });
    }
    // 模拟/api/user/<name>路由
    else if (path.match(/^\/api\/user\/(\w+)$/)) {
      const name = path.split("/")[3];
      return new Response(JSON.stringify({
        name: name,
        message: "Hello from Cloudflare Workers!",
        status: "success"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    // 模拟POST请求
    else if (path === "/api/posts" && method === "POST") {
      const data = await request.json();
      return new Response(JSON.stringify({
        received: data,
        code: 201
      }), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      });
    }
    // 404处理
    else {
      return new Response("404 Not Found", { status: 404 });
    }
  }
};