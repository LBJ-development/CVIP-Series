'use strict';
angular.module('CVIPSMApp.searchSeries', [])
.controller('searchSeriesCtrl', ["$rootScope", "$scope",  "$state" , "$timeout", "$http",  function($rootScope, $scope, $state, $timeout, $http){
}])


angular.module('searchSeries', []).directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
    };
});
