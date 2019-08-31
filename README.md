# Orion
Orion 是一个 Vue.js 的开发环境。

## 开发模式
- [x] SPA（单页应用）
- [x] MPA（多页应用）
- [ ] SSR（服务端渲染）
- [ ] Prerender（预渲染） 

## 目录结构
```
├─build // 存放 Webpack，大多数情况下，你不需要并且避免修改它
├─config // 项目配置，可以通过修改这里的文件自定义某些配置信息
├─dist // 打包之后存放的地方
│  ├─css
│  └─js
├─src // 源代码
│  ├─applications // 应用，即入口文件
│  ├─assets // 存放静态资源 js/img/css 等
│  │  └─img
│  ├─components // 存放可复用组件
│  ├─request // 这里集成了封装好的 axios，可以根据需要再次修改
│  ├─router // 路由
│  ├─services // API 集中管理
│  ├─store // Vuex
│  │  └─modules
│  ├─templates // HTML模板
│  └─views // 存放 Vue 页面视图
└─static // 存放静态资源，并且不经过 Webpack 处理的
```

## 构建入口
Orion 把`Application`文件夹中的每一个`.js`文件作为一个入口，也就是说，当你开发SPA的时候，`Application`文件夹中应该只有一个`index.js`作为项目的入口；而在开发MPA的时候，每一个页面对应一个`.js`文件。

例如，假设`Application`文件夹中有以下的文件：
```
index.js
about.js
log.js
```

当你执行构建时，就会生成这样的HTML：
```
index.html
about.html
log.html
```

## 模板
`src/templates`文件夹中有一个默认的模板`__default__.html`，不建议你删除它。因为在构建时，如果入口文件为`entry123.js`，那么Webpack就会在`src/templates`目录下寻找`entry123.html`作为模板，如果没找到，就选择`__default__.html`作为模板，然后注入相应的`<script>`标签。如果你删除了`__default__.html`，那么你必须确保每次构建前每个入口都能找到一个模板，否则可能会报错。

所以说，**入口文件`xxx.js`与模板`xxx.html`的名字必须是一一对应的**。

## 自定义配置
在`src/config`文件夹下面，存放着4个不同的配置文件，你可以根据自己的喜好去修改配置，但是不建议直接修改`build`文件下的Webpack配置。

### `entry.js` 自定义入口
刚刚说过，当你执行构建时，Webpack会自动扫描`src/application`下的入口文件，分析引入的模块，再执行构建，最终注入到对应的HTML模板中。但是如果你真的不喜欢自动扫描，又或者说只想把部分入口进行打包，那么你可以修改`entry.js`，自定义入口的信息。

假如`src/application`下面有如下若干个入口：
```
entry1.js
entry2.js
entry3.js
```

你只想构建其中的两个，那么，你就在`entry.js`中导出对应的入口配置：
```js
module.exports = {
  'entry1': 'entry1的路径',
  'entry2': 'entry2的路径'
};
```

但你必须保证路径的正确性，建议使用绝对路径。

### `html.config.js` 定制模板信息
对于不同的页面，通过修改`html.config.js`，你可以进一步控制页面对于的HTML模板的一些元数据。

例如我想要修改两个页面的`title`属性，那么可以这样导出：
```js
module.exports = {
    app2: {
        title: 'appppppppppppppppppppppppppppp2'
    }
};
```

更多的配置属性可以参考`html-webpack-plugin`插件的规则：https://www.npmjs.com/package/html-webpack-plugin。

**但需要注意的是，修改 template 以及 filename 属性是无效的。**

### `index.js` 基础配置
Orion集成了`eslint`、`px2rem`等插件，如果你需要，或不需要开启，都可以通过修改`index.js`去定制。详细的字段文件中都有注释。

### `proxy.js` 开发环境跨域
为了不让你直接修改Webpack配置，特意暴露了`devServer.proxy`到`proxy.js`中，你可以在`proxy.js`中添加开发环境跨域的代理信息，具体使用可以看：https://webpack.js.org/configuration/dev-server/#devserverproxy，配置属性一模一样。

## 构建
### 开发
```
npm run dev
```

### 生产
```
npm run build
```

## License
MIT