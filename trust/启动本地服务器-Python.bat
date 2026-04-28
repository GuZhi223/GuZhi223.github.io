@echo off
chcp 65001 >nul
echo ============================================
echo   信任的进化 - 本地服务器 (Python版)
echo ============================================
echo.

where python >nul 2>nul
if %errorlevel% neq 0 (
    where python3 >nul 2>nul
    if %errorlevel% neq 0 (
        echo [错误] 未检测到 Python，请先安装 Python
        echo 下载地址: https://www.python.org/downloads/
        echo.
        echo 或者使用 启动本地服务器.bat (需要 Node.js)
        echo.
        pause
        exit /b 1
    )
    echo 正在启动本地服务器...
    echo.
    echo 启动成功！请在浏览器中访问:
    echo.
    echo   http://localhost:8080
    echo.
    echo 按 Ctrl+C 停止服务器
    echo ============================================
    python3 -m http.server 8080
) else (
    echo 正在启动本地服务器...
    echo.
    echo 启动成功！请在浏览器中访问:
    echo.
    echo   http://localhost:8080
    echo.
    echo 按 Ctrl+C 停止服务器
    echo ============================================
    python -m http.server 8080
)
