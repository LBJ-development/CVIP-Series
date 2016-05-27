'use strict';
angular.module('CVIPSMApp.createSeries', [])

.controller('CreateSeriesCtrl', ["$rootScope", "$scope",  "$state" , "$timeout", "CVIPConfig", "DataFtry",  function($rootScope, $scope, $state, $timeout, CVIPConfig, DataFtry){

	$scope.initialInfo = {};

	
}])


.directive('createSeries', function($rootScope, $state){
	return{
		restrict: "A",
		controller: 'CreateSeriesCtrl',
		templateUrl: '/series/components/createSearch/createSeries-tmp.html',
		link: function (scope, element, attrs){

			
		}
	}
})

