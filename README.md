# Vue组件封装及Vue-router使用

> 封装了工作中常用到的HTML组件以及其他布局组件.
<!--下载Syncing,然后token GIST:34c57c6c659830cdd39a02e54982b9d019a48243  -->
## NOTE
### 在'\node_modules\webpack-dev-server\lib\Server.js'中,需要修改文件
#### 加入以下代码
```javascript
 const ma = require('./../../../route-nodejs/index.js'); 
 //... express about
 app.use('/ma', ma);
```
## 安装步骤
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
