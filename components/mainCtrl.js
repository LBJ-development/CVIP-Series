'use strict';

app.controller('MainCtrl',[ "$rootScope",  "$scope", "$window", "$state" , "$timeout", "CVIPConfig", "DataFtry",  function($rootScope, $scope, $window, $state, $timeout, CVIPConfig, DataFtry){

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
	$scope.showColumn		= false;

	$scope.searchCriteria = {table: "", column:"", };

	$scope.series = [];

	$scope.fieldsToDisplay = [	{label : "Series Name",			model : "",	table : "series", column: "seriesname",			dataType : "string"},
								{label : "Date Series Created", model : "",	table : "series", column: "dateseriescreated",	dataType : "date"},
								{label : "Series Type", 		model : "", table : "series", column: "seriestype",			dataType : "string"},
								{label : "Previous Series Type", model :"",	table : "series", column: "previousseriestype",	dataType : "string"},
							];

	$scope.addField = function(){

		console.log($scope.searchCriteria)
	}


	$scope.DDTableOptions = {
		dataTextField: "disLabel",
		dataValueField: "dbLabel",
		optionLabel: {
			disLabel : "Select a table",
			dbLabel: ""
		},
		dataSource: DataFtry.fakeTable().data
	}

	var selectedTable, selectedColumn;

	$scope.DDColumnOptions = {
		dataTextField: "disLabel",
		dataValueField: "dbLabel",
		autoBind: false,
		optionLabel: {
			disLabel : "Select a Column",
			dbLabel: ""
		},
		//dataSource: DataFtry.fakeColumn(selectedTable).data
	}

	$scope.selectTable  = function(){

		selectedTable = $scope.searchCriteria.table;
		$scope.showColumn = false;
		// ONLY TO REFRESH THE DATASOURCE!
		$timeout(function(){
			$scope.showColumn = true;
			$scope.DDColumnOptions.dataSource  = DataFtry.fakeColumn(selectedTable).data;
		}, 200);
	} 

	$scope.selectColumn = function(){


	}

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

	$scope.getSeries = function(){

		console.log("FROM GET SERIES");
		//console.log($scope.fieldsToDisplay[0].table + "." +  $scope.fieldsToDisplay[0].column + "." + $scope.fieldsToDisplay[0].model);
		console.log($scope.fieldsToDisplay);
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

