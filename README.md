# NG-webapp
angularjs 仿拉勾网

### angularjs调试工具
调试工具：batarang  
主要功能：查看作用域、输出调试信息、性能监控

### bower的使用
bower init  
bower install --save angular  
bower uninstall --save [name]

### less
常用语法：定义变量、后代选择器、文件引用（@import "filename"）、函数

### 单页应用
定义：页面跳转无刷新  
方法：利用路由控制页面跳转  
优点：页面切换流畅、前后端分离

### 自动化构建工具：gulp
优点：基于流、任务化  
常用API：src、dest、watch、task、pipe

### 初始化项目
npm init  
当前目录下安装gulp  
npm i --save-dev gulp

### 安装gulp插件
npm i --save-dev gulp-clean gulp-concat gulp-cssmin gulp-imagemin
gulp-less gulp-load-plugins gulp-uglify open

### 创建模块
angular.module('app',['依赖声明']);

### 启动模块
ng-app="模块名"

### 路由配置
安装ui-router  
bower install --save ui-router  
同时也需要将源文件包含到页面中：
    <script type="text/javascript" src="app/bower_components/angular-ui-router/release/angular-ui-router.js"></script>
与集成的ngRoute服务不同的是，UI-Router可以将视图嵌套，因为它基于的是操作状态而仅非URL。与传统做法使用ng-view不同的是，在ngRoute里需要使用ui-view服务。当在ui-router中处理路由和状态时，开发者的重心是当前的状态是什么以及在哪一个页面里。
<div ui-view></div>

和ngRoute一样，为特定状态指定的模板将会放在<div ui-view></div>元素中。在这些模板中也可以包含自己的ui-view,这就是在同一个路由下实现嵌套视图的方法。要定义一个路由，与传统的方法相同：使用.config方式，但使用的不是$routeProvider而是$stateProvider。  

