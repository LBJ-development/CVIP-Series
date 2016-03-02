'use strict';

var app = angular.module('CVIPSMApp', [
	'ngAnimate',
	'ngRoute',
	'ui.router',
	'ui.bootstrap',
	'CVIPSMApp.services',
	'CVIPSMApp.utilities',
	'CVIPSMApp.formatting',
	'CVIPSMApp.config',
	'CVIPSMApp.filters',
	'CVIPSMApp.createsearch',
	'kendo.directives' 

	])
	.config(function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/search');
		// Now set up the states
		$stateProvider
			.state('search', {
				url: "/search",
				templateUrl: 'components/search.html',
				data: {
					//requireLogin: true
					}
				}
			)
		/*.state('mainSearch', {
				url: '/mainSearch',
				templateUrl: 'components/mainSearch.html',
				data: {
					requireLogin: true
					}
				}
			)
			.state('searchResult', {
				url: '/searchResult',
				templateUrl: 'components/searchResult.html',
				data: {
					requireLogin: true
					}
				}
			)*/
		})

	/*.run(function ($rootScope, $state) {
		
		// MAY NEED LATER WHEN WE'LL CHECK FOR LOGIN CREDENTIAL BEFORE CHAGING STATE

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
			var requireLogin = toState.data.requireLogin;

			if(requireLogin && typeof sessionStorage.userName === 'undefined') {

				event.preventDefault();
				$state.go('login');
		}
	});
});*/

 
