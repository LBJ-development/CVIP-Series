'use strict';
angular.module('CVIPSMApp.createsearch', [])

.controller('createSeriesCtrl', ["$scope",  "DataFtry" ,  function($scope, DataFtry){
	

}])


.directive('createSeries', function(){
	return{
		restrict: "A",
		controller: 'createSeriesCtrl',
		templateUrl: 'components/createSeries-tmp.html',
		link: function (scope, element, attrs){
			
		}
	}
})

