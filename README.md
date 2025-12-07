# 博客项目 - Cloudflare Pages原生Python Functions版

这是一个使用Cloudflare Pages原生Python Functions部署的博客项目，无需依赖Flask框架或其他复杂的Web框架，直接在Cloudflare边缘运行时上处理请求。

## 项目特点

- 使用Cloudflare Pages原生Python Functions
- 无需Flask框架，直接处理HTTP请求
- 支持动态路由和参数解析
- 部署简单，无需复杂的构建过程
- 全球CDN加速，访问速度快

## 前置要求

1. Git账号和仓库
2. Cloudflare账号
3. 基本的命令行操作知识

## 项目结构

```
little-gao/
├── functions/
│   └── [[path]].py        # 核心路由处理逻辑
├── static/                # 静态资源（CSS、JS、图片等）
├── templates/             # HTML模板（可选）
├── requirements.txt       # Python依赖（仅基础依赖）
├── deploy.bat            # Windows部署脚本
├── deploy.ps1            # PowerShell部署脚本
└── README.md             # 项目说明文档
```

## 部署步骤

### 方法一：使用自动部署脚本

#### Windows用户

1. 双击运行 `deploy.bat`
2. 按照提示操作
3. 脚本会自动将代码推送到GitHub
4. 在Cloudflare控制台完成最后配置

#### PowerShell用户

1. 在PowerShell中运行 `.\deploy.ps1`
2. 按照提示操作
3. 脚本会自动将代码推送到GitHub
4. 在Cloudflare控制台完成最后配置

### 方法二：手动部署

1. **创建GitHub仓库**

   ```bash
   git init
   git add .
   git commit -m "初始提交"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourrepo.git
   git push -u origin main
   ```

2. **创建Cloudflare Pages项目**

   - 登录Cloudflare控制台: https://dash.cloudflare.com/
   - 进入"Pages"部分
   - 点击"创建项目"
   - 连接到您的GitHub仓库
   - 在"构建设置"中配置：
     - 构建命令：留空（无需安装依赖）
     - 构建输出目录：/（根目录）
     - 框架预设：No Framework

3. **部署项目**

   - 点击"保存并部署"
   - 等待部署完成

## 配置Cloudflare Pages

在项目设置中，确保以下配置正确：

1. **构建与部署**
   - 构建命令：留空
   - 构建输出目录：/
   - 环境变量：根据需要添加

2. **自定义域（可选）**
   - 在"自定义域"中添加您的域名
   - 按照提示配置DNS记录

## 功能说明

### 路由处理

项目中的`functions/[[path]].py`文件处理所有HTTP请求，支持以下路由：

- `/` - 博客首页
- `/api/user?name=xxx` - 用户API
- `/post/xxx` - 文章详情页
- `/about` - 关于页面
- `/contact` - 联系页面
- `/categories` - 分类页面
- `/login` - 登录处理（POST）
- `/register` - 注册处理（POST）

### 请求处理

所有请求都通过`on_request(context)`函数处理，其中：

- `context.request` - 包含请求信息
- `request.url.path` - 请求路径
- `request.method` - HTTP方法
- `request.url.search_params` - URL查询参数

### 响应格式

使用自定义的`Response`类返回响应：

```python
return Response(
    body="响应内容",
    status=200,
    headers={"Content-Type": "text/html"}
)
```

## 数据存储选项

### 简单键值存储

使用Cloudflare KV存储简单数据：

1. 在Cloudflare控制台创建KV命名空间
2. 在Pages项目中绑定KV命名空间
3. 在代码中通过`context.env.KV_NAMESPACE`访问

### 结构化数据

使用Cloudflare D1存储结构化数据：

1. 在Cloudflare控制台创建D1数据库
2. 在Pages项目中绑定D1数据库
3. 在代码中通过`context.env.DB`访问

## 本地开发

虽然Cloudflare Pages主要用于生产环境，但您可以通过以下方式进行本地开发：

1. 使用Python内置服务器模拟请求处理
2. 创建简单的测试脚本验证路由逻辑
3. 使用Cloudflare Wrangler进行本地测试

## 故障排除

### 常见问题

1. **部署失败**
   - 检查functions目录结构是否正确
   - 确认[[path]].py文件语法无误
   - 查看部署日志获取详细错误信息

2. **路由不工作**
   - 确认路径匹配逻辑正确
   - 检查HTTP方法是否匹配
   - 验证参数解析是否正确

3. **性能问题**
   - 优化路由处理逻辑
   - 减少不必要的计算
   - 考虑使用缓存策略

### 调试技巧

1. 使用`context.request`对象检查请求详情
2. 在响应中添加调试信息
3. 查看Cloudflare Analytics了解访问情况

## 扩展功能

### 添加新路由

在`functions/[[path]].py`的`on_request`函数中添加新的路由条件：

```python
elif path == "/new-route":
    return Response("新路由内容", status=200)
```

### 处理表单数据

对于POST请求，可以通过以下方式获取表单数据：

```python
elif path == "/submit" and method == "POST":
    # 处理表单提交
    return Response("提交成功", status=200)
```

### 使用模板

虽然本项目不依赖Flask，但您仍然可以使用简单的模板系统：

```python
def render_template(template_name, context={}):
    # 简单的模板渲染逻辑
    with open(f"templates/{template_name}", "r") as f:
        template = f.read()
    
    # 简单的变量替换
    for key, value in context.items():
        template = template.replace(f"{{{{ {key} }}}}", str(value))
    
    return template
```

## 性能优化

1. **减少计算复杂度**
   - 避免在请求处理中进行复杂计算
   - 考虑预计算常用数据

2. **使用缓存**
   - 对不常变化的内容使用缓存
   - 考虑使用Cloudflare KV存储缓存数据

3. **优化响应大小**
   - 压缩响应内容
   - 只返回必要的数据

## 安全注意事项

1. **输入验证**
   - 对所有用户输入进行验证
   - 防止注入攻击

2. **敏感信息**
   - 不要在代码中硬编码敏感信息
   - 使用环境变量存储密钥

3. **访问控制**
   - 实现适当的身份验证和授权
   - 限制对敏感功能的访问

## 许可证

本项目采用MIT许可证，详情请参阅LICENSE文件。

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 支持

如果您在使用过程中遇到问题，请：

1. 查看本文档的故障排除部分
2. 搜索已有的Issues
3. 创建新的Issue描述您的问题

---

**注意**: 本项目已针对Cloudflare Pages原生Python Functions进行了优化，不再依赖Flask框架或复杂的数据库系统。如果您需要更复杂的功能，可以考虑使用Cloudflare D1或KV存储来扩展项目功能。