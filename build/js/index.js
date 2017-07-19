'use strict';

angular.module('app',['ui.router','ngCookies','validation','ngAnimate']);
'use strict';
//.value 定义一个全局变量
angular.module('app').value('dict',{}).run(['dict','$http',function(dict,$http){
	$http.get('data/city.json').then(function(resp){
		dict.city = resp.data;
	});
	$http.get('data/salary.json').then(function(resp){
		dict.salary = resp.data;
	});
	$http.get('data/scale.json').then(function(resp){
		dict.scale = resp.data;
	});
}]);
'use strict';
// 装饰器，修改内置http服务
angular.module('app').config(['$provide', function($provide){
  $provide.decorator('$http', ['$delegate', '$q', function($delegate, $q){
    $delegate.post = function(url, data, config) {
      var def = $q.defer();
      $delegate.get(url).then(function(resp) {
        def.resolve(resp.data);
      }).catch(function(err) {
        def.reject(err);
      });
      return {
        then: function(cb){
          def.promise.then(cb);
        },
        catch: function(cb) {
          def.promise.then(null, cb);
        }
      }
    }
    return $delegate;
  }]);
}]);
'use strict';

angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider.state('main',{
		url:'/main',
		templateUrl: 'view/main.html',
		controller:'mainCtrl'
	}).state('position',{
		url:'/position/:id',
		templateUrl:'view/position.html',
		controller:'positionCtrl'
	}).state('company',{
		url:'/company/:id',
		templateUrl:'view/company.html',
		controller:'companyCtrl'
	}).state('search',{
		url:'/search',
		templateUrl:'view/search.html',
		controller:'searchCtrl'
	}).state('login',{
		url:'/login',
		templateUrl:'view/login.html',
		controller:'loginCtrl'
	}).state('register',{
		url:'/register',
		templateUrl:'view/register.html',
		controller:'registerCtrl'
	}).state('me',{
		url:'/me',
		templateUrl:'view/me.html',
		controller:'meCtrl'
	}).state('post',{
		url:'/post',
		templateUrl:'view/post.html',
		controller:'postCtrl'
	}).state('favorite',{
		url:'/favorite',
		templateUrl:'view/favorite.html',
		controller:'favoriteCtrl'
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
angular.module('app').config(['$validationProvider',function($validationProvider){
	var expression={
		phone:/^1[\d]{10}$/,
		password:function(value){
			var str = value + '';
			return str.length>5;
		},
		required:function(value){
			return !!value;
		}
	};
	var defaultMsg={
		phone:{
			success:'',
			error:'必须是11位数字'
		},
		password:{
			success:'',
			error:'长度至少为6位'
		},
		required:{
			success:'',
			error:'不能为空'
		}
	};
	$validationProvider.setExpression(expression
		).setDefaultMsg(defaultMsg);
}])
'use strict';
angular.module('app').controller('companyCtrl',['$http','$state','$scope',function($http,$state,$scope){
	$http.get('data/company.json?id='+$state.params.id).then(function(resp){
		$scope.company = resp.data;
	})
}]);
'use strict';
angular.module('app').controller('favoriteCtrl',['$http','$scope',function($http,$scope){
	$http.get('data/myFavorite.json').then(function(resp){
		$scope.list = resp.data;
	})
}]);

'use strict';
angular.module('app').controller('loginCtrl',['cache','$state','$http','$scope',function(cache,$state,$http,$scope){
	$scope.submit = function(){
		$http.post('data/login.json',$scope.user).then(function(resp){
			cache.put('id',resp.id);
			cache.put('name',resp.name);
			cache.put('image',resp.image);
			$state.go('main');
		});
	}
}]);

'use strict';
angular.module('app').controller('mainCtrl',['$http','$scope',function($http,$scope){
	$http.get('/data/positionList.json').then(function(resp){
          $scope.list = resp.data
    })
}]);




'use strict';
angular.module('app').controller('meCtrl',['$state','cache','$http','$scope',function($state,cache,$http,$scope){
	if(cache.get('name')){
		$scope.name = cache.get('name');
		$scope.image = cache.get('image');
	}
	$scope.logout = function(){
		cache.remove('id');
		cache.remove('name');
		cache.remove('image');
		$state.go('main');
	}
}]);

'use strict';
angular.module('app').controller('positionCtrl',['$q','$http','$state','$scope','cache',function($q,$http,$state,$scope,cache){
	cache.remove('to');
	$scope.isLogin = false;
	function getPosition(){
		var def = $q.defer();
		$http.get('/data/position.json?id='+$state.params.id).then(function(resp){
			$scope.position = resp.data;
			def.resolve(resp.data);
		}).catch(function(err){
			def.reject(err);
		});
		return def.promise;
	}
	function getCompanyId(id){
		$http.get('data/company.json?id='+id).then(function(resp){
			$scope.company = resp.data;
		})
	}
	getPosition().then(function(obj){
		getCompanyId(obj.companyId)
	})
}]);
'use strict';
angular.module('app').controller('postCtrl',['$http','$scope',function($http,$scope){
	$scope.tabList=[{
		id:'all',
		name:'全部'
	},{
		id:'pass',
		name:'面试邀请'
	},{
		id:'fail',
		name:'不合适'
	}];
	$http.get('data/myPost.json').then(function(resp){
		$scope.positionList = resp.data;
	});
	$scope.filterObj={};
	$scope.tClick = function(id,name) {
		switch(id){
			case 'all':
				delete $scope.filterObj.state;
				break;
			case 'pass':
				$scope.filterObj.state = '1';
				break;
			case 'fail':
				$scope.filterObj.state = '-1';
				break;
			default:
		}
	}
}]);

'use strict';
angular.module('app').controller('registerCtrl',['$interval','$http','$scope','$state',function($interval,$http,$scope,$state){
	$scope.submit = function(){
		console.log($scope.user);
		$http.post('data/regist.json',$scope.user).then(function(resp){
			$state.go('login');
		})
	}
	var count = 60;
	$scope.send = function(){
		$http.get('data/code.json').then(function(resp){
			if(1===resp.data.state){
				count=60;
				$scope.time = '60s';
				var interval = $interval(function(){
					if(count<0){
						$interval.cancel(interval);
						$scope.time='';
					}else{
						count--;
						$scope.time = count+'s';
					}
				},1000)
			}
		})
	}
}]);

'use strict';
angular.module('app').controller('searchCtrl',['dict','$http','$scope',function(dict,$http,$scope){
	$scope.name = '';
	$scope.search = function(){
		console.log($scope.name)
		$http.get('data/positionList.json?name='+$scope.name).then(function(resp){
			$scope.positionList = resp.data;
		})
	}
	$scope.search();
	$scope.sheet={};
	$scope.filterObj={};
	$scope.tabList = [{
		id:'city',
		name:'城市'
	},{
		id:'salary',
		name:'薪水'
	},{
		id:'scale',
		name:'公司规模'
	}];
	var tabId = '';
	$scope.tClick = function(id,name){
		tabId = id;
		$scope.sheet.list = dict[id];
		$scope.sheet.visible=true;
	};
	$scope.sClick = function(id,name){
		if(id){
			angular.forEach($scope.tabList,function(item){
				if(item.id===tabId){
					item.name = name;
				}
			})
		$scope.filterObj[tabId+'Id'] = id;
		}else{
			delete $scope.filterObj[tabId+'Id'];
			angular.forEach($scope.tabList,function(item){
				switch(item.id){
					case 'city':
						item.name = '城市';
						break;
					case 'salary':
						item.name = '薪水';
						break;
					case 'scale':
						item.name ='公司规模';
						break;
					default:
				}
			})
		}
	}
}])
'use strict';
angular.module('app').filter('filterByObj',[function(){
	return function(list,obj){
		var result = [];
		angular.forEach(list,function(item){
			var isEqual = true;
			for(var e in obj){
				if(item[e] !== obj[e]){
					isEqual = false;
				}
			}
			if(isEqual){
				result.push(item)
			}
		});
		return result;
	};
}])
'use strict';
angular.module('app').service('cache', ['$cookies', function($cookies){
    this.put = function(key, value){
      $cookies.put(key, value);
    };
    this.get = function(key) {
      return $cookies.get(key);
    };
    this.remove = function(key) {
      $cookies.remove(key);
    };
}]);

'use strict';
angular.module('app').directive('appCompany', [function(){
  return {
    restrict: 'A',
    replace: true,
    scope:{
    	com:'='
    },
    templateUrl: 'view/template/company.html'
  };
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
angular.module('app').directive('appHeadBar',[function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/headBar.html',
		scope:{
			text:'@'
		},
		link:function($scope){
			$scope.back = function(){
				window.history.back();
			}
		}
	}
}])
'use strict';
angular.module('app').directive('appPositionClass',[function(){
	return{
		restrict:'A',
		replace:true,
		scope:{
			com:'='
		},
		templateUrl:'view/template/positionClass.html',
		link:function($scope){
			$scope.showPositionList = function(idx){
				$scope.positionList = $scope.com.positionClass[idx].positionList;
				$scope.isActive = idx;
			}
			$scope.$watch('com',function(newVal){
				if(newVal) {
					$scope.showPositionList(0);
				}
			})
		}
	}
}])
'use strict';
angular.module("app").directive("appPositionInfo",[function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/positionInfo.html',
		scope:{
			isActive:'=',
			isLogin:'=',
			pos:'='
		},
		link:function($scope){
			$scope.imagePath = $scope.isActive?'image/star-active.png':'image/star.png'
		}
	}
}])
'use strict';
angular.module('app').directive('appPositionList',[function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/positionList.html',
		scope:{
			data:'=',
			filterObj:'=',
			isFavorite:'='
		},
		link:function($scope){
			$scope.select = function(item){
				$http.post('data/favorite.json',{
					id:item.id,
					select:!item.select
				}).then(function(resp){
					item.select = !item.select;
				})
			};
		}
	};
}])
'use strict';
angular.module('app').directive('appSheet',function(){
	return {
		restrict:'A',
		replace:true,
		scope:{
			list:'=',
			visible:'=',
			select:'&'
		},
		templateUrl:'view/template/sheet.html'
	}
})
'use strict';
angular.module('app').directive('appTab',[function(){
	return {
		restrict:'A',
		replace:true,
		scope:{
			list:'=',
			tabClick:'&'
		},
		templateUrl:'view/template/tab.html',
		link:function($scope){
			$scope.click = function(tab){
				$scope.selectId = tab.id;
				$scope.tabClick(tab);
			}
		}
	}
}])