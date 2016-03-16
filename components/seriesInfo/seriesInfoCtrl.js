'use strict';
angular.module('CVIPSMApp.seriesInfo', [])

.controller('SeriesInfoCtrl',["$rootScope",  "$scope", "$window", "$state" , "$timeout", "CVIPConfig", "DataFtry", "WindowSizeFtry" , "DataTesting",  function($rootScope, $scope, $window, $state, $timeout, CVIPConfig, DataFtry, WindowSizeFtry, DataTesting){

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
	$rootScope.editable = false;
	$scope.generalInfo = { general: {}, dateRecordStarted: {}, activity: {}};
	$scope.showSPF = false; // HACK TO DETERMINE IF THE PHYSICAL LABEL NEED TO SHOW IN THE VIEW MODE OF THE SUSPECT SECTION
	$scope.suspectList = [];
	$scope.childrenList = [];
	$scope.exifsList = [];
	$scope.leadsList = [];
	$scope.leapocsList = [];
	$scope.contactsList = [];
	var lists = [$scope.suspectList, $scope.childrenList, $scope.exifsList, $scope.leadsList, $scope.leapocsList, $scope.contactsList];
	var sections = ["Suspect", "Child", "EXIFS", "Lead", "LEA POC", "Contact"];
	var currentSection = "";
	var currentList = [];

	// LOAD AN EXISTING SERIES //////////////////////////////
	$rootScope.$on("loadExistingSeries", function(event, data){
			
        var url = CVIPConfig.contextPath + "/info/" + data.seriesId;
        DataFtry.getData(url).then(function(result){

        	$scope.generalInfo = result.data.general[0];

				console.log($scope.generalInfo)
        	})
		});



	// SELECT SUB ITEM IN LIST //////////////////////
	$scope.selectItem = function(index, section, n){
		currentList = lists[n];
		currentSection = sections[n]
		$scope.itemIndex = index;
		$state.go("seriesInfo." + section);
	}

	// ADD A SUSPECT ////////////////
	$scope.addSuspect = function(){
		currentList = $scope.suspectList;
		currentSection = "Suspect"
		var defaultName = "Suspect # " + ($scope.suspectList.length + 1);

		$scope.suspectList.push({
			name: defaultName,
			agegroup: "",
			age: "",
			uploadedphotos: [{}],
			birthdate: "",
			haircolor: "",
			eyecolor: "",
			gender: "",
			ethnicity: "",
			isdeceased: false,
			physicalfeatures: {freckles: false, scars: false, glasses: false, moles: false, braces: false, makeup: false, tatoos: false, acne: false, watch: false, jewelry: false, nailpolish: false, piercing: false },
			description: ""
		 });
		$rootScope.editable = true;
		$scope.supectLabels = ["Suspect Name", "Age Group", "Age", "Uploaded Photos", "Birhdate", "Hair Color", "Eye Color", "Gender", "Ethnicity", "Is Deceased", "Physical Features", "Description"];
		$scope.physicalfeatures = ["Freckles", "Scars", "Glasses", "Moles", "Braces", "Makeup", "Tatoos", "Acne", "Watch", "Jewelry", "Nail Polish","Piercing"];
		
		// DISPLAY THE SUSPECT INFO
		$state.go('seriesInfo.suspect');
		// DISPLAY  AN EMPTY TEMPLATE
		$scope.itemIndex = $scope.suspectList.length -1; 

	}

	$scope.deleteItem = function(){
		currentList.splice([$scope.itemIndex], 1);
		$scope.itemIndex = $scope.suspectList.length -1;
	}
	$scope.editItem = function(){
		console.log($scope.generalInfo.activity)

		$rootScope.editable = !$rootScope.editable;
		// HACK TO DETERMINE IF THE PHYSICAL LABEL NEED TO SHOW IN THE VIEW MODE OF THE SUSPECT SECTION
		$timeout(function() {
			$scope.showSPF = $("#spf").text().length >0;
    	}, 500);

		

	}

	$scope.isEmpty = function(evt){
		// WHEN THE CONTENT OF THE FIRST FIELD IS DELETED => PUT A PLACE HOLDER
		if(currentList[$scope.itemIndex].name == undefined) currentList[$scope.itemIndex].name = currentSection + ' # ' + ($scope.itemIndex + 1);
	}



}]);