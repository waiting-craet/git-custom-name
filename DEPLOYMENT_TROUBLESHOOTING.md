# Cloudflare Pages 部署指南（解决404错误）

## 问题分析

您在访问 `https://four-a7g.pages.dev/` 时遇到404错误，而您的项目名称是 `flask-blog`。这种不匹配可能是由于：

1. Cloudflare Pages项目名称与 `wrangler.toml` 中配置的不同
2. 部署到了错误的项目或分支
3. 项目配置不正确

## 解决方案

### 方案1：确认正确的项目URL

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 Pages 控制台
3. 找到您的项目，查看项目的实际URL
4. 使用正确的URL访问您的应用

### 方案2：重新创建项目并部署

如果找不到正确的项目，请按照以下步骤重新创建：

1. **删除现有项目（如果有）**：
   - 在Cloudflare Dashboard中找到项目
   - 点击设置 → 危险区域 → 删除项目

2. **创建新项目**：
   - 点击 "Create a project"
   - 连接到您的GitHub仓库
   - 选择正确的分支（通常是main或master）
   - 在构建设置中：
     - 框架预设：选择 "None"
     - 构建命令：留空（将使用wrangler.toml中的配置）
     - 构建输出目录：留空（将使用wrangler.toml中的配置）

3. **配置环境变量**：
   - 在项目设置中添加环境变量：
     - `SECRET_KEY`: 您的Flask应用密钥
     - `PYTHON_VERSION`: 3.11
     - `CF_PAGES`: 1

4. **部署项目**：
   - 保存设置并触发部署
   - 等待部署完成

### 方案3：使用Wrangler CLI部署

如果您更喜欢使用命令行：

1. **安装Wrangler**（如果尚未安装）：
   ```bash
   npm install -g wrangler
   ```

2. **登录Cloudflare**：
   ```bash
   wrangler auth login
   ```

3. **创建Pages项目**：
   ```bash
   wrangler pages project create flask-blog
   ```

4. **部署项目**：
   ```bash
   wrangler pages deploy
   ```

## 验证部署

部署完成后，使用以下URL验证：

1. **根路径**：`https://flask-blog.pages.dev/` 或 `https://your-project-name.pages.dev/`
2. **API测试**：`https://your-project-name.pages.dev/api/user/test`

## 常见问题排查

### 1. 仍然出现404错误

- 确认您使用的是正确的项目URL
- 检查 `pages/functions/[[path]].py` 文件是否存在
- 确认文件名是 `[[path]].py`（双中括号）
- 检查 `wrangler.toml` 中的 `entry-point` 是否设置为 `pages/functions`

### 2. 部署失败

- 检查GitHub仓库中的代码是否是最新的
- 确认 `requirements.txt` 只包含必要的依赖
- 查看Cloudflare Pages的构建日志

### 3. 函数执行错误

- 检查 `on_request` 函数是否正确实现
- 确认 `Response` 类是否已定义
- 查看Cloudflare Pages的函数日志

## 项目结构确认

确保您的仓库结构如下：

```
仓库根目录/
├── pages/
│   └── functions/
│       ├── [[path]].py
│       └── _routes.json
├── requirements.txt
├── wrangler.toml
└── static/ (可选)
```

## 获取正确的项目URL

1. 在Cloudflare Dashboard中找到您的项目
2. 点击项目进入详情页
3. 在项目概览中找到 "Custom domains" 或 "Pages domain"
4. 使用显示的URL访问您的应用

## 联系支持

如果问题仍然存在：

1. 检查Cloudflare Pages的函数日志
2. 确认所有文件都已正确提交到GitHub
3. 尝试创建一个新的项目进行测试
4. 联系Cloudflare支持团队