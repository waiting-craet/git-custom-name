@echo off
echo 小高博客 - Cloudflare Workers 部署脚本 (官方Python WSGI适配器版)
echo.

echo 检查Node.js和npm是否已安装...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未找到Node.js，请先安装Node.js (https://nodejs.org/)
    pause
    exit /b 1
)

npm -v >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未找到npm，请确保Node.js安装正确
    pause
    exit /b 1
)

echo Node.js和npm已安装
echo.

echo 安装最新wrangler...
npm install -g wrangler@latest
if %errorlevel% neq 0 (
    echo 错误: wrangler安装失败
    pause
    exit /b 1
)

echo.
echo 登录Cloudflare...
wrangler login
if %errorlevel% neq 0 (
    echo 错误: Cloudflare登录失败
    pause
    exit /b 1
)

echo.
echo 部署到Cloudflare Workers...
wrangler deploy
if %errorlevel% neq 0 (
    echo 错误: 部署失败
    pause
    exit /b 1
)

echo.
echo 部署成功！
echo.
echo 注意事项：
echo 1. 请在Cloudflare控制台创建D1数据库并更新wrangler.toml中的database_id
echo 2. 使用schema.sql初始化数据库表
echo 3. 如果需要会话管理，请在Cloudflare控制台创建KV存储并更新wrangler.toml中的id
echo.
pause