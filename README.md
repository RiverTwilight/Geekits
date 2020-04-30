# 编译完毕后先把/build下的service-worker.js内容替换为/public下的同名文件内容！
# After compiling, replace the service-worker.js content under / build with the same name file content under / public

# 工具列表

列表文件位于`./utils/appList.js`
Name|type|default|description
----|----|-------|-----------
link|string| -- |工具对应的app文件夹下的文件名。设置成*coming*即可作为即将到来的工具发布
network|boolean|false|是否需要联网使用
icon|string| -- |工具对应的MaterialDesign图标名
