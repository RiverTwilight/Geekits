<p align="center">
  <a href="https://www.ygktool.cn">
    <img width="180" src="https://www.ygktool.cn/logo_design.svg">
  </a>
</p>

<h1 align="center">Ygktool</h1>

<div align="center">

English | [简体中文](./README.md)

</div>

A progressive online tool website, built by MaterialDesign, Typescript, React and many other loves.

We hope to build her into a beautiful but simple, practical and simple online toolbox.

## Contribution

**This project adopts the development + deployment branch strategy (master + dev), the master branch will be automatically deployed to the official website address.**

You can use Gitpod for online development：

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/rivertwilight/ygktool)

Or clone to local development:

```bash
$ git clone git@github.com:rivertwilight/ygktool.git
$ cd ygktool
$ npm install
$ npm start
```

Open browser and visit http://127.0.0.1:3000.

We strongly recommend to install this [vscode extension](https://github.com/Gruntfuggly/todo-tree)to check the todoes.

### Folder Structure

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

### Style

统一使用 MDUI 这个 css 框架，由于它是基于 html 的，所以我单独封装了一个 [React 版本](https://github.com/RiverTwilight/mdui-in-react)，你也可以在这里添加新组件。

布局需尽量遵循 [Material Design 设计规范](http://material.io/design).

### Add Tools

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

Then, add a README.md as tool help in the tool directory, and you can freely use Markdown syntax to create.

访问/app/\<link\>即可调试.

### 开发规范

We use[Angular-commit](https://gist.github.com/brianclements/841ea7bffdb01346392c) as the commit form.

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

### Others

-   Do not change the statistics code of the website
-   请勿随意修改[关于页面](src\views\about.tsx)信息。

## License

Copyright (c) RiverTwilight. All rights reserved.

Licensed under the MIT license.

## Donation

I am a high school student without any source of income. If you like this website, you can buy me a cup of milk tea!

<img width="200" height="200" src="https://i.loli.net/2020/09/12/CoJjtlHBskeMdKI.png">
<img width="200" height="200" src="https://i.loli.net/2020/09/12/Mq1TBZSwnDHVRxv.png">
