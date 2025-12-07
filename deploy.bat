@echo off
echo ========================================
echo 博客项目部署脚本 - Cloudflare Pages原生Python Functions版
echo ========================================
echo.

:: 检查Git是否已安装
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未检测到Git，请先安装Git
    echo 下载地址: https://git-scm.com/download/win
    pause
    exit /b 1
)

:: 检查是否已登录Cloudflare
echo 检查Cloudflare登录状态...
npx wrangler whoami 2>nul
if %errorlevel% neq 0 (
    echo 未登录Cloudflare，正在打开登录页面...
    npx wrangler login
    if %errorlevel% neq 0 (
        echo 登录失败，请重试
        pause
        exit /b 1
    )
)

:: 初始化Git仓库（如果尚未初始化）
if not exist .git (
    echo 初始化Git仓库...
    git init
    git add .
    git commit -m "初始提交"
)

:: 检查是否已连接到GitHub仓库
git remote -v | findstr "origin" >nul
if %errorlevel% neq 0 (
    echo 请提供GitHub仓库URL:
    set /p github_url=GitHub仓库URL: 
    git remote add origin %github_url%
    git branch -M main
    git push -u origin main
) else (
    echo 推送最新代码到GitHub...
    git add .
    git commit -m "更新代码"
    git push
)

echo.
echo ========================================
echo 部署步骤完成！
echo ========================================
echo.
echo 接下来请按以下步骤完成部署：
echo.
echo 1. 登录Cloudflare控制台: https://dash.cloudflare.com/
echo 2. 进入Pages项目设置
echo 3. 在"构建与部署"中配置:
echo    - 构建命令: 留空（无需安装依赖）
echo    - 构建输出目录: /（根目录）
echo    - 框架预设: No Framework
echo 4. 触发重新部署
echo.
echo 部署完成后，您的网站将可通过以下URL访问:
echo - 根路径: 显示"博客首页 - 部署成功！"
echo - /api/user?name=test: 返回JSON数据
echo - /post/123: 显示"文章ID：123，内容加载成功"
echo.
pause