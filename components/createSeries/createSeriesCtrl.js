'use strict';
angular.module('CVIPSMApp.createSeries', [])

.controller('CreateSeriesCtrl', ["$rootScope", "$scope",  "$state" , "$timeout",  "CVIPConfig", "DataFtry",   function($rootScope, $scope, $state, $timeout, CVIPConfig, DataFtry){

	
	$(".seriesMenuItem").removeClass("caseMenu-sel");
	$("#createSeries-men").addClass('caseMenu-sel');
	
	$scope.initialInfo = {};

    $scope.seriesName = {};
	
     $scope.init= function(){
	 var url = CVIPConfig.contextPath + "names";
     DataFtry.getData(url).then(function(result){ 
		$scope.seriesName  =  result ;
	 });

	}


	$scope.createSeries = function(){
       var jsonString = JSON.stringify({
	                name: $scope.initialInfo.seriesName,
	                analystName:$scope.initialInfo.analystName,
	                subjecttype:$scope.initialInfo.seriesType,
	                relatedtoCTTA:$scope.initialInfo.relatedToCTTA,
	                relatedtoCT:$scope.initialInfo.relatedToCT
		        });

         var url = CVIPConfig.contextPath;
         //console.log(jsonString);
	     DataFtry.sendData(url, jsonString).then(function(response){ 
			  var duplicate = response.data["duplicate"];
			  if (duplicate ==true){
			  	console.log("duplicate exists");
			  	$scope.errorMsg="The series name " + $scope.initialInfo.seriesName +" already exists."
			  }
			  else{
			   		$state.go('seriesInfo');
					// $timeout(function() {
					// 	$rootScope.$broadcast("createNewSeries", response.data);
	   				//     		}, 500);
	                 //console.log(response.data.seriesId );

	                 $timeout(function() {
					 	$rootScope.$broadcast("loadExistingSeries", {seriesId: response.data.seriesId});
					 	$rootScope.editable = true;
					 }, 500);

			  }
		});	
	}
}])

