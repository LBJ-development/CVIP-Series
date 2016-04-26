'use strict';
angular.module('CVIPSMApp.myCases', [])

.controller('MyCasesCtrl', ["$rootScope", "$scope",  "$state" , "$timeout",  function($rootScope, $scope, $state, $timeout){

	$(".seriesMenuItem").removeClass("caseMenu-sel");
	$("#myCases-men").addClass('caseMenu-sel');

	var ias = new Array();
		$scope.showReferrals = function(){
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

}])

