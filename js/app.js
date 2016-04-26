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
	'kendo.directives',
	'CVIPSMApp.createSeries',
	'CVIPSMApp.searchSeries',
	'CVIPSMApp.seriesInfo',
	'CVIPSMApp.generalInfo',
	'CVIPSMApp.sectionsInfo',
	'CVIPSMApp.myCases',
	'CVIPSMApp.reports',

	// FOR TESTING ONLY///////////////
	'CVIPSMApp.test'

	])
	.config(function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/myCases');
		// Now set up the states
		$stateProvider
			.state('search', {
				url: "/search",
				templateUrl: 'components/searchSeries/searchSeries.html',
				data: {
					//requireLogin: true
					}
				}
			)

			.state('seriesInfo', {
				url: "/seriesInfo",
				templateUrl: 'components/seriesInfo/seriesInfo.html',
				data: {
					//requireLogin: true
					}
				}
			)

			.state('seriesInfo.general', {
				url: "/general",
				templateUrl: 'components/seriesInfo/general-tmp.html',
				data: {
					//requireLogin: true
					}
				}
			)
			.state('seriesInfo.summary', {
				url: "/summary",
				templateUrl: 'components/seriesInfo/summary-tmp.html',
				data: {
					//requireLogin: true
					}
				}
			)
			.state('seriesInfo.suspect', {
				url: "/suspect",
				templateUrl: 'components/seriesInfo/suspect-tmp.html',
				data: {
					//requireLogin: true
					}
				}
			)
			.state('seriesInfo.children', {
				url: "/children",
				templateUrl: 'components/seriesInfo/children-tmp.html',
				data: {
					//requireLogin: true
					}
				}
			)
			.state('seriesInfo.checklist', {
				url: "/checklist",
				templateUrl: 'components/seriesInfo/checklist-tmp.html',
				data: {
					//requireLogin: true
					}
				}
			)
			.state('test', {
				url: "/test",
				templateUrl: 'components/testPage.html',
				data: {
					//requireLogin: true
					}
				}
			)

			.state('createSeries', {
				url: '/createSeries',
				templateUrl: 'components/createSeries/createSeries-tmp.html',
				data: {
					requireLogin: true
					}
				}
			)

			.state('myCases', {
				url: '/myCases',
				templateUrl: 'components/mycases/myCases-tmp.html',
				data: {
					requireLogin: true
					}
				}
			)

			.state('reports', {
				url: '/reports',
				templateUrl: 'components/reports/reports-tmp.html',
				data: {
					requireLogin: true
					}
				}
			)
			/*.state('searchResult', {
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