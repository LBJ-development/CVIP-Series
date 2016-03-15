'use strict';
angular.module('CVIPSMApp.createSearch', [])

.controller('createSearchCtrl',[ "$rootScope",  "$scope", "$window", "$state" , "$timeout", "CVIPConfig", "DataFtry", "DataTesting",  function($rootScope, $scope, $window, $state, $timeout, CVIPConfig, DataFtry, DataTesting){

	$scope.init = function (){
		 initializeDisplayList();
		 //console.log(DataTesting.getData(100));
	}

	function initializeDisplayList(){
		$scope.fieldsToDisplay = [];
		$scope.fieldsToDisplay = 	
				[	{label : "Series Name",		model : "",	table : "series", column: "seriesname",		dataType : "string"},
					{label : "Date Series Created", 	model : "",	table : "series", column: "dateseriescreated",	dataType : "date"},
					{label : "Series Type", 		model : "", 	table : "series", column: "subjecttype",		dataType : "dropdown"},
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
	DataFtry.getData(url).then(function(result){ 
		$scope.seriesName  =  result ;
	});


	$scope.basicSearch 		= true;
	$scope.advancedSearch 	= false;
	$scope.createSeries		= false;
	$scope.showResult		= false;
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
		$scope.showResult	= false;
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
		$scope.showResult	= true;
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
		filterable	: {
					mode		: "menu",
					extra		: false,
					messages	: {
					info		: "Filter by:",
						selectValue	: "Select category",
						isTrue		: "selected",
						isFalse		: "not selected"
							},
					operators	: {
							string	: {
								eq			: "Equal to",
								//neq		: "Not equal to",
								contains	: "Contains",
								startswith	: "Starts with",
								endswith	: "Ends with"
								},
							number	: {
								eq			: "Equal to",
								},
							date	: {
								gt			: "After",
								lt			: "Before"
								}
							}
						},

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
		detailInit: detailInit,
		columns		: [{
						field	: "seriesName",
						title	: "Series Name",
						width	: "12%",
						filterable	: false,
						template: "<a href='' ng-click='selectSeries($event)' class='baseLinkText' >#=seriesName#</a>"
						},{
						field	: "dateSeriesCreated",
						title	: "Date Series Created",
						format	:"{0:MM/dd/yyyy}" ,
						width	: "12%"
						},{
						field	: "seriesType",
						title	: "Series Type",
						width	: "12%",
						filterable: {
							ui			: seriesType,
							operators	: {
								string	: {
								eq		: "Equal to"
									}
								}
							}
						},{
						field	: "previousType",
						title	: "Previous Type",
						filterable	: false,
						width	: "12%"
						}, {
						field	: "description",
						title	: "Description",
						width	: "47%",
						filterable: {
							operators	: {
								string	: {
								contains	: "Contains",
									}
								}
							}
						},{
						width	: "3%",
						filterable: false,
						sortable: false,
						template: "<input type='checkbox' ng-model='dataItem.selected' ng-click='caseSelected($event)' />",
						title: "<input type='checkbox' title='Select all' ng-click='toggleSelectAll($event)' style='text-align:center'/>",
						attributes: {
							style: "text-align: center"
							}
						}

					]
			};

	// MAKE THE CHECK BOX PERSISTING
	$scope.checkedIds =[];
	$scope.selectItem = function(item){
		//remove from selection list if unchecked
		if (!item.selected) {
			
			while ($.inArray(item.caseNumber, $scope.checkedIds) >=0) {
				console.log(item.caseNumber + "=" + $.inArray(item.caseNumber, $scope.checkedIds));
				$scope.checkedIds.splice($.inArray(item.caseNumber, $scope.checkedIds),1);
			}
			//console.log($scope.checkedIds.toString());
		} else {
			//do not add if it already exists
			if (!($.inArray(item.caseNumber, $scope.checkedIds) >=0)){
				$scope.checkedIds.push(item.caseNumber);
			}				
		}
	}
	
	$scope.toggleSelectAll = function(ev) {

		var dataSource = $(ev.target).closest("[kendo-grid]").data("kendoGrid").dataSource;
        var filters = dataSource.filter();
        var allData = dataSource.data();
        var query = new kendo.data.Query(allData);
        var items = query.filter(filters).data;
		console.log(items);
		
        items.forEach(function(item){
			item.selected = ev.target.checked;
			$scope.selectItem(item);
        });
		ev.currentTarget.checked ? $scope.caseNum = items.length : $scope.caseNum = 0; 
    };

	$scope.selectSeries = function(evt){

		  $state.go('seriesInfo');

	}

	function detailInit(e) {

		var detailRow = e.detailRow;
			kendo.bind(detailRow, e.data);
		}

// DATAGRID FILTERS //////////////////////////////////////
var seriesT	= ["Awaiting Case Info", "Identified", "NCMEC at Risk", "Unconfirmed", "Unfounded", "Unidentified", "Null"]

	function seriesType(element) {
		element.kendoDropDownList({
			dataSource: seriesT,
			optionLabel: "--Select Value--"
		});
	}

}]);