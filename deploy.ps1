# 博客项目部署脚本 - Cloudflare Pages原生Python Functions版
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "博客项目部署脚本 - Cloudflare Pages原生Python Functions版" -ForegroundColor Cyan
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

# 初始化Git仓库（如果尚未初始化）
if (-not (Test-Path ".git")) {
    Write-Host "初始化Git仓库..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "初始提交"
    Write-Host "Git仓库初始化完成" -ForegroundColor Green
}

# 检查是否已连接到GitHub仓库
$remoteUrl = git remote get-url origin 2>$null
if (-not $remoteUrl) {
    $githubUrl = Read-Host "请提供GitHub仓库URL"
    git remote add origin $githubUrl
    git branch -M main
    git push -u origin main
    Write-Host "已连接到GitHub仓库" -ForegroundColor Green
} else {
    Write-Host "推送最新代码到GitHub..." -ForegroundColor Yellow
    git add .
    git commit -m "更新代码"
    git push
    Write-Host "代码推送完成" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "部署步骤完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "接下来请按以下步骤完成部署：" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. 登录Cloudflare控制台: https://dash.cloudflare.com/" -ForegroundColor White
Write-Host "2. 进入Pages项目设置" -ForegroundColor White
Write-Host "3. 在"构建与部署"中配置:" -ForegroundColor White
Write-Host "   - 构建命令: 留空（无需安装依赖）" -ForegroundColor Gray
Write-Host "   - 构建输出目录: /（根目录）" -ForegroundColor Gray
Write-Host "   - 框架预设: No Framework" -ForegroundColor Gray
Write-Host "4. 触发重新部署" -ForegroundColor White
Write-Host ""
Write-Host "部署完成后，您的网站将可通过以下URL访问:" -ForegroundColor Yellow
Write-Host "- 根路径: 显示"博客首页 - 部署成功！"" -ForegroundColor Gray
Write-Host "- /api/user?name=test: 返回JSON数据" -ForegroundColor Gray
Write-Host "- /post/123: 显示"文章ID：123，内容加载成功"" -ForegroundColor Gray
Write-Host ""
Read-Host "按Enter键退出"