'use strict';
angular.module('CVIPSMApp.createSearch', [])

.controller('createSearchCtrl',[ "$rootScope",  "$scope", "$window", "$state" , "$timeout", "CVIPConfig", "DataFtry", "DataTesting",  function($rootScope, $scope, $window, $state, $timeout, CVIPConfig, DataFtry, DataTesting){

	$scope.init = function (){
		 initializeDisplayList();
		 //console.log(DataTesting.getData(100));
	}

	function initializeDisplayList(){
		$scope.fieldsToDisplay = [];
		/*$scope.fieldsToDisplay = 	
				[	{label : "Series Name",				model : "",		table : "series", tableLabel: "Series",		column: "series",			dataType : "varchar"},
					{label : "Date Series Created", 	model : "",		table : "series", tableLabel: "Series",		column: "create_dtm",	dataType : "datetime"},
					{label : "Series Type", 			model : "", 	table : "series", tableLabel: "Series",		column: "subjecttype",		dataType : "dropdown"},
					{label : "Previous Series Name",	model :"",		table : "series_history", tableLabel: "Series",		column: "previous_series",	dataType : "varchar"},
				];*/

		$scope.fieldsToDisplay =      
			[	{label : "Series Name",				model : "",       table : "series_new",		tableLabel: "Series",		column: "series",             dataType : "varchar"},
				{label : "Date Series Created",		model : "",       table : "series_new",		tableLabel: "Series",		column: "create_dtm",      	dataType : "datetime"},
				{label : "Series Type",				model : "",       table : "series_new",		tableLabel: "Series",		column: "subjecttype",        dataType : "dropdown"},
				{label : "Previous Series Name",	model : "",       table : "series_history",	tableLabel: "Series",		column: "previous_series",      dataType : "varchar"},
			];

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
	// VARIABLES //////////////////////////////////////////
	$scope.basicSearch 		= true;
	$scope.advancedSearch 	= false;
	$scope.createSeries		= false;
	$scope.showResult		= false;
	$scope.showColumn		= false;
	$scope.basicGrid 		= true;
	$scope.advancedGrid 	= false;
	$scope.fieldData =	{label : "",model : "", table : "", tableLabel: "", column: "", dataType : ""},
	$scope.series = [];
	var currentColumn = {};

	$scope.DDTableOptions = {
		dataTextField: "disLabel",
		dataValueField: "dbLabel",
		optionLabel: {
			disLabel : "Select a Section",
			dbLabel: ""
		},
		//dataSource: DataFtry.fakeTable().data,
		dataSource: {
			transport: {
					read: {
						dataType: "json",
						url: CVIPConfig.contextPath + "tables",
				}
			}
		},
		select: function(e){

			$scope.fieldData.tableLabel = e.item.text();
			//console.log($scope.fieldData.tableLable)
		}
	}

	var selectedTable, selectedColumn, index;

	$scope.DDColumnOptions = {
		dataTextField: "disLabel",
		dataValueField: "column",
		autoBind: false,
		height: 500,
		optionLabel: {
			disLabel : "Select a Criteria",
			dbLabel: ""
		},
		 select: function(e) {

			index = e.item.index() -1;
			//;

			$scope.fieldData.disLabel = e.item.text();
			$scope.fieldData.dataType = currentColumn[index].type;

			//console.log($scope.fieldData.dataType);

			//$scope.fieldData.dataType = DataFtry.fakeColumn(selectedTable).data[index].dataType;
			//$scope.fieldData.disLabel = DataFtry.fakeColumn(selectedTable).data[index].disLabel;
		 }
	}

	$scope.selectTable  = function(){

		// RESET THE COLUMN /////////
		$scope.fieldData.disLabel = "";
		$scope.fieldData.column = "";

		$scope.showColumn = false;

		var url = CVIPConfig.contextPath + "columns/" +  $scope.fieldData.table;

		DataFtry.getData(url).then(function(result){ 
			currentColumn =  result;
			$scope.DDColumnOptions.dataSource = currentColumn;
			$scope.showColumn = true;

			console.log("SELECT A TABLE")
			console.log($scope.DDColumnOptions.dataSource)
		
			//console.log(result)
		});
		
		// ONLY TO REFRESH THE DATASOURCE!
		//$timeout(function(){
			//$scope.showColumn = true;

			//$scope.DDColumnOptions.dataSource  = DataFtry.fakeColumn(selectedTable).data;
			//$scope.DDColumnOptions.dataSource = currentColumn;
			/*$scope.DDColumnOptions.dataSource = {
				transport: {
					read: {
						dataType: "json",
						url: CVIPConfig.contextPath + "columns/" + selectedTable,
					}
				}
			}*/
		//}, 200);
	} 

	$scope.selectSearch = function(evt){
		$scope.showResult	= false;
		$('.selectSearch-btn').removeClass('selectSearchActive');
		$(evt.currentTarget).parent().addClass('selectSearchActive');

		$scope.basicSearch = $scope.advancedSearch = $scope.createSeries =  false;
		switch($(evt.currentTarget).attr('id') ){
			case "1":
				$scope.basicSearch = true;
				$scope.basicGrid = true;
				$scope.advancedGrid = false;
				$scope.advancedSearch = false;
				$scope.showColumn = false;
				initializeDisplayList();
				break;
			case "2":
				$scope.basicSearch = true;
				$scope.advancedSearch = true;
				$scope.basicGrid = false;
				$scope.advancedGrid = true;
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
		var url = CVIPConfig.contextPath + "execute";

		console.log(jsonString)

		DataFtry.sendData(url, jsonString).then(function(result){ 
			$scope.mainGridOptions.dataSource.data = result.data;
			//console.log(result.data)
		});	
	}

// ADD/REMOVE FIELD OBJECTS ///////////////////////////////////////////////
	$scope.addToList = function(list) {
		list.push({
			label : 		$scope.fieldData.disLabel,	 
			model : 		"",	
			table : 		$scope.fieldData.table, 
			tableLabel : 	$scope.fieldData.tableLabel, 
			column: 		$scope.fieldData.column,	
			dataType : 		$scope.fieldData.dataType
		});
		// RESET THE DROPDOWN LIST /////////////////////
		$("#DD-column").data("kendoDropDownList").value(-1);
		// REMOVE THE SELECTED ITEM FROM THE DROPDOWN LIST /////////////////////
		//var ddl =  $("#DD-column").data("kendoDropDownList");
		//var oldData = ddl.dataSource.data();
		//ddl.dataSource.remove(oldData[index]);
		// TO REMOVE THE ADD BTN /////////////////////
		$scope.fieldData.column = "";
	};

	$scope.removeFromList = function(list, index) {
		list.splice(index, 1);
	};

	$scope.mainGridOptions = {
			  
		dataSource: {
			//data: DataTesting.getData(100),
			schema: {
				model: {
					fields: {
						series			: { type: "string" 	},
						create_dtm		: { type: "date" 	},
						subjecttype		: { type: "string" 	},
						previous_series	: { type: "string" 	}
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
		//detailTemplate: kendo.template($("#template").html()), 
		//detailInit: detailInit,
		columns		: [{
						field	: "series",
						title	: "Series Name",
						width	: "24%",
						filterable	: false,

						template: "<a href='' ng-click='loadSeries($event)' class='baseLinkText' >#=series#</a>"
						},{
						field	: "create_dtm",
						title	: "Date Series Created",
						format	:"{0:MM/dd/yyyy}" ,
						width	: "25%"
						},{
						field	: "subjecttype",
						title	: "Series Type",
						width	: "25%",
						filterable: {
							ui			: seriesType,
							operators	: {
								string	: {
								eq		: "Equal to"
									}
								}
							}
						},{
						field	: "previous_series",
						title	: "Previous Name",
						width	: "24%",
						filterable: {
							operators	: {
								string	: {
								contains	: "Contains",
									}
								}
							}
						},/* {
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
						},*/{
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

	$scope.loadSeries = function(evt){
		$state.go('seriesInfo');

		var grid = $("#grid").data("kendoGrid");
		var dataItem = grid.dataItem($(evt.currentTarget).closest("tr"));
		var ID = dataItem.series_id;

		//console.log(seriesID);
		//console.log(evt.currentTarget.text)

		$timeout(function() {
			$rootScope.$broadcast("loadExistingSeries", {seriesId: ID});
			//$rootScope.$broadcast("loadExistingSeries", {series: series});
		}, 500);
	}

	/*function detailInit(e) {

		var detailRow = e.detailRow;
			kendo.bind(detailRow, e.data);
		}*/

// DATAGRID FILTERS //////////////////////////////////////
var seriesT	= ["Awaiting Case Info", "Identified", "NCMEC at Risk", "Unconfirmed", "Unfounded", "Unidentified", "Null"]

	function seriesType(element) {
		element.kendoDropDownList({
			dataSource: seriesT,
			optionLabel: "--Select Value--"
		});
	}

	//example data received from remote source via jQuery ajax merthod
var data = [{
  "Name": "daya",
  "Role": "Developer",
  "Dept": "Dev",
  "Date": "\/Date(836438400000)\/",
  "Balance": 23
}, {
  "Name": "siva",
  "Role": "Developer",
  "Dept": "Dev",
  "Date": "\/Date(836438400000)\/",
  "Balance": 23
}, {
  "Name": "sivadaya",
  "Role": "Developer",
  "Dept": "Dev",
  "Date": "\/Date(836438400000)\/",
  "Balance": 23
}, {
  "Name": "dayasiva",
  "Role": "Developer",
  "Dept": "Dev",
  "Date": "\/Date(836438400000)\/",
  "Balance": 23
}];

//in the success handler of the ajax method call the function below with the received data:
var dateFields = [];
generateGrid(data)

$scope.testFunction = function(evt){

	$scope.showResult = true;

	}



function generateGrid(gridData) {

	console.log("FROM GENERATE GRID")


  var model = generateModel(gridData[0]);

  var parseFunction;
  if (dateFields.length > 0) {
	parseFunction = function (response) {
	  for (var i = 0; i < response.length; i++) {
		for (var fieldIndex = 0; fieldIndex < dateFields.length; fieldIndex++) {
		  var record = response[i];
		  record[dateFields[fieldIndex]] = kendo.parseDate(record[dateFields[fieldIndex]]);
		}
	  }
	  return response;
	};
  }

  var grid = $("#gridAdvanced").kendoGrid({
	dataSource: {
	  data: gridData,
	  schema: {
		model: model,
		parse: parseFunction
	  }
	},
	editable: true,
	sortable: true
  });
}

function generateModel(gridData) {
	console.log("FROM GENERATE MODEL")
  var model = {};
  model.id = "ID";
  var fields = {};
  for (var property in gridData) {
	var propType = typeof gridData[property];

	if (propType == "number") {
	  fields[property] = {
		type: "number",
		validation: {
		  required: true
		}
	  };
	} else if (propType == "boolean") {
	  fields[property] = {
		type: "boolean",
		validation: {
		  required: true
		}
	  };
	} else if (propType == "string") {
	  var parsedDate = kendo.parseDate(gridData[property]);
	  if (parsedDate) {
		fields[property] = {
		  type: "date",
		  validation: {
			required: true
		  }
		};
		dateFields.push(property);
	  } else {
		fields[property] = {
		  validation: {
			required: true
		  }
		};
	  }
	} else {
	  fields[property] = {
		validation: {
		  required: true
		}
	  };
	}

  }
  model.fields = fields;

  return model;
}








}]);