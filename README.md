# Flask 博客应用 - Cloudflare Pages 部署指南 (新版本)

这是一个基于 Flask 的博客应用，已适配新版本 Cloudflare Pages 的部署要求。

## 项目结构

```
你的Flask项目/
├── pages/ 
│   └── functions/          # Pages Functions核心目录（必须同名） 
│       ├── [[path]].py     # 通配路由文件（接管所有请求） 
│       └── _routes.json    # 路由优先级配置
├── static/                 # 静态文件目录
│   ├── css/
│   ├── js/
│   └── images/
├── templates/              # Flask 模板目录
├── requirements.txt        # Python依赖 
└── wrangler.toml           # Pages配置文件（新版本需手动创建）
```

## 新版本 Cloudflare Pages 部署步骤

### 1. 准备工作

确保已安装 Node.js 和 npm，然后安装 Wrangler CLI：

```bash
npm install -g wrangler
```

登录 Cloudflare：

```bash
wrangler auth login
```

### 2. 部署应用

运行部署脚本：

```bash
python deploy.py
```

或者手动执行以下命令：

```bash
wrangler pages deploy
```

### 3. 配置环境变量

在 Cloudflare Dashboard 中配置以下环境变量：

- `SECRET_KEY`: Flask 应用密钥
- `PYTHON_VERSION`: 3.11 (已通过 wrangler.toml 配置)
- `CF_PAGES`: 1 (已通过 wrangler.toml 配置)

### 4. 配置构建参数

在 Cloudflare Pages 控制台的「构建与部署」页面，填写以下配置：

| 配置项 | 填写内容 | 新版本注意点 |
|--------|----------|--------------|
| 构建命令 | `pip install -r requirements.txt --target .python_packages && cp -r .python_packages/* .` | 强制指定依赖安装路径，避免新版本路径找不到 |
| 输出目录 | `pages`（必须指向包含 functions 的目录） | 新版本会校验输出目录是否有 Functions 文件 |
| 框架预设 | `None`（禁用自动框架检测） | 选其他框架会覆盖 Python 运行时 |
| 环境变量 | 添加 2 个关键变量：<br>1. `PYTHON_VERSION=3.11`（最高支持）<br>2. `CF_PAGES=1`（标记 Pages 环境） | 新版本默认 Python 3.9，需手动指定高版本 |

## 新版本核心注意事项

### 1. 功能限制（新版本强化）

- ❌ 不支持 `flask run`/`app.run()`（会被 Pages 拦截并报错）
- ❌ 不支持本地数据库（如 SQLite、MySQL），需改用 Cloudflare D1/KV/Redis
- ❌ 不支持 `flask-sqlalchemy`/`flask-migrate` 等依赖本地环境的扩展
- ✅ 仅支持 Flask 的路由、请求/响应处理、简单逻辑（无 IO 密集型操作）

### 2. 性能与时长限制

- 新版本 Pages 构建时长限制为 15 分钟，Flask 依赖过多会超时（建议仅保留 flask 核心依赖）
- 边缘运行时单次请求超时 10 秒，复杂逻辑需拆分（如 API 请求转为 Cloudflare Workers）

### 3. 路由优先级（新版本调整）

- Pages 优先返回 static 目录下的静态文件，再执行 Functions 逻辑
- 若需优先处理 Flask 路由，已在 `pages/functions/_routes.json` 中配置优先级

### 4. 预览部署（新版本新增）

- 非生产分支构建后，预览 URL 带 `?__cf_pages_preview=true`，已在 `on_request` 中添加兼容逻辑

## 本地开发

虽然新版本 Cloudflare Pages 不支持 `app.run()`，但您仍然可以在本地进行开发：

```bash
# 安装依赖
pip install -r requirements.txt

# 运行本地开发服务器（仅用于开发测试）
python app.py
```

注意：本地开发时使用的是原始的 `app.py` 文件，而不是 `pages/functions/[[path]].py`。

## 常见问题

### 1. ModuleNotFoundError

检查构建命令是否正确安装依赖，确保 `wrangler.toml` 中的构建命令为：
```
pip install -r requirements.txt --target .python_packages && cp -r .python_packages/* .
```

### 2. 函数未找到错误

确保 `pages/functions` 目录结构正确，且 `[[path]].py` 文件存在。

### 3. 路由不工作

检查 `pages/functions/_routes.json` 是否正确配置了路由优先级。

### 4. 静态文件无法访问

确保静态文件位于 `static` 目录下，并且 `wrangler.toml` 中正确配置了 bucket 路径。

## 数据库迁移

由于新版本 Cloudflare Pages 不支持本地数据库，您需要：

1. 将数据迁移到 Cloudflare D1 或其他云数据库
2. 修改应用代码以使用新的数据库连接方式
3. 在 `pages/functions/[[path]].py` 中实现相应的数据访问逻辑

## 技术支持

如果遇到问题，请检查：

1. Cloudflare Pages 的构建日志
2. 确保所有必需文件和目录存在
3. 验证 `wrangler.toml` 配置是否正确
4. 检查环境变量是否正确设置

## 版本历史

- v1.0: 初始版本，支持旧版 Cloudflare Pages
- v2.0: 适配新版本 Cloudflare Pages，使用 Pages Functions 架构