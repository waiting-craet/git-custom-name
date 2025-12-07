# 小高博客 - Cloudflare Workers 部署脚本 (官方Python WSGI适配器版)

Write-Host "小高博客 - Cloudflare Workers 部署脚本 (官方Python WSGI适配器版)" -ForegroundColor Green
Write-Host ""

# 检查Node.js和npm是否已安装
Write-Host "检查Node.js和npm是否已安装..." -ForegroundColor Yellow

try {
    $nodeVersion = node -v
    Write-Host "Node.js版本: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "错误: 未找到Node.js，请先安装Node.js (https://nodejs.org/)" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit 1
}

try {
    $npmVersion = npm -v
    Write-Host "npm版本: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "错误: 未找到npm，请确保Node.js安装正确" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit 1
}

Write-Host ""

# 安装最新wrangler
Write-Host "安装最新wrangler..." -ForegroundColor Yellow
npm install -g wrangler@latest
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: wrangler安装失败" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit 1
}

Write-Host ""

# 登录Cloudflare
Write-Host "登录Cloudflare..." -ForegroundColor Yellow
wrangler login
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: Cloudflare登录失败" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit 1
}

Write-Host ""

# 部署到Cloudflare Workers
Write-Host "部署到Cloudflare Workers..." -ForegroundColor Yellow
wrangler deploy
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 部署失败" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit 1
}

Write-Host ""
Write-Host "部署成功！" -ForegroundColor Green
Write-Host ""
Write-Host "注意事项：" -ForegroundColor Yellow
Write-Host "1. 请在Cloudflare控制台创建D1数据库并更新wrangler.toml中的database_id"
Write-Host "2. 使用schema.sql初始化数据库表"
Write-Host "3. 如果需要会话管理，请在Cloudflare控制台创建KV存储并更新wrangler.toml中的id"
Write-Host ""
Read-Host "按Enter键退出"