# 博客项目 - Cloudflare Workers + Python Wasm版

这是一个使用Cloudflare Workers和Python Wasm部署的Flask博客项目，通过JavaScript调用Python Wasm运行Flask应用，实现完全兼容的Flask部署方案。

## 项目特点

- 使用Cloudflare Workers + Python Wasm运行Flask应用
- 完全兼容Flask框架，无需修改Flask代码
- 支持所有Flask功能和路由
- 部署简单，无需复杂的构建过程
- 全球CDN加速，访问速度快

## 前置要求

1. Node.js 和 npm
2. Python 和 pip
3. Cloudflare账号
4. Git（可选）

## 项目结构

```
little-gao/
├── worker.js              # Workers入口文件，调用Python Wasm
├── wrangler.toml          # Workers配置文件
├── requirements.txt       # Python依赖
├── deploy.bat            # Windows部署脚本
├── deploy.ps1            # PowerShell部署脚本
├── static/               # 静态资源（CSS、JS、图片等）
├── templates/            # HTML模板
└── README.md             # 项目说明文档
```

## 部署步骤

### 方法一：使用自动部署脚本

#### Windows用户

1. 双击运行 `deploy.bat`
2. 按照提示操作
3. 脚本会自动安装依赖并部署到Cloudflare Workers

#### PowerShell用户

1. 在PowerShell中运行 `.\deploy.ps1`
2. 按照提示操作
3. 脚本会自动安装依赖并部署到Cloudflare Workers

### 方法二：手动部署

1. **安装依赖**

   ```bash
   # 安装Python依赖
   pip install -r requirements.txt
   
   # 安装最新版Wrangler
   npm install -g wrangler@4
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

- `/` - 博客首页
- `/api/user/<name>` - 用户API
- `/post/<id>` - 文章详情页
- `/about` - 关于页面
- `/contact` - 联系页面
- `/categories` - 分类页面
- `/login` - 登录处理（POST）
- `/register` - 注册处理（POST）

### Python Wasm集成

`worker.js`使用`@cloudflare/python-wasm`库在Workers中运行Python代码：

```javascript
import { Python } from 'https://cdn.jsdelivr.net/npm/@cloudflare/python-wasm@0.2.1/+esm';

// 初始化Python运行时
const python = new Python();

// 加载Flask代码到Python运行时
await python.run(flaskCode);
```

### 请求处理流程

1. Workers接收HTTP请求
2. 解析请求参数（路径、方法、头、体）
3. 调用Python中的`handle_request`函数
4. Python中的Flask应用处理请求
5. 返回响应给Workers
6. Workers将响应返回给客户端

## 配置说明

### wrangler.toml配置

```toml
name = "blog5"  # Worker名称
main = "worker.js"  # 入口文件
compatibility_date = "2025-12-07"  # 兼容日期
compatibility_flags = ["js_compat", "web_socket"]  # 兼容标志
workers_dev = true  # 启用workers.dev域名
```

### Python依赖

`requirements.txt`包含Flask运行所需的核心依赖：

```
flask==2.3.3
Werkzeug==2.3.7
Jinja2==3.1.6
itsdangerous==2.2.0
blinker==1.9.0
```

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

3. 在Flask代码中使用D1：

   ```python
   from flask import g
   
   @app.before_request
   def before_request():
       g.db = request.env.DB  # 访问D1数据库
   ```

### 使用Cloudflare KV

1. 在Cloudflare控制台创建KV命名空间
2. 在wrangler.toml中绑定KV：

   ```toml
   [[kv_namespaces]]
   binding = "CACHE"
   id = "your-kv-namespace-id"
   ```

3. 在Flask代码中使用KV：

   ```python
   from flask import g
   
   @app.before_request
   def before_request():
       g.cache = request.env.CACHE  # 访问KV存储
   ```

## 故障排除

### 常见问题

1. **部署失败**
   - 检查wrangler.toml配置是否正确
   - 确认worker.js语法无误
   - 查看部署日志获取详细错误信息

2. **Python Wasm错误**
   - 确认Python代码语法正确
   - 检查Python依赖是否完整
   - 验证Python Wasm版本兼容性

3. **路由不工作**
   - 确认Flask路由定义正确
   - 检查请求路径是否匹配
   - 验证HTTP方法是否正确

### 调试技巧

1. 使用`wrangler dev`进行本地测试
2. 在Python代码中添加日志输出
3. 使用浏览器开发者工具检查请求和响应

## 扩展功能

### 添加新路由

在Flask代码中添加新的路由：

```python
@app.route('/new-route')
def new_route():
    return "新路由内容"
```

### 使用Flask扩展

在requirements.txt中添加Flask扩展：

```
flask-login==0.6.3
flask-wtf==1.1.1
```

在Flask代码中导入和使用：

```python
from flask_login import LoginManager
from flask_wtf import FlaskForm

login_manager = LoginManager()
login_manager.init_app(app)
```

## 性能优化

1. **减少Python代码大小**
   - 移除不必要的依赖
   - 优化Flask应用结构
   - 使用更高效的算法

2. **使用缓存**
   - 实现响应缓存
   - 使用Cloudflare KV存储缓存数据
   - 设置适当的缓存头

3. **优化数据库查询**
   - 使用索引优化查询
   - 减少数据库连接次数
   - 使用批量操作

## 安全注意事项

1. **输入验证**
   - 验证所有用户输入
   - 使用参数化查询防止SQL注入
   - 实现CSRF保护

2. **依赖安全**
   - 定期更新依赖包
   - 使用安全扫描工具检查漏洞
   - 避免使用已知有问题的包

3. **数据保护**
   - 使用HTTPS传输数据
   - 实现适当的访问控制
   - 遵守数据保护法规