# || 编辑器 VS CODE 配置

[[toc]]

## 安装插件 (左侧栏第五个按钮)

> 安装方法：在搜索栏搜索下面的名字然后点击安装即可

- Auto Close Tag (自动完成闭合标签)
- Auto Rename Tag (自动)
- Prettier - Code formatter // 代码格式化
- Vetur // Vue 必备综合插件 包含格式化等
- Beautify css/sass/scss/less // CSS 格式化专门插件
- Chines (Simplified) Language Pack for Visual Studio Code // 中文包
- Document This // 代码头部注释
- Git History // Git 的完善插件
- HTML CSS Support // 在 HTML 中写 CSS
- html to javascipt string // 快速生成字符串拼接
- JavaScript (ES6) code snippets // ES6 的代码提示
- lit-it // 注释用
- Live Server // 静态服务器
- Markdown All in One // 书写 md 用
- minify // 生成压缩文件
- open in browser // 浏览器打开页面
- Path Intellisense // 智能寻找路径
- Sass // 写 CSS 的插件
- vscode-icons // 文件显示图标
- Vue 2 Snippets // Vue2 的脚本提示

## 基础设置

**文件-首选项-设置**
复制如下代码到新打开的页面右侧部分(用户设置)

```js
{
    "emmet.triggerExpansionOnTab": true,
    "workbench.editor.enablePreview": false,
    "workbench.iconTheme": "vscode-icons",
    "liveServer.settings.donotShowInfoMsg": true,
    "workbench.startupEditor": "newUntitledFile",
    "sync.gist": "",
    "sync.lastUpload": "",
    "sync.autoDownload": false,
    "sync.autoUpload": false,
    "sync.lastDownload": "",
    "sync.forceDownload": false,
    "sync.anonymousGist": false,
    "sync.host": "",
    "sync.pathPrefix": "",
    "sync.quietSync": false,
    "sync.askGistName": false,
    "liveServer.settings.donotVerifyTags": true,
    // "fileheader.Author": "zehua.jia",
    // "fileheader.LastModifiedBy": "zehua.jia",
    "window.zoomLevel": 0,
    "workbench.colorTheme": "Dracula",
    "projects.refreshIgnoreFolders": [
        "node_modules"
    ],
    "faker.locale": "zh_CN",
    "workbench.panel.location": "right",
    "material-icon-theme.showUpdateMessage": false,
    "editor.minimap.enabled": false,
    "files.autoSave": "off",
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "html",
        {
            "language": "vue",
            "autoFix": true
        }
    ],
    "eslint.options": {
        "plugins": [
            "html"
        ]
    },
    "search.exclude": {
        "**/node_modules": true,
        "**/bower_components": true
    },
    "files.exclude": {
        "**/.git": true,
        "**/.vscode": true,
        "**/node_modules": true
    },
    "explorer.confirmDelete": false,
    "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
    "faker.locale": "zh_CN",
    "powermode.enabled": true,
    "powermode.enableShake": false,
    "terminal.external.windowsExec": "C:\\Program Files\\my\\cmder\\Cmder.exe",
    "terminal.integrated.shell.windows": "C:\\Program Files\\my\\cmder\\Cmder.exe",
    "sync.removeExtensions": true,
    "sync.syncExtensions": true,
    "vsicons.dontShowNewVersionMessage": true,
}
```

## 快捷键设置

**文件-首选项-键盘快捷方式**
点击顶部搜索框下方的`高级自定义请打开和编辑 keybindings.json`中的链接，会弹出新的`keybindings.json`文件编辑界面，复制下方内容进去，然后保存。如有需要可以自己修改适合自己的方式。

```js
;[
  {
    key: 'ctrl+shift+d',
    command: 'editor.action.addSelectionToNextFindMatch',
    when: 'editorFocus'
  },
  {
    key: 'ctrl+shift+alt+d',
    command: 'workbench.view.debug'
  },
  {
    key: 'ctrl+d',
    command: 'editor.action.deleteLines',
    when: 'editorTextFocus && !editorReadonly'
  },
  {
    key: 'alt+f1',
    command: 'workbench.action.showCommands'
  },
  {
    key: 'alt+win+f1',
    command: 'editor.action.showAccessibilityHelp',
    when: 'editorFocus'
  },
  {
    key: 'ctrl+shift+r',
    command: 'editor.action.copyLinesDownAction',
    when: 'editorTextFocus && !editorReadonly'
  },
  {
    key: 'ctrl+shift+alt+win+r',
    command: 'workbench.action.quickOpenNavigatePreviousInRecentFilesPicker',
    when: 'inQuickOpen && inRecentFilesPicker'
  },
  {
    key: '.',
    command: ''
  },
  {
    key: 'tab',
    command: 'editor.emmet.action.expandAbbreviation',
    when:
      'config.emmet.triggerExpansionOnTab && editorTextFocus && !editorHasMultipleSelections && !editorHasSelection && !editorReadonly && !editorTabMovesFocus'
  }
]
```

## 代码片段

这部分非常主要，是必须要设置的，否则无法实现一些快捷代码
**文件-首选项-用户代码片段**

- 搜索 html，然后按照提示打开 html.json，复制如下代码替换掉固有内容

