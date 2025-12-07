# Flask 博客应用部署到 Cloudflare Pages 指南

## 概述

本项目是一个基于 Flask 的博客应用，已配置好可以部署到 Cloudflare Pages。

## 文件说明

- `app.py`: Flask 应用主文件
- `requirements.txt`: Python 依赖列表
- `index.py`: Cloudflare Pages 入口文件
- `wrangler.toml`: Cloudflare Pages 配置文件
- `test_app.py`: 应用测试脚本
- `deploy.py`: 部署脚本

## 部署步骤

### 1. 准备工作

确保您已安装以下工具：
- Node.js 和 npm
- Git

### 2. 登录 Cloudflare

```bash
npx wrangler auth login
```

### 3. 部署应用

有两种方式部署应用：

#### 方式一：使用部署脚本（推荐）

```bash
python deploy.py
```

#### 方式二：手动部署

```bash
# 安装依赖
pip install -r requirements.txt

# 部署到 Cloudflare Pages
npx wrangler pages deploy
```

### 4. 配置环境变量

部署成功后，需要在 Cloudflare Dashboard 中配置以下环境变量：

1. 进入 Cloudflare Dashboard
2. 选择您的 Pages 项目
3. 进入 "Settings" > "Environment variables"
4. 添加以下变量：
   - `SECRET_KEY`: Flask 应用密钥
   - `DATABASE_URL`: 数据库连接字符串（如果使用云数据库）

### 5. 数据库配置

#### 选项一：使用 Cloudflare D1（推荐）

1. 在 Cloudflare Dashboard 中创建 D1 数据库
2. 配置 `DATABASE_URL` 环境变量
3. 修改应用代码以使用 D1 数据库

#### 选项二：使用其他云数据库

1. 选择一个云数据库服务（如 Supabase、PlanetScale 等）
2. 配置 `DATABASE_URL` 环境变量
3. 确保数据库连接字符串格式正确

## 本地开发

```bash
# 安装依赖
pip install -r requirements.txt

# 运行应用
python app.py
```

应用将在 http://localhost:5009 上运行。

## 测试

运行测试脚本验证应用是否可以正常运行：

```bash
python test_app.py
```

## 常见问题

### 1. 部署失败：缺少入口点

确保 `wrangler.toml` 文件中的 `entry-point` 指向正确的文件。

### 2. 数据库连接错误

检查 `DATABASE_URL` 环境变量是否正确配置。

### 3. 静态文件无法加载

确保静态文件路径正确，并且 `wrangler.toml` 中的 `bucket` 指向正确的目录。

## 注意事项

1. Cloudflare Pages 对 Python 应用的支持仍在发展中，可能存在一些限制。
2. SQLite 数据库在 Cloudflare Pages 环境中可能无法正常工作，建议使用云数据库。
3. 确保所有敏感信息（如密钥、数据库凭证）都通过环境变量配置，而不是硬编码在代码中。

## 更多信息

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Flask 文档](https://flask.palletsprojects.com/)