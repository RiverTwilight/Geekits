<div align="center">
  <h1>!! This branch is no longer maintained, please work on v2 branch !!</h1>
</div>

<p align="center">
  <a href="https://www.ygktool.cn">
    <img width="180" src="https://www.ygktool.cn/logo_design.svg">
  </a>
</p>

<h1 align="center">云极客工具</h1>

<div align="center">

[English](./README-en.md) | 简体中文

</div>

一个渐进式在线工具网站，是由 MaterialDesign , Typescript , React 等许多爱意构建成的.

我们希望把她打造成一个精美但简约、实用又简单的在线工具箱。

## 贡献

**本项目采用开发+部署的分支策略(master + dev)，master 分支将自动部署到网站正式地址。**

你可以使用 Gitpod 进行在线开发：

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/rivertwilight/ygktool)

或者克隆到本地开发:

```bash
$ git clone git@github.com:rivertwilight/ygktool.git
$ cd ygktool
$ npm install
$ npm start
```

打开浏览器访问 http://127.0.0.1:3000.

强烈建议安装这个[vscode 插件](https://github.com/Gruntfuggly/todo-tree)来查看和增添待办事项。

### 目录结构

```
src
  └── views页面

  └── utils工具函数

  └── svg

  └── layout布局组件

  └── data数据

  └── components组件

  └── apps应用
```

### 样式

统一使用 MDUI 这个 css 框架，由于它是基于 html 的，所以我单独封装了一个 [React 版本](https://github.com/RiverTwilight/mdui-in-react)，你也可以在这里添加新组件。

布局需尽量遵循 [Material Design 设计规范](http://material.io/design).

### 新增工具

首先需要添加工具配置。文件位于`./utils/appList.js`，包含了所有工具配置。

建议使用编写好的脚本快速添加。

```bash
npm run new:App
```

| Name        | type    | default | description                                                               |
| ----------- | ------- | ------- | ------------------------------------------------------------------------- |
| link        | string  | --      | 工具对应的 app 文件夹下的文件名。设置成*coming*即可作为即将到来的工具发布 |
| name        | string  | --      | 工具的名称                                                                |
| network     | boolean | false   | 【可选】是否需要联网使用，需要联网的工具在离线使用时会提示。              |
| description | string  | --      | 【可选】工具描述                                                          |
| icon        | string  | --      | 工具对应的 MaterialDesign 图标名                                          |

添加配置后，在`./apps/`下添加一个和配置中 Link 同名的文件夹，默认 index.\*为入口文件。

接着，在工具目录添加一个 README.md 作为工具帮助，你可以自由地使用 Markdown 语法创作。

访问/app/\<link\>即可调试.

### 开发规范

我们使用[Angular-commit](https://gist.github.com/brianclements/841ea7bffdb01346392c) 作为提交规范。

-   **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
-   **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
-   **docs**: Documentation only changes
-   **feat**: A new feature
-   **fix**: A bug fix
-   **perf**: A code change that improves performance
-   **refactor**: A code change that neither fixes a bug nor adds a feature
-   **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
-   **test**: Adding missing tests or correcting existing tests

欢迎随时纠正我在代码中的不良习惯。

由于学业繁忙，项目时间跨度久，我也处在技术成长期，仍旧有许多“破窗”。若能帮助重构不胜感激！

### 备注

-   请勿改动网站的统计代码
-   请勿随意修改[关于页面](src\views\about.tsx)信息。

## License

Copyright (c) RiverTwilight. All rights reserved.

Licensed under the MIT license.

## 捐赠

我是一个没有任何收入来源的高中生，如果你喜欢云极客，可以给我买一杯奶茶!

<img width="200" height="200" src="https://i.loli.net/2020/09/12/CoJjtlHBskeMdKI.png">
<img width="200" height="200" src="https://i.loli.net/2020/09/12/Mq1TBZSwnDHVRxv.png">
