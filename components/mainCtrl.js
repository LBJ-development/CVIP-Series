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
	$scope.init = function (){
		 initializeDisplayList();
	}

	function initializeDisplayList(){
		$scope.fieldsToDisplay = [];
		$scope.fieldsToDisplay = 	
				[	{label : "Series Name",		model : "",	table : "series", column: "seriesname",		dataType : "string"},
					{label : "Date Series Created", 	model : "",	table : "series", column: "dateseriescreated",	dataType : "date"},
					{label : "Series Type", 		model : "", 	table : "series", column: "seriestype",		dataType : "dropdown"},
					{label : "Previous Series Type",	model :"",	table : "series", column: "previousseriestype",	dataType : "string"},
				];
		
		$scope.fieldData = {disLabel: "", table: "", column:"", dataType:"" };
		// IF THE DROPDOWN DATA IS EXISTING => RESET
		if($("#DD-table").data("kendoDropDownList") !== undefined) $("#DD-table").data("kendoDropDownList").value(-1);
		if($("#DD-column").data("kendoDropDownList") !== undefined) $("#DD-column").data("kendoDropDownList").value(-1);
	}

	// SERIES NAME AUTO COMPLETE ///////////////////////
	$scope.selectedSeriesName;
	$scope.seriesName;
	var url = CVIPConfig.contextPath + "names";
/*	DataFtry.getData(url).then(function(result){ 
		$scope.seriesName  =  result ;
	});*/


	$scope.basicSearch 		= true;
	$scope.advancedSearch 	= false;
	$scope.createSeries		= false;
	$scope.showGrid		= false;
	$scope.showColumn		= false;

	$scope.fieldData = {disLabel: "", table: "", column:"", dataType:"" };

	$scope.series = [];

	$scope.DDTableOptions = {
		dataTextField: "disLabel",
		dataValueField: "dbLabel",
		optionLabel: {
			disLabel : "Select a Section",
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
			disLabel : "Select a Criteria",
			dbLabel: ""
		},
		 select: function(e) {

			var index = e.item.index() -1;
			$scope.fieldData.dataType = DataFtry.fakeColumn(selectedTable).data[index].dataType;
			$scope.fieldData.disLabel = DataFtry.fakeColumn(selectedTable).data[index].disLabel;
		 }
	}


	$scope.selectTable  = function(){

		// RESET THE COLUMN /////////
		$scope.fieldData.disLabel = "";
		$scope.fieldData.column = "";

		selectedTable = $scope.fieldData.table;

		$scope.showColumn = false;
		// ONLY TO REFRESH THE DATASOURCE!
		$timeout(function(){
			$scope.showColumn = true;
			$scope.DDColumnOptions.dataSource  = DataFtry.fakeColumn(selectedTable).data;
		}, 200);
	} 

	$scope.selectSearch = function(evt){
		$('.selectSearch-btn').removeClass('selectSearchActive');
		$(evt.currentTarget).parent().addClass('selectSearchActive');

		$scope.basicSearch = $scope.advancedSearch = $scope.createSeries =  false;
		switch($(evt.currentTarget).attr('id') ){
			case "1":
				$scope.basicSearch = true;
				$scope.advancedSearch = false;
				$scope.showColumn = false;
				initializeDisplayList();
				break;
			case "2":
				$scope.basicSearch = true;
				$scope.advancedSearch = true;
				break;
			case "3":
				$scope.createSeries = true;
				$scope.advancedSearch = false;
				$scope.showColumn = false;
				 initializeDisplayList();
				break;
			default:
				$scope.basicSearch = true
		}
	} 

	$scope.getSeries = function(){

		var dataParam  = $scope.fieldsToDisplay.slice();
		var jsonString = JSON.stringify({params: dataParam});
				console.log("JSON = " + jsonString);	
	}

// ADD/REMOVE PERSON OBJECTS ///////////////////////////////////////////////

	$scope.addToList = function(list) {
		list.push({
			label : $scope.fieldData.disLabel,	 
			model :"",	
			table : $scope.fieldData.table, 
			column: $scope.fieldData.column,	
			dataType : $scope.fieldData.dataType
		});
		$("#DD-column").data("kendoDropDownList").value(-1);
	};

	$scope.removeFromList = function(list, index) {
		list.splice(index, 1);
	} ;

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

