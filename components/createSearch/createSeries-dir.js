'use strict';
angular.module('CVIPSMApp.createSeries', [])

.controller('CreateSeriesCtrl', ["$rootScope", "$scope",  "$state" , "$timeout",  function($rootScope, $scope, $state, $timeout){

	$scope.initialInfo = {};

	$scope.createSeries = function(){
			console.log("FROM INITIAL INFO SENDING END") 

			$state.go('seriesInfo');

			$timeout(function() {
					$rootScope.$broadcast("createNewSeries", $scope.initialInfo);
    		}, 500);


			

			//$rootScope.$broadcast("createNewSeries", $scope.initialInfo);
			
				
	}
}])


.directive('createSeries', function($rootScope, $state){
	return{
		restrict: "A",
		controller: 'CreateSeriesCtrl',
		templateUrl: 'components/createSearch/createSeries-tmp.html',
		link: function (scope, element, attrs){

			
		}
	}
})

