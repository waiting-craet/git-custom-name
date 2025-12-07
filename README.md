# 小高博客 - Cloudflare Workers 部署指南

这是一个基于Flask的博客应用，已适配部署到Cloudflare Workers。

## 前置要求

1. Node.js (≥18.x)
2. Python (≥3.9)
3. Cloudflare账号

## 部署步骤

### 1. 安装依赖

```bash
# 安装Python依赖
pip install -r requirements.txt

# 安装Node.js依赖
npm install
```

### 2. 创建Cloudflare D1数据库

1. 登录Cloudflare控制台
2. 进入"Workers & Pages" > "D1"
3. 点击"Create database"
4. 创建名为"little-gao-db"的数据库
5. 记录数据库ID

### 3. 配置wrangler.toml

编辑wrangler.toml文件，填入您的D1数据库ID：

```toml
[[env.production.d1_databases]]
binding = "DB"
database_name = "little-gao-db"
database_id = "您的数据库ID"
```

### 4. 初始化数据库

```bash
# 创建数据库表
wrangler d1 execute little-gao-db --file=./schema.sql
```

### 5. 登录Cloudflare

```bash
npm run login
# 或
wrangler login
```

### 6. 部署到Cloudflare Pages

```bash
npm run deploy
# 或
wrangler pages deploy public
```

## 本地开发

```bash
npm run dev
# 或
wrangler pages dev public
```

## 注意事项

1. Cloudflare Workers有执行时间限制，复杂查询可能需要优化
2. 文件上传功能需要使用Cloudflare R2存储
3. 会话管理建议使用Cloudflare KV存储

## 故障排除

1. 如果遇到依赖问题，请确保使用Python 3.9+
2. 如果部署失败，检查wrangler.toml配置是否正确
3. 如果数据库连接失败，确认D1数据库ID是否正确

## 自定义域名

1. 在Cloudflare控制台中进入"Workers & Pages"
2. 选择您的项目
3. 进入"Triggers" > "Custom Domains"
4. 添加您的自定义域名