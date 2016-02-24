'use strict';

app.controller('MainCtrl',[ "$rootScope",  "$scope", "$window", "$state" ,  "CVIPConfig", "DataFtry" ,   function($rootScope, $scope, $window, $state, CVIPConfig, DataFtry ){

/*	var win = angular.element($window);
	$scope.stateName;

	$rootScope.$on('$stateChangeStart',  function(event, toState, toParams, fromState, fromParams){ 
		$scope.stateName = toState.name;
	})

	win.bind('resize', function () {
		$scope.$apply();
	});
*/
	
	$scope.selectedSeriesName;
	$scope.seriesName;
	var url = CVIPConfig.contextPath + "names";
	/*DataFtry.getData(url).then(function(result){ 
		$scope.seriesName  =  result ;
	});*/

	$scope.basicSearch 		= true;
	$scope.advancedSearch 	= false;
	$scope.createSeries		= false;
	$scope.showGrid		= false;

	$scope.selectSearch = function(evt){
		$('.selectSearch-btn').removeClass('selectSearchActive');
		$(evt.currentTarget).parent().addClass('selectSearchActive');

		console.log($(evt.currentTarget).attr('id'))

		$scope.basicSearch = $scope.advancedSearch = $scope.createSeries =  false;
		switch($(evt.currentTarget).attr('id') ){
			case "1":
				$scope.basicSearch = true
				break;
			case "2":
				$scope.basicSearch = true
				$scope.advancedSearch = true
				break;
			case "3":
				$scope.createSeries = true
				break;
			default:
				$scope.basicSearch = true
		}
	} 

// GRID SETTINGS 
	$scope.mainGridOptions =  {
	
		dataSource: {
			//data: result,
			    schema: {
					model: {
						fields: {
								name		: { type: "string" 	},
								id		: { type: "string" 	},
								date		: { type: "string" 	},
								description	: { type: "string" 	}
								
								},
							}
						},
					},
		//height		: 550,
     //   dataBound	: onDataBound,
		//toolbar		: ["create"],
		sortable	: true,
		scrollable	: false,

		pageable	: {
                     		refresh: true,
                      		pageSizes: true,
                     		buttonCount: 5,
			pageSize: 15
			},
							
		// columnMenu: {
  //  			messages	: {
  //     			columns			: "Choose columns",
  //     			filter			: "Apply filter",
  //     			sortAscending	: "Sort (asc)",
  //     			sortDescending	: "Sort (desc)"
		// 					}
  //   				},
		columns		: [{
						field	: "name",
						title	: "Series Name",
						width	: "15%"
						},{
						field	: "id",
						title	: "Series ID",
						width	: "5%"
						},{
						field	: "date",
						title	: "Date",
						width	: "10%"
						},{
						field	: "description",
						title	: "Description",
						width	: "70%"
						}
					]
                	
                	
                }

// LOGOUT & CLEANING /////////////////////////////////////////////////////////////////
	$rootScope.logout = function(data) {
/*		$scope.log = '';
		$state.go('login');
		sessionStorage.clear();
		$rootScope.loggedIn = false;
		$scope.search.searchString = "";*/
	};
}])

