@echo off
chcp 65001 >nul
echo ============================================
echo   信任的进化 - 本地服务器
echo ============================================
echo.
echo 正在启动本地服务器...
echo.

where npx >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js/npx，请先安装 Node.js
    echo 下载地址: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo 启动成功！请在浏览器中访问:
echo.
echo   http://localhost:8080
echo.
echo 按 Ctrl+C 停止服务器
echo ============================================

npx --yes http-server . -p 8080 -c-1 --cors -o
