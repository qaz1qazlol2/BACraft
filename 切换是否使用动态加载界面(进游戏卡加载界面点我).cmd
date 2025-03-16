@echo off
echo 本脚本负责切换是否使用动态加载界面
echo 如果你遇到了卡在加载界面的情况请输入N关闭动态加载界面
echo 输入Y启用动态加载界面
echo 输入N关闭动态加载界面
echo 输入C退出脚本
choice /c ync /n
if errorlevel 3 goto quit
if errorlevel 2 goto disable
if errorlevel 1 goto enable




:enable

echo true> ./.minecraft/blue_start_video.txt
echo 启用成功
pause
exit

:disable

echo false> ./.minecraft/blue_start_video.txt
echo 禁用成功
pause
exit

:quit
exit

