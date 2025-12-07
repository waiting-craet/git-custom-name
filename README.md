# 小高博客 - Cloudflare Workers 部署指南 (官方Python WSGI适配器版)

这是一个基于Flask的博客应用，已适配部署到Cloudflare Workers，使用官方Python WSGI适配器。

## 前置要求

1. Node.js (≥18.x)
2. Python (≥3.9)
3. Cloudflare账号

## 部署步骤

### 1. 创建Cloudflare D1数据库

1. 登录Cloudflare控制台
2. 进入"Workers & Pages" > "D1"
3. 点击"Create database"
4. 创建名为"little-gao-db"的数据库
5. 记录数据库ID

### 2. 配置wrangler.toml

编辑wrangler.toml文件，填入您的D1数据库ID：

```toml
[[env.production.d1_databases]]
binding = "DB"
database_name = "little-gao-db"
database_id = "您的数据库ID"
```

### 3. 初始化数据库

```bash
# 创建数据库表
wrangler d1 execute little-gao-db --file=./schema.sql
```

### 4. 部署应用

#### 方法1：使用自动部署脚本

Windows批处理：
```bash
deploy.bat
```

PowerShell：
```powershell
.\deploy.ps1
```

#### 方法2：手动部署

```bash
# 安装最新wrangler
npm install -g wrangler@latest

# 登录Cloudflare
wrangler login

# 部署到Cloudflare Workers
wrangler deploy
```

## 本地开发

```bash
# 使用Python虚拟环境运行
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## 项目结构

```
little-gao/
├── worker.js              # Cloudflare Workers入口文件，包含Flask应用代码
├── wrangler.toml          # Cloudflare Workers配置
├── requirements.txt       # Python依赖
├── schema.sql            # 数据库初始化脚本
├── deploy.bat/deploy.ps1  # 部署脚本
├── app.py                # 本地开发用Flask应用
├── templates/            # HTML模板
└── static/               # 静态资源
```

## 技术说明

1. **Python WSGI适配器**：使用Cloudflare官方的@cloudflare/flask-adapter和@cloudflare/python-wasm
2. **数据库**：SQLite已替换为Cloudflare D1（兼容SQL语法）
3. **兼容标志**：启用python_wasm兼容标志以支持Python Wasm运行时
4. **会话管理**：建议使用Cloudflare KV存储（需在wrangler.toml中配置）

## 注意事项

1. Cloudflare Workers有执行时间限制，复杂查询可能需要优化
2. 文件上传功能需要使用Cloudflare R2存储
3. 确保在wrangler.toml中正确配置D1数据库ID
4. 如果使用会话管理，需要创建KV存储并配置ID

## 故障排除

1. 如果遇到依赖问题，请确保使用Python 3.9+
2. 如果部署失败，检查wrangler.toml配置是否正确
3. 如果数据库连接失败，确认D1数据库ID是否正确
4. 如果Python Wasm运行时错误，确保启用了python_wasm兼容标志

## 自定义域名

1. 在Cloudflare控制台中进入"Workers & Pages"
2. 选择您的项目
3. 进入"Triggers" > "Custom Domains"
4. 添加您的自定义域名

## 性能优化建议

1. 使用Cloudflare KV存储缓存常用数据
2. 优化数据库查询，避免复杂JOIN
3. 使用Cloudflare CDN加速静态资源
4. 考虑使用Cloudflare R2存储大文件