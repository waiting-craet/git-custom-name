@echo off
echo 小高博客 - Cloudflare Workers 部署脚本
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

echo 安装依赖...
npm install
if %errorlevel% neq 0 (
    echo 错误: 依赖安装失败
    pause
    exit /b 1
)

echo.
echo 登录Cloudflare...
npx wrangler login
if %errorlevel% neq 0 (
    echo 错误: Cloudflare登录失败
    pause
    exit /b 1
)

echo.
echo 部署到Cloudflare Workers...
npm run deploy
if %errorlevel% neq 0 (
    echo 错误: 部署失败
    pause
    exit /b 1
)

echo.
echo 部署成功！
pause