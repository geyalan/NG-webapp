'use strict';

angular.module('app',['ui.router']);
'use strict';

angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider.state('main',{
		url:'/main',
		templateUrl: 'view/main.html',
		controller:'mainCtrl'
	});
	$urlRouterProvider.otherwise('main');
}])

// angular.module('app').config(function($stateProvider,$urlRouterProvider){
// 	$stateProvider.state('main',{
// 		url:'/main',
// 		templateUrl: 'view/main.html',
// 		controller:'mainCtrl'
// 	})
// 	$urlRouterProvider.otherwise('main')
// })
'use strict';
angular.module('app').controller('mainCtrl',['$scope',function($scope){
	$scope.list = [{
    "id": "p3",
    "imageUrl": "/image/company-3.png",
    "job": "销售",
    "companyId": "c3",
    "companyName": "千度",
    "cityId": "c2",
    "cityName": "上海",
    "scaleId": "s4",
    "scaleName": "500人以上",
    "industryId": "i1",
    "industryName": "互联网",
    "salaryId": "s2",
    "salaryName": "3k-5k",
    "experience": "1-3年",
    "education": "专科",
    "benefit": "成长空间大",
    "description": "岗位职责：\n1.销售产品；...",
    "date": "2016-06-01 11:05"
  }, {
    "id": "p4",
    "imageUrl": "/image/company-3.png",
    "job": "产品经理",
    "companyId": "c3",
    "companyName": "千度",
    "cityId": "c3",
    "cityName": "广州",
    "scaleId": "s4",
    "scaleName": "500人以上",
    "industryId": "i1",
    "industryName": "互联网",
    "salaryId": "s6",
    "salaryName": "15k-25k",
    "experience": "5年以上",
    "education": "本科",
    "benefit": "公司氛围好",
    "description": "岗位职责：\n1.制定运营可行的方案；...",
    "date": "2016-05-01 11:05"
  },{
    "id": "p1",
    "imageUrl": "/image/company-1.png",
    "job": "WEB前端",
    "companyId": "c1",
    "companyName": "慕课网",
    "cityId": "c1",
    "cityName": "北京",
    "scaleId": "s2",
    "scaleName": "50-100人",
    "industryId": "i1",
    "industryName": "互联网",
    "salaryId": "s5",
    "salaryName": "10k-15k",
    "experience": "1-3年",
    "education": "本科",
    "benefit": "发展前景好",
    "description": "岗位职责：\n1.负责公司前端页面开发；...",
    "date": "2016-06-01 01:05"
  }]
}]);
'use strict';
 angular.module('app').directive('appFoot',[function(){
 	return {
 		restrict:'A',
 		replace:true,
 		templateUrl:'view/template/foot.html'
 	}
 }])
'use strict';
angular.module('app').directive('appHead',[function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/head.html'
	};
}])
'use strict';
angular.module('app').directive('appPositionList',[function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/positionList.html',
		scope:{
			data:'='
		}
	}
}])