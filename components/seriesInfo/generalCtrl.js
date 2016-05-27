'use strict';
angular.module('CVIPSMApp.generalInfo', [])

.controller('GeneralCtrl',["$rootScope", "$scope",  "$timeout", "CVIPConfig", "DataFtry", "DataTesting", '$window', "$state","$http",   function($rootScope, $scope, $timeout, CVIPConfig,  DataFtry,  DataTesting, $window, $state, $http){

	$scope.dispActivity = true;
	$scope.dispIdentTime = true;
	$scope.dispDateRecor = true;
	$scope.dispSumStat = true;
	$scope.dispDescription = true;
	$scope.dispChiIdent = true;
	$scope.dispMedia = true;
	$scope.dispImType = true;

 	// CREATE A NEW SERIES /////////////////////////
	$rootScope.$on("createNewSeries", function(event, data){

		// $scope.generalInfo.general.seriesId = data.seriesId;
		// $scope.generalInfo.general.seriesName 		= data.series;
		// $scope.generalInfo.general.subjecttype 		= data.subjecttype;
		// $scope.generalInfo.general.analystName 		= data.analyst;
		// $scope.generalInfo.general.relatedToCTTA 	= data.relatedToCtta;
		$rootScope.editable = true;
	});

	$rootScope.$watch(function($rootScope){ return $rootScope.editable},
		function(){ 
			$rootScope.editable ? $scope.dispActivity 	= $scope.dispActivity 	:  $scope.dispActivity = true;
			$rootScope.editable ? $scope.dispIdentTime 	= $scope.dispIdentTime 	:  $scope.dispIdentTime = true;
			$rootScope.editable ? $scope.dispDateRecor	= $scope.dispDateRecor 	:  $scope.dispDateRecor = true;
			$rootScope.editable ? $scope.dispSumStat 	= $scope.dispSumStat 	:  $scope.dispSumStat = true;
			$rootScope.editable ? $scope.dispDescription= $scope.dispDescription:  $scope.dispDescription = true;
			$rootScope.editable ? $scope.dispChiIdent 	= $scope.dispChiIdent	:  $scope.dispChiIdent = true;
			$rootScope.editable ? $scope.dispMedia 		= $scope.dispMedia 		:  $scope.dispMedia = true;
			$rootScope.editable ? $scope.dispImType 	= $scope.dispImType 	:  $scope.dispImType = true;

		});

	$scope.displayActivity 		= function(){ $scope.dispActivity 		= !$scope.dispActivity; };
	$scope.dispIdentTimeline 	= function(){ $scope.dispIdentTime 		= !$scope.dispIdentTime; };
	$scope.dispDateRecord 		= function(){ $scope.dispDateRecor 		= !$scope.dispDateRecor; };
	$scope.dispSumStati			= function(){ $scope.dispSumStat 		= !$scope.dispSumStat; };
	$scope.dispDescriptions 	= function(){ $scope.dispDescription 	= !$scope.dispDescription; };
	$scope.dispChiIdenti 		= function(){ $scope.dispChiIdent 		= !$scope.dispChiIdent; };
	$scope.dispMedias 			= function(){ $scope.dispMedia 			= !$scope.dispMedia; };
	$scope.dispImTypes			= function(){ $scope.dispImType			= !$scope.dispImType; };
	$scope.dispjustice			= function(){ $scope.dispjust			= !$scope.dispjust; };



	$scope.deleteSeries = function (seriesId) {
    console.log ("deleting series");


     var url=CVIPConfig.contextPath+'hashescount/'+$scope.generalInfo.series.seriesId;  
     var hashes = 0;
     DataFtry.getData(url).then(function(result){
         hashes = result;
         if (hashes>0){
          alert ('Hashes are assigned to this series. It cannot be deleted.');
         }
         else if (window.confirm("Are you sure you want to delete this Series?")){
            var url=CVIPConfig.contextPath+ $scope.generalInfo.series.seriesId;
            DataFtry.deleteDat(url).then(function(result){ 
              //  console.log("DELETE = "+ result);
                      //if (result==true) 
                          $state.go('search');

                          $timeout(function() {
                            $rootScope.$broadcast("seriesDeleted");
                          }, 500);
                      //else
                      //  console.log("PROBLEM DELETING SERIES");

              });
        }

     });
	}


	$scope.saveSeries = function (seriesId) {
		 console.log("updating series");
	     var url=CVIPConfig.contextPath+'entity/'+$scope.generalInfo.series.seriesId;  
     
     	 $scope.generalInfo.series.createDtm = new Date($scope.generalInfo.series.createDtm); 
      	 $scope.generalInfo.series.updateDtm = new Date(); 
	   	 var data =JSON.stringify($scope.generalInfo.series);
	     DataFtry.updateData(url,data).then(function(result){
		  	$scope.msg="This series has been successfully updated.";
		 	$rootScope.editable = false;
		 });
	}


	$scope.saveInfo = function () {

		console.log("updating info");
      var series = $scope.generalInfo.series;
      var msg = '';
      var valid= true;
      if(!(series.series != null && series.series.length>0)){
            msg += 'Please enter the name of this series.';
            valid = false;
      }
      //console.log( $scope.generalInfo.series);
      if (!(series.analyst != null && series.analyst.length>0)){
           msg += '\nPlease select an Analyst in the Analyst box.';
             valid = false;
      }

      if (!(series.relatedToCtta != null && series.relatedToCtta.length>0)){
           msg += '\nRelated to CT/TA is not allowed empty.';
             valid = false;
      }

      if (!valid)
         alert(msg);
      else{
   		 var info=$scope.generalInfo; 
   		 var url=CVIPConfig.contextPath+'info';  
    	    //series
         info.series.createDtm        = new Date(info.series.createDtm);
         info.series.activelyTracking = series.activelyTracking==true?1:0;
         info.series.availableInCris = series.availableInCris==true?1:0;
         info.series.seriesIdentifiedFlag = series.seriesIdentifiedFlag==true?1:0;
         info.series.seriesnameNotChildname = series.seriesnameNotChildname==true?1:0;
         info.series.updateDtm = new Date(info.series.updateDtm);
         //content
         info.series.analPenetration = info.series.analPenetration==true?1:0;
         info.series.bestiality = info.series.bestiality==true?1:0;
         info.series.bondageSm = info.series.bondageSm==true?1:0;
         info.series.defecation = info.series.defecation==true?1:0;
         info.series.druggedSleeping = info.series.druggedSleeping==true?1:0;
         info.series.ejaculationSeen = info.series.ejaculationSeen==true?1:0;
         info.series.eroticaFullyClothed = info.series.eroticaFullyClothed==true?1:0;
         info.series.eroticaPresent = info.series.eroticaPresent==true?1:0;
         info.series.exposureBreastChest = info.series.exposureBreastChest==true?1:0;
         info.series.exposureGenitaliaAnus = info.series.exposureGenitaliaAnus==true?1:0;
         info.series.fullNudity = info.series.fullNudity==true?1:0;
         info.series.kissing = info.series.kissing==true?1:0;
         info.series.licking = info.series.licking==true?1:0;
         info.series.manualStimulation = info.series.manualStimulation==true?1:0;
         info.series.oralCopulation = info.series.oralCopulation==true?1:0;
         info.series.otherSexualContent = info.series.otherSexualContent==true?1:0;
         info.series.urination = info.series.urination==true?1:0;
         info.series.vaginalPenetration = info.series.vaginalPenetration==true?1:0;
         info.series.webCam = info.series.webCam==true?1:0;
         // history
      	 info.history.creationDate = new Date(info.history.creationDate); 
      
      	 info.history.dateConfirmationReceived = new Date(info.history.dateConfirmationReceived); 
      	 info.history.dateEnteredIdentified = new Date(info.history.dateEnteredIdentified); 
      	 info.history.dateFederalTransferred = new Date(info.history.dateFederalTransferred); 
   	    info.history.firstRecordedNcmec = new Date(info.history.firstRecordedNcmec); 
   	    info.history.firstReportDtm = new Date(info.history.firstReportDtm);
   	    info.history.historical = info.history.historical==true?1:0;
          //media
         info.media.blackAndWhite = info.media.blackAndWhite==true?1:0;
         info.media.color = info.media.color==true?1:0;
         info.media.mediaCameraPhone = info.media.mediaCameraPhone==true?1:0;
         info.media.mediaDigitalPhotos = info.media.mediaDigitalPhotos==true?1:0;
         info.media.mediaDigitalVideo = info.media.mediaDigitalVideo==true?1:0;
         info.media.mediaMagazine = info.media.mediaMagazine==true?1:0;
         info.media.mediaPhotographs = info.media.mediaPhotographs==true?1:0;
         info.media.mediaVideotape = info.media.mediaVideotape==true?1:0;
         //other
         info.other.activelyTraded = info.other.activelyTraded==true?1:0;
         info.other.activelyTradedDtm = new Date(info.other.activelyTradedDtm);
         info.other.anyDistribution = info.other.anyDistribution==true?1:0; 
         info.other.confirmationField = info.other.confirmationField==true?1:0; 
         info.other.evidenceGuide = info.other.evidenceGuide==true?1:0; 
         info.other.setoActivelyTraded = info.other.setoActivelyTraded==true?1:0; 
         info.other.setoLongitudinal = info.other.setoLongitudinal==true?1:0;
         info.other.identifiedFromOperation = info.other.identifiedFromOperation==true?1:0;
         info.other.identifiedFromReferral = info.other.identifiedFromReferral==true?1:0;
         //status
         info.status.ceosNeedReview = info.status.ceosNeedReview==true?1:0;
      	
         //victim
         info.victim.victimImpactStatement = info.victim.victimImpactStatement==true?1:0;
         info.victim.victimNotification = info.victim.victimNotification==true?1:0;
         //icse
         info.icse.matchInIcse = info.icse.matchInIcse==true?1:0;
         info.icse.dateLoadedToIcse = new Date(info.icse.dateLoadedToIcse);
         var data =JSON.stringify(info);
	 	    console.log(data);
		    DataFtry.updateData(url,data).then(function(result){
			   $scope.msg="This series has been successfully updated.";
			  	$rootScope.editable = false;
			 });

       }
 
   }


   


}]);