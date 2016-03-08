'use strict';
angular.module('CVIPSMApp.seriesInfo', [])

.controller('seriesInfoCtrl',[ "$rootScope",  "$scope", "$window", "$state" , "$timeout", "CVIPConfig", "DataFtry", "WindowSizeFtry" , "DataTesting",  function($rootScope, $scope, $window, $state, $timeout, CVIPConfig, DataFtry, WindowSizeFtry, DataTesting){

	$scope.init = function (){
		// initializeDisplayList();
		 //console.log(DataTesting.getData(100));
		 //console.log("FROM SERIES INFO")
	}

	$scope.backToSearch = function(){
		  $state.go('search');
	}

	$scope.seriesName= "Series Name";
	$scope.suspectList = [];
	$scope.childrenList = [];
	$scope.exifsList = [];
	$scope.leadsList = [];
	$scope.leapocsList = [];
	$scope.contactsList = [];

// RESIZE THE INFO HOLDER WHEN ONE RESIZE WINDOW
	var offset = 255;
	var infoWidth = $("#wrapper").width() - offset;
	$("#mainBodyWrapper").css('width', infoWidth);

	$rootScope.$on('wrapperWidthChanges', function (event, data) {
			
		$("#mainBodyWrapper").css('width', data - offset);
	});
}]);