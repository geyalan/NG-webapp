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