'use strict';
angular.module('CVIPSMApp.createSeries', [])

.controller('CreateSeriesCtrl', ["$rootScope", "$scope",  "$state" , "$timeout",  function($rootScope, $scope, $state, $timeout){

	
	$(".seriesMenuItem").removeClass("caseMenu-sel");
	$("#createSeries-men").addClass('caseMenu-sel');
	
	$scope.initialInfo = {};

	$scope.createSeries = function(){

		$state.go('seriesInfo');

		$timeout(function() {
				$rootScope.$broadcast("createNewSeries", $scope.initialInfo);
    	}, 500);	
	}
}])

