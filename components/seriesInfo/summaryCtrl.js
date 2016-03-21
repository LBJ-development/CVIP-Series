'use strict';
angular.module('CVIPSMApp.summaryInfo', [])

.controller('SummaryCtrl',["$rootScope", "$scope",  "$timeout", "CVIPConfig", "DataFtry", "DataTesting",  function($rootScope, $scope, $timeout, CVIPConfig, DataFtry,  DataTesting){

	//console.log("FROM SUMMARY CONTROLLER");

	$scope.summaryData = {
		seriesid: "gdgdf",
		seriesname: "rter",
		analystname:"1111",
		datecreated: "2222",
		subjecttype: "sdf",
		isdeceased: "fsfsdfsd"
	};

	$scope.fieldsData = DataFtry.testData().data;

	//console.log($scope.testData)
	/*$scope.dispActivity = true;
	$scope.dispIdentTime = true;
	$scope.dispDateRecor = true;
	$scope.dispSumStat = true;
	$scope.dispDescription = true;
	$scope.dispChiIdent = true;
	$scope.dispMedia = true;
	$scope.dispImType = true;

 	// CREATE A NEW SERIES /////////////////////////
	$rootScope.$on("createNewSeries", function(event, data){

		$scope.generalInfo.general.seriesId = "123456789";
		$scope.generalInfo.general.seriesName 		= data.seriesName;
		$scope.generalInfo.general.subjecttype 		= data.seriesType;
		$scope.generalInfo.general.analystName 		= data.analystName;
		$scope.generalInfo.general.relatedToCTTA 	= data.relatedToCTTA;
		$rootScope.editable = true;
	});

	$rootScope.$watch(function($rootScope){ return $rootScope.editable},
		function(){ 
			$rootScope.editable ? $scope.dispActivity 	= $scope.dispActivity 	:  $scope.dispActivity = true;
			$rootScope.editable ? $scope.dispIdentTime 	= $scope.dispIdentTime 	:  $scope.dispIdentTime = true;
			$rootScope.editable ? $scope.dispDateRecor	= $scope.dispDateRecor 	:  $scope.dispDateRecor = true;
			$rootScope.editable ? $scope.dispSumStat 	= $scope.dispSumStat 	:  $scope.dispSumStat = true;
			$rootScope.editable ? $scope.dispDescription= $scope.dispDescription:  $scope.dispDescription = true;
			$rootScope.editable ? $scope.dispChiIdent 	= $scope.dispChiIdent	:  $scope.dispChiIdent = true;
			$rootScope.editable ? $scope.dispMedia 		= $scope.dispMedia 		:  $scope.dispMedia = true;
			$rootScope.editable ? $scope.dispImType 	= $scope.dispImType 	:  $scope.dispImType = true;

		});

	$scope.displayActivity 		= function(){ $scope.dispActivity 		= !$scope.dispActivity; };
	$scope.dispIdentTimeline 	= function(){ $scope.dispIdentTime 		= !$scope.dispIdentTime; };
	$scope.dispDateRecord 		= function(){ $scope.dispDateRecor 		= !$scope.dispDateRecor; };
	$scope.dispSumStati			= function(){ $scope.dispSumStat 		= !$scope.dispSumStat; };
	$scope.dispDescriptions 	= function(){ $scope.dispDescription 	= !$scope.dispDescription; };
	$scope.dispChiIdenti 		= function(){ $scope.dispChiIdent 		= !$scope.dispChiIdent; };
	$scope.dispMedias 			= function(){ $scope.dispMedia 			= !$scope.dispMedia; };
	$scope.dispImTypes			= function(){ $scope.dispImType			= !$scope.dispImType; };
*/

}]);