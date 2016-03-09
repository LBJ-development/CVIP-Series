'use strict';
angular.module('CVIPSMApp.seriesInfo', [])

.controller('seriesInfoCtrl',[ "$rootScope",  "$scope", "$window", "$state" , "$timeout", "CVIPConfig", "DataFtry", "WindowSizeFtry" , "DataTesting",  function($rootScope, $scope, $window, $state, $timeout, CVIPConfig, DataFtry, WindowSizeFtry, DataTesting){

	// RESIZE THE INFO HOLDER WHEN ONE RESIZE WINDOW
	var offset = 255;
	var infoWidth = $("#wrapper").width() - offset;
	$rootScope.$on('wrapperWidthChanges', function (event, data) {
		$("#mainBodyWrapper").css('width', data - offset);
	});

	$scope.init = function (){
		$("#mainBodyWrapper").css('width', infoWidth);
		$state.go('seriesInfo.general');
	}

	$scope.backToSearch = function(){
		  $state.go('search');
	}

	$scope.itemIndex = 0;
	$scope.seriesName= "Series Name";
	$scope.suspectList = [];
	$scope.childrenList = [];
	$scope.exifsList = [];
	$scope.leadsList = [];
	$scope.leapocsList = [];
	$scope.contactsList = [];

	// SELECT SUB ITEM IN LIST //////////////////////
	$scope.selectItem = function(index, section){
		$scope.itemIndex = index;
		$state.go(section);
	}

	$scope.addSuspect = function(){

		var defaultName = "Suspect # " + ($scope.suspectList.length + 1);

		$scope.suspectList.push({
			name: defaultName,
			ageGroup: "",
			age: "",
			uploadedPhotos: [{}],
			birthdate: "",
			hairColor: "",
			eyeColor: "",
			gender: "",
			ethnicity: "",
			isDeceased: false,
			physicalFeatures: {freckles: false, scars: false, glasses: false, moles: false, braces: false, makeup: false, tatoos: false, acne: false, watch: false, jewelry: false, nailPolish: false, piercing: false },
			Description: ""
         });
		// DISPLAY THE SUSPECT INFO
		$state.go('seriesInfo.suspect');
		// DISPLAY  AN EMPTY TEMPLATE
		$scope.itemIndex = $scope.suspectList.length -1;
	}



}]);