'use strict';
angular.module('CVIPSMApp.test', [])

.controller('TestPageCtrl',[ "$rootScope",  "$scope", "$window", "$state" , "$timeout", "CVIPConfig", "DataFtry", "DataTesting",  function($rootScope, $scope, $window, $state, $timeout, CVIPConfig, DataFtry, DataTesting){


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

		 //console.log(DataTesting.getData(100));
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
	$scope.showGrid			= true;
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
		height: 500,
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



  $scope.mainGridOptions = {
              



               dataSource: {
			data: DataTesting.getData(100),
				schema: {
					model: {
						fields: {
								seriesName		: { type: "string" 	},
								dateSeriesCreated: { type: "date" 	},
								seriesType		: { type: "string" 	},
								previousType	: { type: "string" 	},
								description	: { type: "string" 	}
								
								},
							}
						},
					},
		//height		: 550,
	 	//dataBound	: onDataBound,
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
  		//detailTemplate: kendo.template($("#detail-template-Description").html()),
  		//detailTemplate: "<div>Test</div>",
  		 detailTemplate: kendo.template($("#template").html()), 
		//detailInit: detailInit,
		columns		: [{
						field	: "seriesName",
						title	: "Series Name",
						width	: "10%",
						template: "<a href='' ng-click='selectSeries($event)' class='baseLinkText' >#=seriesName#</a>"
						},{
						field	: "dateSeriesCreated",
						title	: "Date Series Created",
						format	:"{0:MM/dd/yyyy}" ,
						width	: "10%"
						},{
						field	: "seriesType",
						title	: "Series Type",
						width	: "10%"
						},{
						field	: "previousType",
						title	: "Previous Type",
						width	: "10%"
						}, {
						field	: "description",
						title	: "Description",
						width	: "47%",
						},{
						width	: "3%",
						filterable: false,
						sortable: false,
						template: "<input type='checkbox' ng-model='dataItem.selected' ng-click='caseSelected($event)' />",
						title: "<input type='checkbox' title='Select all' ng-click='toggleSelectAll($event)'/>",
						attributes: {
							style: "text-align: center"
							}
						}

					]
            };

            function detailInit(e) {

		var detailRow = e.detailRow;
			kendo.bind(detailRow, e.data);
		// console.log(grid.tbody.find("tr.k-master-row").first());
		// console.log(e.data.caseManager);
/*
		var caseNumber = e.data.caseNumber;
		var caseManager = e.data.caseManager;
		$scope.caseManager = e.data.caseManager;

		$scope.urlDetail = "/rest/caseadmin/incidentDetails?caseNumber=" + caseNumber;
		DataFtry.getData($scope.urlDetail).then(function(result){

			getNarrative(e, caseNumber, caseManager);

			detailRow.find("#gridDetail-MCD").kendoGrid({

				dataSource:{
						data: result.data.content,
							},
				scrollable: false,
				sortable: false,
				pageable: false,
				columns: [
					{ field: "incidentType", title: "Child Case Type", width: "20%" },
					{ field: "childRecoveryStatus", title: "Recovery Status", width: "20%" },
					{ field: "childName", title:"Child Name", width: "20%" },
					{ field: "childAge", title:"Incid. Age", width: "10%" },
					{ field: "childMediaStatus", title: "Child Media Status", width: "20%" },
					{ field: "childID", title: "Child ID", width: "10%" }
					]
				});
			});*/
		}

		// LOGOUT & CLEANING /////////////////////////////////////////////////////////////////
	$rootScope.logout = function(data) {
/*		$scope.log = '';
		$state.go('login');
		sessionStorage.clear();
		$rootScope.loggedIn = false;
		$scope.search.searchString = "";*/
	};




}]);