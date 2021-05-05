之前有写过 [Android 版本](https://github.com/SheHuan/WanAndroid-MVVM) 和 [小程序版本](https://github.com/SheHuan/WanAndroid-WXMP) 的 玩Android客户端，最近接触到了前端相关的技术，为了巩固加强一下，就抽时间使用 Vue2 + Vant 写了一个移动版 玩Android 客户端，最终的体验效果还是比较符合预期的。有兴趣的可以下载项目体验下。

### 一、说明

* **接口数据来源于 [玩Android开放API](http://www.wanandroid.com/blog/show/2)**

### 二、运行项目
可以直接使用 npm 相关命令运行：
```
# 安装依赖
npm install
# 启动项目，访问localhost:8080，即可
npm run serve
# 也可以打包、部署
npm run build
```
或者导入 vs code、WebStrom等工具运行。
### 三、效果预览
|![](https://upload-images.jianshu.io/upload_images/1633070-bc17496de477be89.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)|![](https://upload-images.jianshu.io/upload_images/1633070-8adbbb74aa6f23b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)|![](https://upload-images.jianshu.io/upload_images/1633070-9bf7be72d471decd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)|![](https://upload-images.jianshu.io/upload_images/1633070-f78282a97699928e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)|
|---|---|---|---|
|![](https://upload-images.jianshu.io/upload_images/1633070-74c7b75fed9a44f8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)|![](https://upload-images.jianshu.io/upload_images/1633070-8ca09a01561e7dee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)|![](https://upload-images.jianshu.io/upload_images/1633070-7e57878dedcc063a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)|![](https://upload-images.jianshu.io/upload_images/1633070-382e80edcb6fcfa9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)|
### 三、已有功能
* 首页banner、文章列表
* 项目分类
* 知识体系
* 网站导航
* 公众号
* 搜索
* 注册、登录、退出
* 文章的收藏、取消