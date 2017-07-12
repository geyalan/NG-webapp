// 'use strict';
// angular.module('app').directive('appCompany',[function(){
// 	return{
// 		restrict:'A',
// 		replace:true,
// 		tempalteUrl:'view/tempalte/company.html'
// 	}
// }])

'use strict';
angular.module('app').directive('appCompany', [function(){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/company.html'
  };
}]);
