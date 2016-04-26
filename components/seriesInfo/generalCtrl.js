'use strict';
angular.module('CVIPSMApp.generalInfo', [])

.controller('GeneralCtrl',["$rootScope", "$scope",  "$timeout", "CVIPConfig", "DataFtry", "DataTesting", '$window', "$state","$http",   function($rootScope, $scope, $timeout, CVIPConfig,  DataFtry,  DataTesting, $window, $state, $http){

	$scope.dispActivity = true;
	$scope.dispIdentTime = true;
	$scope.dispDateRecor = true;
	$scope.dispSumStat = true;
	$scope.dispDescription = true;
	$scope.dispChiIdent = true;
	$scope.dispMedia = true;
	$scope.dispImType = true;

 	// CREATE A NEW SERIES /////////////////////////
	$rootScope.$on("createNewSeries", function(event, data){

		$scope.generalInfo.general.seriesId = data.seriesId;
		$scope.generalInfo.general.seriesName 		= data.series;
		$scope.generalInfo.general.subjecttype 		= data.subjecttype;
		$scope.generalInfo.general.analystName 		= data.analyst;
		$scope.generalInfo.general.relatedToCTTA 	= data.relatedToCtta;
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


	$scope.deleteSeries = function (seriesId) {
			if (window.confirm("Are you sure you want to delete this Series?")){
				var url=CVIPConfig.contextPath+ $scope.generalInfo.general.seriesId;
				DataFtry.deleteDat(url).then(function(result){ 
				//  console.log("DELETE = "+ result);
                  //if (result==true) 
                      $state.go('search');

                      $timeout(function() {
                      	$rootScope.$broadcast("seriesDeleted");
                      }, 500);
                  //else
                  //	console.log("PROBLEM DELETING SERIES");

			    });
		}
		//else
		// Nothing to delete
	}


	$scope.saveSeries = function (seriesId) {
		 console.log("updating series");
	     var url=CVIPConfig.contextPath+'entity/'+ $scope.generalInfo.general.seriesId;   
	     var data = {
	        seriesId: $scope.generalInfo.general.seriesId,
	        series: $scope.generalInfo.general.seriesName,
	        alias: $scope.generalInfo.general.alias,
			subjecttype: $scope.generalInfo.general.subjecttype, 		
			analyst: $scope.generalInfo.general.analystName,		
			relatedToCtta: $scope.generalInfo.general.relatedToCTTA 
	     };

		DataFtry.updateData(url,data).then(function(result){
			$scope.msg="This series has been successfully updated.";
			$rootScope.editable = false;
		});
	  
	}

}]);