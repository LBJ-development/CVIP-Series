'use strict';
angular.module('CVIPSMApp.reports', [])

.controller('ReportsCtrl', ["$rootScope", "$scope",  "$state" , "$timeout",  function($rootScope, $scope, $state, $timeout){

	$(".seriesMenuItem").removeClass("caseMenu-sel");
	$("#reports-men").addClass('caseMenu-sel');

	//$scope.initialInfo = {};

/*	$scope.createSeries = function(){

		$state.go('seriesInfo');

		$timeout(function() {
				$rootScope.$broadcast("createNewSeries", $scope.initialInfo);
    	}, 500);	
	}*/
}])

