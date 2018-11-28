# translate

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 小结：
 最后打包出现的一些问题，各种路径问题。。
 1、svg  因为引入了mui，在mui的css文件中有涉及到svg且它是使用单引号的，此时如果不改成双引号，打包时将会报错，报错如下

building for production...Error processing file: static/css/app.8dee8ecc6ec64a74b4dc40f5a33f6190.css
(node:8520) UnhandledPromiseRejectionWarning: postcss-svgo: Error in parsing SVG: Unquoted attribute value
Line: 0
Column: 14
Char: \
(node:8520) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 3)
(node:8520) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

2、改完后可以打包，但是网页出现空白情况，各种路径引用报错，需要修改config 下的i ndex.js

![1538918931351](C:\Users\asus\AppData\Local\Temp\1538918931351.png)

还有 在引用自定义字体图标再次报错，则修改 build 文件下的 utils.js 

![1538919087865](C:\Users\asus\AppData\Local\Temp\1538919087865.png)

3、还有一个问题尚未解决    项目中使用了axios请求，发现报错。。。

时间问题尚未解决。。。。

### 需要改进的问题

1、作为vue移动端的项目在使用流式布局没有使用rem去处理像素问题

2、作为练手项目，同时使用了两个ui框架，mui与mint-ui，当然实际项目中一个就好，另外ui组件尽可能的使用用啥引啥，不要全部引进去

3、在使用vuex不够规范，因为使用的较简单，偷了一下懒。。。

这一块项目中还使用了bus的方法，但是进行了注释。。。