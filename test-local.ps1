# 小高博客 - 本地测试脚本

Write-Host "小高博客 - 本地测试脚本" -ForegroundColor Green
Write-Host ""

# 检查Python环境
Write-Host "检查Python环境..." -ForegroundColor Yellow

try {
    $pythonVersion = python --version
    Write-Host "Python版本: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "错误: 未找到Python，请先安装Python (https://www.python.org/)" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit 1
}

Write-Host ""

# 检查虚拟环境
if (Test-Path ".venv") {
    Write-Host "激活虚拟环境..." -ForegroundColor Yellow
    & ".venv\Scripts\Activate.ps1"
} else {
    Write-Host "创建虚拟环境..." -ForegroundColor Yellow
    python -m venv .venv
    & ".venv\Scripts\Activate.ps1"
    
    Write-Host "安装依赖..." -ForegroundColor Yellow
    pip install -r requirements.txt
    if ($LASTEXITCODE -ne 0) {
        Write-Host "错误: 依赖安装失败" -ForegroundColor Red
        Read-Host "按Enter键退出"
        exit 1
    }
}

Write-Host ""

# 运行Flask应用
Write-Host "启动Flask应用..." -ForegroundColor Yellow
Write-Host "应用将在 http://127.0.0.1:5000 上运行" -ForegroundColor Green
Write-Host "按Ctrl+C停止应用" -ForegroundColor Green
Write-Host ""

try {
    python app.py
} catch {
    Write-Host "错误: 应用启动失败" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit 1
}