@echo off
echo Starting ngrok with configuration...
echo Current directory: %CD%
echo.

ngrok start --all --config=ngrok.yml
if %ERRORLEVEL% NEQ 0 (
    echo Failed to start ngrok
    echo Error code: %ERRORLEVEL%
    pause
    exit /b 1
)

echo.
echo Press any key to exit...
pause > nul 