@echo off
echo ========================================
echo 博客项目部署脚本 - Cloudflare Workers 纯JS版
echo ========================================
echo.

:: 检查是否已安装Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未检测到Node.js，请先安装Node.js
    echo 下载地址: https://nodejs.org/
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

:: 升级Wrangler到最新版（解决版本过时和API兼容问题）
echo 升级Wrangler到最新版...
npm install -g wrangler@4.53.0
if %errorlevel% neq 0 (
    echo Wrangler升级失败，请检查Node.js环境
    pause
    exit /b 1
)

:: 部署Workers
echo 部署到Cloudflare Workers...
npx wrangler deploy
if %errorlevel% neq 0 (
    echo 部署失败，请检查配置文件
    pause
    exit /b 1
)

echo.
echo ========================================
echo 部署完成！
echo ========================================
echo.
echo 您的纯JS Workers应用已成功部署到Cloudflare Workers！
echo.
echo 访问URL将在上面的输出中显示，格式为: https://blog7-xxx.workers.dev
echo.
echo 测试URL:
echo - 根路径: 显示"Flask替代方案 ✅ 部署成功！"
echo - /api/user/test: 返回{"name":"test","message":"Hello from Cloudflare Workers!","status":"success"}
echo - /api/posts (POST请求): 返回{"received":data,"code":201}
echo.
pause