```js
{
  "ihtml": {
    "prefix": "ihtml",
    "body": [
      "<!DOCTYPE html>",
      "<html>",

      "<head>",
      "<meta charset=\"utf-8\">",
      "<meta name=\"viewport\" content=\"width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0\">",
      "<meta name=\"renderer\" content=\"webkit\">",
      "<title>云南电力市场零售平台</title>",
      "<!--[if lt IE 9]>",
      "<meta http-equiv=\"refresh\" content=\"0;ie.html\" />",
      "<![endif]-->",
      "<link rel=\"stylesheet\" href=\"/libs/plugins/jstree/themes/default/style.min.css\">",
      "</head>",

      "<body>",
      "<div id=\"app\" v-cloak></div>",
      "<script src=\"/libs/verdors/verdors.min.js\"></script>",
      "<script src=\"/libs/table/table.min.js\" type=\"text/javascript\" charset=\"utf-8\"></script>",
      "<script src=\"/libs/file/file.min.js\" type=\"text/javascript\" charset=\"utf-8\"></script>",
      "<script src=\"/libs/plugins/jstree/jstree.min.js\" type=\"text/javascript\" charset=\"utf-8\"></script>",
      "<script src=\"/libs/plugins/laydate/laydate.js\" type=\"text/javascript\" charset=\"utf-8\"></script>",

      "</body>",
      "</html>"
    ],
    "description": "新交易系统项目HTML页面骨架"
  },


}
```

**文件-首选项-用户代码片段**

- 搜索 javascript，然后按照提示打开 javascript.json，复制如下代码替换掉固有内容

```js
{
 "document ready": {
    "prefix": "domready",
    "body": ["$(document).ready(function(){$1})"],
    "description": ""
  },
  "this": {
    "prefix": "th",
    "body": ["let vm = this"],
    "description": ""
  },

  "opt": {
    "prefix": "opt",
    "body": [
      "[",
      "{ text: '选项一', value: 'A' },",
      "{ text: '选项二', value: 'B' },",
      "]"
    ],
    "description": ""
  },
  "render": {
    "prefix": "render",
    "body": ["render: function(data, type, row, meta) {", "return data", "}"],
    "description": ""
  },
  "watch": {
    "prefix": "wat",
    "body": [
      "watch: {",
      "xxx$1: {",
      "deep: false,",
      "immediate: false,",
      "handler: function(newValue, oldValue) {",
      "this.xxx$1(newValue)",
      "}",
      "}",
      "},"
    ],
    "description": ""
  },
  "Api post": {
    "prefix": "Apipost",
    "body": [
      "let vm = this",
      "Api.post(vm.urls.main$1, {",
      "username: _this.username,",
      "}).then(response=> {",
      "console.log(response.data)",
      "});"
    ],
    "description": ""
  },
  "Api get": {
    "prefix": "Apiget",
    "body": [
      "let vm = this",
      "Api.get(vm.urls.main$1).then(response=> {",
      "console.log(response.data)",
      "});"
    ],
    "description": ""
  },
  "Api put": {
    "prefix": "Apiput",
    "body": [
      "let vm = this",
      "Api.put(vm.urls.main$1, {",
      "username: _this.username,",
      "}).then(response=> {",
      "console.log(response.data)",
      "});"
    ],
    "description": ""
  },
  "Api delete": {
    "prefix": "Apidel",
    "body": [
      "let vm = this",
      "Api.delete(vm.urls.main$1).then(response=> {",
      "console.log(response.data)",
      "});"
    ],
    "description": ""
  },
  "ijs": {
    "prefix": "ijs",
    "body": [
      "import Css from 'CSS'",
      "import common from 'COMMON'",
      "import App from './app'",

      "new Vue({",
      "el: '#app',",
      "render: h => h(App)",
      "})"
    ],
    "description": "新交易系统项目JS页面骨架"
  },
  "mock": {
    "prefix": "mock",
    "body": [
      "Mock.mock('/mock/$1', 'get', function(option) {",
      "return {",
      "status: 200,",
      "data: ''",
      "}",
      "})"
    ],
    "description": "mock"
  }
}
```

**文件-首选项-用户代码片段**

- 搜索 vue，然后按照提示打开 vue.json，复制如下代码替换掉固有内容

```js
{
  "ivue": {
    "prefix": "ivue",
    "body": [
      "<style lang=\"scss\" scoped></style>",
      "<template>",
      "<i-body>",
      "<i-box title=\"\">",
      "</i-box>",
      "</i-body>",
      "</template>",
      "<script>",
      "export default {",
      "data() {",
      "let data = this.$$baseData;",
      "data.info.title = '$1页面标题'; ",
      "return data;",
      "},",
      "methods: {",
      " ready() {",
      "let vm = this; ",
      " },",
      "},",
      "}",
      "</script>"
    ],
    "description": "vue"
  },
  "iform": {
    "prefix": "iform",
    "body": [
      "<i-form id=\"addMenuForm\" data-vv-scope=\"addMenuForm\" :error=\"errors\">",
      "<i-row>",
      "<i-col>",
      "<i-form-input label=\"资源路径\" id=\"iyuanlujing\" v-model=\"demo1\"></i-form-input>",
      "</i-col>",
      "<i-col>",
      "<i-form-select label=\"类型\" id=\"leixing\" v-model=\"selected\" :options=\"opt\">*</i-form-select>",
      "</i-col>",
      "</i-row>",
      "</i-form>"
    ],
    "description": ""
  }
}
```
