@echo off
set PATH=C:\Program Files\nodejs;%PATH%
echo 检查Node.js版本...
node --version
echo.
echo 检查npm版本...
npm --version
echo.
echo 尝试部署到Cloudflare Workers...
npx wrangler deploy
pause