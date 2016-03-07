'use strict';
angular.module('CVIPSMApp.createSeries', [])

.controller('createSeriesCtrl', ["$scope",  "DataFtry" ,  function($scope, DataFtry){
	

}])


.directive('createSeries', function($state){
	return{
		restrict: "A",
		controller: 'createSeriesCtrl',
		templateUrl: 'components/createSearch/createSeries-tmp.html',
		link: function (scope, element, attrs){

			scope.createSeries = function(){
				  $state.go('seriesInfo');

			}
			
		}
	}
})

