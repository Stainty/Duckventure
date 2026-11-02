@echo off
if exist "python.exe" (
  python scripts\build.py
) else (
  python scripts\build.py 2>nul || node scripts\build.mjs
)
if %ERRORLEVEL% equ 0 (
  echo Build successful!
) else (
  echo Build failed!
)
pause
