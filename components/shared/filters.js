'use strict';

angular.module('CVIPSMApp.filters', [])

.filter('rawHtml', ['$sce', function($sce){
  return function(val) {
    return $sce.trustAsHtml(val);
  };
}])

.filter('keys', function() {
    return function(input) {
      if (!input) {
        return [];
      }
      return Object.keys(input);
    };
})

.filter("jsDate", function () {
    return function (x) {
        return new Date(x);
    };
});