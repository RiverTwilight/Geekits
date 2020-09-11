## About

于2020年2月启动，一个渐进式在线工具网站，技术栈是Typescript + Create React App.

## Contribution

```sh
# start devServer
npm start
# build produnction 
npm run build
```

## 添加工具

首先需要添加工具配置文件。文件位于`./utils/appList.js`，包含了所有工具配置。

Name|type|default|description
----|----|-------|-----------
link|string| -- |工具对应的app文件夹下的文件名。设置成*coming*即可作为即将到来的工具发布
name|string| -- |工具的名称
network|boolean|false|是否需要联网使用
icon|string| -- |工具对应的MaterialDesign图标名

## API接口规范

### 用户


## License

Copyright (c) RiverTwilight. All rights reserved.

Licensed under the MIT license.
