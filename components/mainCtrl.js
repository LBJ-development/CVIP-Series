'use strict';

app.controller('MainCtrl',[ "$rootScope",  "$scope", "$window", "$state",  function($rootScope, $scope, $window, $state){

/*	var win = angular.element($window);
	$scope.stateName;

	$rootScope.$on('$stateChangeStart',  function(event, toState, toParams, fromState, fromParams){ 
		$scope.stateName = toState.name;
	})

	win.bind('resize', function () {
		$scope.$apply();
	});
*/

// LOGOUT & CLEANING /////////////////////////////////////////////////////////////////
	$rootScope.logout = function(data) {
/*		$scope.log = '';
		$state.go('login');
		sessionStorage.clear();
		$rootScope.loggedIn = false;
		$scope.search.searchString = "";*/
	};
}])

