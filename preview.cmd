@echo off
title XUX Group - Local Preview
"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\preview.ps1"
if errorlevel 1 (
  pause
  exit /b 1
)
