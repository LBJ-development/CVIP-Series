'use strict';
angular.module('CVIPSMApp.createSearch', [])

.controller('createSearchCtrl',[ "$rootScope",  "$scope", "$window", "$state" , "$timeout", "$location", "CVIPConfig", "DataFtry", "DataTesting",  function($rootScope, $scope, $window, $state, $timeout, $location, CVIPConfig, DataFtry, DataTesting){

	$scope.init = function (){
		initializeDisplayList();
//console.log(CVIPConfig.displaySearchResult);

		if(CVIPConfig.displaySearchResult){

		 	$scope.showResult = true;

		 	generateGrid(CVIPConfig.gridData);

		 	if(sessionStorage.SEARCHPARAMS){

				var savedSearch = JSON.parse(sessionStorage.getItem('SEARCHPARAMS'));

				$scope.fieldsToDisplay =  savedSearch.fieldsToDisplay;

				if(savedSearch.advancedSearch){
					$scope.basicSearch = true;
					$scope.advancedSearch = true;
					$scope.basicGrid = false;
					$scope.advancedGrid = true;
					$('.selectSearch-btn').removeClass('selectSearchActive');
					$('#selectAdvancedsearch-btn').addClass('selectSearchActive');
				}

				console.log(savedSearch)
				//var grid = $("#advancedGrid").data("kendoGrid");

				//grid.setOptions(JSON.parse(savedSearch.gridOptions));
				// 	$scope.startingDate = new Date(savedOptions.startingDate);
				// $scope.endingDate = new Date(savedOptions.endingDate);
				// $("#radioBtn-RDR").prop("checked", savedOptions.radioBtnRDR);
				// $("#radioBtn-UAC").prop("checked", savedOptions.radioBtnUAC);
				// $scope.submitDisabled = savedOptions.submitDisabled;
				// $scope.datePickerDisabled = savedOptions.datePickerDisabled;
				// $scope.warning = savedOptions.warningMessage;
				// $scope.warningClass = savedOptions.warningClass;
				//$scope.$digest();
			}
		}
	}


	function initializeDisplayList(){
		$scope.fieldsToDisplay = [];
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
			//console.log(this.dataItem());
			//console.log(this.dataSource.at(index));
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

		//var grid = $("#grid").data("kendoGrid");
		var grid = $("#gridAdvanced").data("kendoGrid");
		var dataItem = grid.dataItem($(evt.currentTarget).closest("tr"));
		var ID = dataItem.series_id;

		// SAVE PARAM BEFORE LEAVING THE PAGE
		var SEARCHPARAMS = {
			//"gridOptions"		: kendo.stringify(grid.getOptions()),
			"advancedSearch"	: $scope.advancedSearch,
			"fieldsToDisplay"	: $scope.fieldsToDisplay
			// "radioBtnRDR"	: $("#radioBtn-RDR").is(":checked"),
			// "radioBtnUAC"	: $("#radioBtn-UAC").is(":checked"),
			// "submitDisabled"	: $scope.submitDisabled,
			// "datePickerDisabled"	: $scope.datePickerDisabled,
			// "warningMessage"	: $scope.warning,
			// "warningClass"	: $scope.warningClass,
			// "searchResult"	: $scope.searchResult
		};
		sessionStorage.setItem('SEARCHPARAMS', JSON.stringify(SEARCHPARAMS));

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
		CVIPConfig.gridData = data;
	});	
}


	

function generateGrid(gridData) {

	model 	= generateModel(gridData[0]);
	columns = generateColumns(gridData[0]);
	//console.log(columns)
/*	var parseFunction;
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
	}*/
	$scope.advancedGridOptions = {
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
}]);