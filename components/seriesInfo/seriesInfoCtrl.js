'use strict';
angular.module('CVIPSMApp.seriesInfo', [])

.controller('seriesInfoCtrl',[ "$rootScope",  "$scope", "$window", "$state" , "$timeout", "CVIPConfig", "DataFtry", "DataTesting",  function($rootScope, $scope, $window, $state, $timeout, CVIPConfig, DataFtry, DataTesting){

	$scope.init = function (){
		// initializeDisplayList();
		 //console.log(DataTesting.getData(100));
	}

	$scope.backToSearch = function(){

		  $state.go('search');

	}

}]);