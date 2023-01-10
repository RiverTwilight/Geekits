# Contributing to Ygktool

欢迎你参与贡献！在此之前请先阅读本文。

## 启动项目

```bash
$ npm run dev
# or
$ yarn run dev
```

If your project run successfully, it will opens http://127.0.0.1:3000 in your browser automatically.

## 添加一个工具

在/src/apps 下创建一个目录，并在根目录创建一个`README.zh-CN.md`文件，该文件的头部描述工具信息，内容则会展示给用户。

示例如下：

```markdown
---
name: "日期&时间计算"
status: "stable"
icon: "/icon/Google_Calendar_icon_(2020).svg"
description: "计算两个日期间隔的天数和时间，或推算几天前后是哪一天，可以算算你活了多久 :)"
channel: 4
---

## 这是什么？

这是一个日期计算器。

## 如何使用？
```

## 翻译

除工具文档之外，网站所有的需要翻译的字段都位于`/src/data/i18n/i18n.xlsx`这个表格中。你可以打开自由编辑。

编辑完成后，请先提交 Pull Request，代码审查完后，你可以运行`yarn run i18n:update`命令输出 json 格式文件。

目前需要翻译的语言有：

-   繁体中文（香港）
-   English
-   Francis
