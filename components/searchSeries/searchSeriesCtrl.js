'use strict';
angular.module('CVIPSMApp.searchSeries', [])

.controller('searchSeriesCtrl',[ "$rootScope",  "$scope", "$window", "$state" , "$timeout", "$location", "CVIPConfig", "DataFtry", "DataTesting",  function($rootScope, $scope, $window, $state, $timeout, $location, CVIPConfig, DataFtry, DataTesting){

	$scope.init = function (){

		$(".seriesMenuItem").removeClass("caseMenu-sel");
		$("#searchSeries-men").addClass('caseMenu-sel');


		initializeDisplayList();

		if(CVIPConfig.displaySearchResult){

			$scope.showResult = true;

			generateGrid(JSON.parse(CVIPConfig.gridData));

			if(sessionStorage.SEARCHPARAMS){

				var savedSearch = JSON.parse(sessionStorage.getItem('SEARCHPARAMS'));

				$scope.fieldsToDisplay =  savedSearch.fieldsToDisplay;

				if(savedSearch.advancedSearch){
					//$scope.basicSearch = true;
					$scope.advancedSearch = true;
					//$scope.basicGrid = false;
					$scope.advancedGrid = true;
					$('.selectSearch-btn').removeClass('selectSearchActive');
					$('#selectAdvancedsearch-btn').addClass('selectSearchActive');
				}
			}
		}
	}

	function initializeDisplayList(){
		$scope.fieldsToDisplay = [];
		$scope.fieldsToDisplay =      
			[	{label : "Series Name",				model : "",       table : "series_new",		tableLabel: "Series",		column: "series",             dataType : "varchar"},
				{label : "Date Series Created",		model : "",       table : "series_new",		tableLabel: "Series",		column: "create_dtm",      	dataType : "datetime"},
				{label : "Series Type",				model : "",       table : "series_new",		tableLabel: "Series",		column: "subjecttype",        dataType : "multiselect"},
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
	//$scope.basicSearch 		= true;
	$scope.advancedSearch 	= false;
	//$scope.createSeries		= false;
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
		}
	}

	var selectedTable, selectedColumn, index, selectedCriteria;

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
			selectedCriteria = this.dataSource.at(index);

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
		});
	} 

	$scope.selDeselAdvanced = function(evt){

		$scope.advancedSearch 	=! $scope.advancedSearch;
		// ADVANCED SEARCH /////////////////////
		if($scope.advancedSearch){
			$('#selectAdvancedsearch-btn').addClass('selectSearchActive');
			$scope.basicSearch = true;
			$scope.basicGrid = false;
			$scope.advancedGrid = true;
		// BASIC SEARCH /////////////////////
		} else {
			$('#selectAdvancedsearch-btn').removeClass('selectSearchActive');
			$scope.basicSearch = true;
			$scope.basicGrid = true;
			$scope.advancedGrid = false;
			$scope.showColumn = false;
			initializeDisplayList();
		}
	}

	$scope.getSeries = function(){
		$scope.showResult	= true;
		var dataParam  = $scope.fieldsToDisplay.slice();
		var jsonString = JSON.stringify({params: dataParam});
		var url = CVIPConfig.contextPath + "execute";

		DataFtry.sendData(url, jsonString).then(function(result){ 
			$scope.mainGridOptions.dataSource.data = result.data;
		});	
	}

// SAVE & LOAD SEARCHES //////////////////////////////////////////////
	$scope.saveSearch = function(){
		$scope.showResult	= true;

		var dataParam  = $scope.fieldsToDisplay.slice();
		var allParams	 = {name:$scope.searchName, description:$scope.searchDescription, params: dataParam};
		console.log("FULL JSON = " + JSON.stringify(allParams));	
		var url = CVIPConfig.contextPath + "savesearch";
		DataFtry.sendData(url,JSON.stringify(allParams)).then(function(result){
			//console.log(result)
			$scope.searchName = "";
			$scope.searchDescription = "";
		}); 
		
		$scope.showResult=false;
   }

	$scope.loadSearchList = function(){
		//console.log("Loading search list");
		var url = CVIPConfig.contextPath + "loadsearch";
		DataFtry.getData(url).then(function(response){ 
		   $scope.searches = response;
		   console.log(response);
		});
	 }

	 $scope.loadSavedSearch = function(evt){
		var index = $(evt.currentTarget).parent().index();
		$scope.fieldsToDisplay = [];
		$scope.fieldsToDisplay = JSON.parse($scope.searches[index].querystring);
		$(".btn-closeModal").click();
		//console.log($scope.fieldsToDisplay);
	 }

