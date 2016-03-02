'use strict';
angular.module('CVIPSMApp.createsearch', [])

.controller('createSeriesCtrl', function($scope){
	
	console.log("FROM CREATE SERIE CONTROLER")
})


.directive('createSeries', function(){
	return{
		restrict: "A",
		controller: 'createSeriesCtrl',
		templateUrl: 'components/createSeries-tmp.html',
		link: function (scope, element, attrs){
			
		}
	}
})

