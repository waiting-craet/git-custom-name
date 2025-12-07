# 小高博客 - Cloudflare Workers 部署脚本 (PowerShell版)

Write-Host "小高博客 - Cloudflare Workers 部署脚本" -ForegroundColor Green
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

# 安装依赖
Write-Host "安装依赖..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 依赖安装失败" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit 1
}

Write-Host ""

# 登录Cloudflare
Write-Host "登录Cloudflare..." -ForegroundColor Yellow
npx wrangler login
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: Cloudflare登录失败" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit 1
}

Write-Host ""

# 部署到Cloudflare Workers
Write-Host "部署到Cloudflare Workers..." -ForegroundColor Yellow
npm run deploy
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 部署失败" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit 1
}

Write-Host ""
Write-Host "部署成功！" -ForegroundColor Green
Read-Host "按Enter键退出"