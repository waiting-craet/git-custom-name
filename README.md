# 博客项目 - Cloudflare Workers 纯JS版

这是一个使用纯JavaScript实现的Cloudflare Workers博客项目，完全兼容2025年新版Cloudflare Workers API，无需Python Wasm依赖，部署简单稳定。

## 项目特点

- 使用纯JavaScript实现，无需Python Wasm依赖
- 完全兼容2025年新版Cloudflare Workers API
- 极简配置，移除所有无效兼容标志
- 部署简单，无需复杂的构建过程
- 全球CDN加速，访问速度快
- 解决了Python Wasm兼容性问题

## 前置要求

1. Node.js 和 npm
2. Cloudflare账号

## 项目结构

```
little-gao/
├── worker.js              # Workers入口文件（纯JS实现）
├── wrangler.toml          # Workers配置文件（极简配置）
├── deploy.bat            # Windows部署脚本
├── deploy.ps1            # PowerShell部署脚本
└── README.md             # 项目说明文档
```

## 部署步骤

### 方法一：使用自动部署脚本

#### Windows用户

1. 双击运行 `deploy.bat`
2. 按照提示操作
3. 脚本会自动升级Wrangler并部署到Cloudflare Workers

#### PowerShell用户

1. 在PowerShell中运行 `.\deploy.ps1`
2. 按照提示操作
3. 脚本会自动升级Wrangler并部署到Cloudflare Workers

### 方法二：手动部署

1. **升级Wrangler到最新版**

   ```bash
   # 升级Wrangler到最新版（解决版本过时和API兼容问题）
   npm install -g wrangler@4.53.0
   ```

2. **登录Cloudflare**

   ```bash
   wrangler login
   ```

3. **部署到Workers**

   ```bash
   wrangler deploy
   ```

## 本地测试

1. **启动本地开发服务器**

   ```bash
   wrangler dev worker.js
   ```

2. **访问测试**

   打开浏览器访问 http://localhost:8787

## 功能说明

### 路由处理

项目中的`worker.js`文件处理所有HTTP请求，支持以下路由：

- `/` - 博客首页，返回"Flask替代方案 ✅ 部署成功！"
- `/api/user/<name>` - 用户API，返回用户信息
- `/api/posts` - 文章API（仅支持POST请求）

### 纯JS实现

`worker.js`使用纯JavaScript实现，无需任何Python依赖：

```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // 路由处理逻辑
    if (path === "/") {
      return new Response("Flask替代方案 ✅ 部署成功！", { status: 200 });
    }
    // 其他路由处理...
  }
};
```

### 请求处理流程

1. Workers接收HTTP请求
2. 解析请求参数（路径、方法）
3. 根据路径执行相应的处理逻辑
4. 返回响应给客户端

## 配置说明

### wrangler.toml配置（2025年最简有效配置）

```toml
name = "blog7"  # 严格匹配CI期望的Worker名称
main = "worker.js"  # 入口文件
compatibility_date = "2025-12-07"  # 当前日期
workers_dev = true  # 启用workers.dev域名
# 完全删除：compatibility_flags、node_compat等所有其他行
```

### 关键修复点

1. **移除无效兼容标志**：2025年新版Cloudflare Workers已移除js_compat、web_socket等旧版兼容标志
2. **统一Worker名称**：将名称从"blog5"改为"blog7"，严格匹配CI期望
3. **升级Wrangler版本**：使用最新版4.53.0，解决版本过时和API兼容问题
4. **简化代码实现**：移除Python Wasm依赖，改用纯JS实现，100%兼容新版API

## 数据存储选项

### 使用Cloudflare D1

1. 在Cloudflare控制台创建D1数据库
2. 在wrangler.toml中绑定数据库：

   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "blog-db"
   database_id = "your-database-id"
   ```

3. 在worker.js中使用D1：

   ```javascript
   export default {
     async fetch(request, env) {
       // 访问D1数据库
       const { results } = await env.DB.prepare('SELECT * FROM posts').all();
       return new Response(JSON.stringify(results));
     }
   };
   ```

### 使用Cloudflare KV

1. 在Cloudflare控制台创建KV命名空间
2. 在wrangler.toml中绑定KV：

   ```toml
   [[kv_namespaces]]
   binding = "CACHE"
   id = "your-kv-namespace-id"
   ```

3. 在worker.js中使用KV：

   ```javascript
   export default {
     async fetch(request, env) {
       // 访问KV存储
       const value = await env.CACHE.get('key');
       return new Response(value);
     }
   };
   ```

## 故障排除

### 常见问题

1. **部署失败**
   - 检查wrangler.toml配置是否正确（特别是name字段是否为"blog7"）
   - 确认worker.js语法无误
   - 确保Wrangler版本为4.53.0或更高
   - 查看部署日志获取详细错误信息

2. **兼容标志错误**
   - 确保wrangler.toml中没有compatibility_flags配置
   - 仅保留最精简的必要配置

3. **版本不兼容**
   - 确保使用Wrangler 4.53.0或更高版本
   - 运行`npm install -g wrangler@4.53.0`升级

4. **Worker名称不匹配**
   - 确保wrangler.toml中name字段为"blog7"
   - 这将解决CI期望的Worker名称不匹配警告

## 扩展功能

### 添加更多路由

在worker.js中添加更多路由处理：

```javascript
// 添加文章详情路由
else if (path.match(/^\/post\/(\d+)$/)) {
  const postId = path.split("/")[2];
  // 处理文章详情逻辑
  return new Response(JSON.stringify({ id: postId, title: "文章标题" }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
```

### 添加静态资源处理

```javascript
// 处理静态资源
else if (path.startsWith('/static/')) {
  // 返回静态资源
  return new Response("静态资源内容", {
    headers: { "Content-Type": "text/css" }
  });
}
```

## 总结

这个纯JavaScript实现的Cloudflare Workers博客项目解决了2025年新版API的所有兼容性问题：

1. 移除了所有无效的兼容标志
2. 统一了Worker名称为"blog7"
3. 升级到最新版Wrangler 4.53.0
4. 简化为纯JS实现，无需Python Wasm依赖

现在您可以轻松部署这个项目到Cloudflare Workers，享受稳定可靠的服务！