'use strict';
angular.module('CVIPSMApp.myCases', [])

.controller('MyCasesCtrl', ["$rootScope", "$scope",  "$state" , "$timeout","DataFtry", "CVIPConfig" ,  function($rootScope, $scope, $state, $timeout, DataFtry, CVIPConfig){

	$(".seriesMenuItem").removeClass("caseMenu-sel");
	$("#myCases-men").addClass('caseMenu-sel');

	var ias = new Array();
	$scope.init = function(){
		console.log("HERE");
        $scope.isShowReferrals = true;
		var url = CVIPConfig.contextPath + "ia";
		DataFtry.getData(url).then(function(result){ 
			 for (var i = 0; i < result.length; i++) {
        		var row = {};
        		 row["seriesId"]     = result[i][0];
        		 row["analyst"]     = result[i][1];
        		 row["series"]     = result[i][2];
        		 row["ia_report_sent_date"]     = new Date(result[i][3]);
        		 row["leaname"]     = result[i][4];
        		 row["leaagency"]     = result[i][5];
        		 row["status"]     = result[i][6];
       		     ias[i] = row;
        	}	
		});
	}

	$scope.loadSeriesFromIAReferral = function(seriesId){
		$state.go('seriesInfo');
		$timeout(function() {
				$rootScope.$broadcast("loadExistingSeries", {seriesId: seriesId});
    	}, 500);
	}
	
	$scope.iaGridOptions = {
			 
			dataSource: {
				data: ias,
				schema: {
					model: {
						fields: {
							analyst		: { type: "string" 	},
							 series		: { type: "string" 	},
							 ia_report_sent_date: { type: "date"},
							 leaname		: { type: "string" 	},
							 leaagency	: { type: "string" 	},
							 status	    : { type: "string" 	}		
							},
						}
					},
				},
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
			columns		: [{
								field	: "analyst",
								title	: "Analyst",
								width	: "12%",
							},
							{
								field	: "series",
								title	: "Series",
								width	: "12%",
								template: "<a href='' ng-click='loadSeriesFromIAReferral(#=seriesId#)' >#=series#</a>"
							},
							{
								field	: "ia_report_sent_date",
								title	: "IA Report Sent Date",
								format	:"{0:MM/dd/yyyy}" ,
								width	: "12%"
							},
							{
								field	: "leaname",
								title	: "LEA Name",
								width	: "12%",
							},
							{
								field	: "leaagency",
								title	: "LEA Agency",
								width	: "12%"
							}, 
							{
								field	: "status",
								title	: "Status",
								width	: "10%",
								template: "<span class='box' style='background-color:#=status#;padding-top: 0px;padding-left: 0px;padding-right: 0px;padding-bottom: 0px;'></span>"
							},
							{
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

				// EXPORT AS EXCEL //////////////////////////////////////////////
$scope.removeSelectedRow = function(evt){

	var grid = $("#iagrid").data("kendoGrid");
	grid.tbody.find("input:checked").closest("tr").each(function(index){
		grid.removeRow($(this))
		});
	}

$scope.exportAsExcel = function(evt){
	var grid = $("#iagrid").data("kendoGrid");
	grid.saveAsExcel();
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
	
	

}])

