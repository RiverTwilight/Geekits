## 关于

于2020年7月启动，一个在线工具网站，技术栈是React + Typescript + Create React App.

### 开发者

+ 江村暮


## 脚本

### 启动开发服务器

```sh
npm start
```

### 编译生产版本

```sh
npm run build
```

## 结构

### 工具列表

列表文件位于`./utils/appList.js`
Name|type|default|description
----|----|-------|-----------
link|string| -- |工具对应的app文件夹下的文件名。设置成*coming*即可作为即将到来的工具发布
network|boolean|false|是否需要联网使用
icon|string| -- |工具对应的MaterialDesign图标名
