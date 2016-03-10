angular.module('CVIPSMApp.sections', [])

.controller('SuspectCtrl',[ "$rootScope",  "$scope", "$window", "$state" , "$timeout", "CVIPConfig", "DataFtry", "WindowSizeFtry" , "DataTesting",  function($rootScope, $scope, $window, $state, $timeout, CVIPConfig, DataFtry, WindowSizeFtry, DataTesting){
	console.log("FROM SUSPECT")
	// ADD A SUSPECT ////////////////
	$scope.addSuspect = function(){

		console.log("FROM SUSPECT")
		currentList = $scope.suspectList;
		currentSection = "Suspect"
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

}])