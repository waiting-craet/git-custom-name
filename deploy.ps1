# 博客项目部署脚本 - Cloudflare Workers 纯JS版
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "博客项目部署脚本 - Cloudflare Workers 纯JS版" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

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

# 升级Wrangler到最新版（解决版本过时和API兼容问题）
Write-Host "升级Wrangler到最新版..." -ForegroundColor Yellow
try {
    npm install -g wrangler@4.53.0
    Write-Host "Wrangler升级完成" -ForegroundColor Green
} catch {
    Write-Host "Wrangler升级失败，请检查Node.js环境" -ForegroundColor Red
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
Write-Host "您的纯JS Workers应用已成功部署到Cloudflare Workers！" -ForegroundColor Yellow
Write-Host ""
Write-Host "访问URL将在上面的输出中显示，格式为: https://blog7-xxx.workers.dev" -ForegroundColor White
Write-Host ""
Write-Host "测试URL:" -ForegroundColor Yellow
Write-Host "- 根路径: 显示"Flask替代方案 ✅ 部署成功！"" -ForegroundColor Gray
Write-Host "- /api/user/test: 返回{"name":"test","message":"Hello from Cloudflare Workers!","status":"success"}" -ForegroundColor Gray
Write-Host "- /api/posts (POST请求): 返回{"received":data,"code":201}" -ForegroundColor Gray
Write-Host ""
Read-Host "按Enter键退出"