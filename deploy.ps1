# 博客项目部署脚本 - Cloudflare Workers + Python Wasm版
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "博客项目部署脚本 - Cloudflare Workers + Python Wasm版" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查Git是否已安装
try {
    $gitVersion = git --version 2>$null
    Write-Host "检测到Git: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "错误: 未检测到Git，请先安装Git" -ForegroundColor Red
    Write-Host "下载地址: https://git-scm.com/download/win" -ForegroundColor Yellow
    Read-Host "按Enter键退出"
    exit 1
}

# 检查是否已安装Node.js
try {
    $nodeVersion = node --version 2>$null
    Write-Host "检测到Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "错误: 未检测到Node.js，请先安装Node.js" -ForegroundColor Red
    Write-Host "下载地址: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "按Enter键退出"
    exit 1
}

# 检查是否已登录Cloudflare
Write-Host "检查Cloudflare登录状态..." -ForegroundColor Yellow
try {
    $wranglerStatus = npx wrangler whoami 2>$null
    Write-Host "已登录Cloudflare: $wranglerStatus" -ForegroundColor Green
} catch {
    Write-Host "未登录Cloudflare，正在打开登录页面..." -ForegroundColor Yellow
    try {
        npx wrangler login
        Write-Host "Cloudflare登录成功" -ForegroundColor Green
    } catch {
        Write-Host "登录失败，请重试" -ForegroundColor Red
        Read-Host "按Enter键退出"
        exit 1
    }
}

# 安装Python依赖
Write-Host "安装Python依赖..." -ForegroundColor Yellow
try {
    pip install -r requirements.txt
    Write-Host "Python依赖安装完成" -ForegroundColor Green
} catch {
    Write-Host "Python依赖安装失败，请检查Python环境" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit 1
}

# 安装最新版wrangler（解决版本过时警告）
Write-Host "安装最新版Wrangler..." -ForegroundColor Yellow
try {
    npm install -g wrangler@4
    Write-Host "Wrangler安装完成" -ForegroundColor Green
} catch {
    Write-Host "Wrangler安装失败，请检查Node.js环境" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit 1
}

# 部署Workers
Write-Host "部署到Cloudflare Workers..." -ForegroundColor Yellow
try {
    npx wrangler deploy
    Write-Host "部署成功" -ForegroundColor Green
} catch {
    Write-Host "部署失败，请检查配置文件" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "部署完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "您的Flask应用已成功部署到Cloudflare Workers！" -ForegroundColor Yellow
Write-Host ""
Write-Host "访问URL将在上面的输出中显示，格式为: https://blog5-xxx.workers.dev" -ForegroundColor White
Write-Host ""
Write-Host "测试URL:" -ForegroundColor Yellow
Write-Host "- 根路径: 显示"Flask on Cloudflare Workers - 部署成功！"" -ForegroundColor Gray
Write-Host "- /api/user/test: 返回{"name":"test","status":"success"}" -ForegroundColor Gray
Write-Host "- /post/1: 显示文章详情" -ForegroundColor Gray
Write-Host ""
Read-Host "按Enter键退出"