// ADD/REMOVE FIELD OBJECTS ///////////////////////////////////////////////
	$scope.addToList = function(list) {
		list.push({
			label : 		selectedCriteria.label,	 
			table : 		selectedCriteria.table, 
			column: 		selectedCriteria.column,	
			dataType : 		selectedCriteria.type,
			tableLabel : 	$scope.fieldData.tableLabel, 
			model : 		""
		});
		// RESET THE DROPDOWN LIST /////////////////////
		$("#DD-column").data("kendoDropDownList").value(-1);
		// REMOVE THE SELECTED ITEM FROM THE DROPDOWN LIST /////////////////////
		var ddl =  $("#DD-column").data("kendoDropDownList");
		var oldData = ddl.dataSource.data();
		ddl.dataSource.remove(oldData[index]);
		// TO REMOVE THE ADD BTN /////////////////////
		$scope.fieldData.column = "";
	};

	$scope.removeFromList = function(list, index) {
		list.splice(index, 1);
	};
	
	// MAKE THE CHECK BOX PERSISTING ///////////////////////////////////////
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
		//console.log(items);
		
		items.forEach(function(item){
			item.selected = ev.target.checked;
			$scope.selectItem(item);
		});
		ev.currentTarget.checked ? $scope.caseNum = items.length : $scope.caseNum = 0; 
	};

	// LOAD THE SELECTED SERIES  //////////////////////////////////////////////////////
	$scope.loadSeries = function(evt){
		$state.go('seriesInfo');

		//var grid = $("#grid").data("kendoGrid");
		var grid = $("#gridAdvanced").data("kendoGrid");
		var dataItem = grid.dataItem($(evt.currentTarget).closest("tr"));
		var ID = dataItem.series_id;

		// SAVE PARAM BEFORE LEAVING THE PAGE //////////////////////////////
		var SEARCHPARAMS = {
			//"gridOptions"		: kendo.stringify(grid.getOptions()),
			"advancedSearch"	: $scope.advancedSearch,
			"fieldsToDisplay"	: $scope.fieldsToDisplay
		};
		sessionStorage.setItem('SEARCHPARAMS', JSON.stringify(SEARCHPARAMS));

		$timeout(function() {
			$rootScope.$broadcast("loadExistingSeries", {seriesId: ID});
			//$rootScope.$broadcast("loadExistingSeries", {series: series});
		}, 500);
	}


// SEARCH RESULTS  //////////////////////////////////////////////////////
var model;
var columns = [];
var data = [];
var dateFields = [];

$scope.getSeries = function(evt){

	$scope.showResult	= true;
	var dataParam  = $scope.fieldsToDisplay.slice();
	var jsonString = JSON.stringify({params: dataParam});
	var url = CVIPConfig.contextPath + "execute";
	
	DataFtry.sendData(url, jsonString).then(function(result){ 
		data = result.data;
		generateGrid(data);
		// KEEP A COPY OF THE DATA TO PERSIST THE DATAGRID WHEN BROWSING BACK TO SEARCH
		CVIPConfig.gridData =  JSON.stringify(data);
	});	
}
// GENERATE DYNAMIC DATA GRID //////////////////////////////////////////////////////
function generateGrid(gridData) {

	model 	= generateModel(gridData[0]);
	columns = generateColumns(gridData[0]);

	$scope.advancedGridOptions = {

		excel: {
			allPages: true,
			fileName: "NCMEC-Series.xlsx"
		},

		dataSource : {
			data : gridData,
			schema: {
				model: model,
			}
		},
		editable: false,
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
		columns: columns,
	}
}

function generateColumns(gridData){

	var columns = [];

	columns.push({
		field	: "series",
		title	: "Series Name",
		template: "<a href='' ng-click='loadSeries($event)' class='baseLinkText' >#=series#</a>"
	});

	for (var property in gridData) {

		var propType = typeof gridData[property];

		if (propType == "string") {
			var parsedDate = kendo.parseDate(gridData[property]);
			if (parsedDate) {
				//console.log("DATE")
				columns.push({
					field	: property,
					title	: property,
					format	:"{0:MM/dd/yyyy}"
				});
			} else if (property != "series") {
				columns.push({
					field	: property,
					title	: property,
				});
			}
			//console.log(property + " / " + propType  + " / " + parsedDate);
		} else if (propType == "number" && property != "series_id"){
			columns.push({
				field	: property,
				title	: property,
			});
		}
	}
	columns.push({
		width	: "3%",
		filterable: false,
		sortable: false,
		template: "<input type='checkbox' ng-model='dataItem.selected' ng-click='caseSelected($event)' />",
		title: "<input type='checkbox' title='Select all' ng-click='toggleSelectAll($event)' style='text-align:center'/>",
		attributes: {
			style: "text-align: center"
		}
	});
	return columns;
}

function generateModel(gridData) {
	var model = {};
	model.id = "ID";
	var fields = {};
	for (var property in gridData) {
		var propType = typeof gridData[property];

		if (propType == "number") {
			//console.log("NUMBER")
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
				//console.log("DATE")
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

// EXPORT AS EXCEL //////////////////////////////////////////////
$scope.removeSelectedRow = function(evt){

	var grid = $("#gridAdvanced").data("kendoGrid");
	grid.tbody.find("input:checked").closest("tr").each(function(index){
		grid.removeRow($(this))
		});
	}

$scope.exportAsExcel = function(evt){
	var grid = $("#gridAdvanced").data("kendoGrid");
	grid.saveAsExcel();
	}
	
}]);