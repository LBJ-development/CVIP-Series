'use strict';
angular.module('CVIPSMApp.sectionsInfo', [])

.controller('SummaryCtrl',["$rootScope", "$scope", "CVIPConfig", "DataFtry",  function($rootScope, $scope, CVIPConfig, DataFtry){


}])

.controller('ImagesCtrl',["$rootScope", "$scope", "CVIPConfig", "DataFtry",  function($rootScope, $scope, CVIPConfig, DataFtry){

    $scope.addFileName = function(){
     
      var url = CVIPConfig.contextPath+'filename/'+$scope.generalInfo.series.seriesId+"/"+$scope.newfilename;
      console.log(url);

      if (! ($scope.newfilename!=null && $scope.newfilename.length>0))
        alert('Please enter a the file name');
      else{
        DataFtry.sendData(url).then(function(result){ 
              console.log(result.data);
             $scope.files.push(result.data);
         });
       }

    }
    $scope.deleteFileName= function(file){
        console.log("delete file name with id " + file.id);
         var index;
         var url = CVIPConfig.contextPath + 'filename/' + file.id; 
         DataFtry.deleteDat(url).then(function(result){ 

            index =  $scope.files.indexOf(file);
            if (index >-1){
                $scope.files.splice(index, 1);
            }
          });
    }


}])


.controller('suspectCtrl',["$rootScope", "$scope", "CVIPConfig", "DataFtry",  function($rootScope, $scope, CVIPConfig, DataFtry){
  $scope.deleteEmail= function(email){
        console.log("deleting email id "+ email.id);
    //var id = $scope.suspectList[$scope.itemIndex];
    var url = CVIPConfig.contextPath + 'email/' + email.id; 
     var index;
        DataFtry.deleteDat(url).then(function(result){ 
          index =  $scope.suspectList[$scope.itemIndex].emails.indexOf(email);
            if (index >-1){
                $scope.suspectList[$scope.itemIndex].emails.splice(index, 1);
            }

      $scope.msg="This series has been successfully updated.";
      $rootScope.editable = false;
      $scope.selectItem($scope.itemIndex, 'suspect', 0, $scope.suspectList, event);
    });

  }

$scope.addemail= function(){
      console.log("addemail");
       var url = CVIPConfig.contextPath+'email';
       console.log($scope.newemail);

     if (!($scope.newemail!=null && $scope.newemail.length>0)){
      alert('Please enter a value for the Screen Name/Email Address')
     }else{
          var data={
              email: $scope.newemail,
              suspectId:$scope.suspectList[$scope.itemIndex].id,
              operator:null,
              updateDtm: new Date()
            };
            DataFtry.sendData(url,JSON.stringify(data)).then(function(result){ 
              console.log(result);
              $scope.msg="This series has been successfully updated.";
              $rootScope.editable = false;
              $scope.suspectList[$scope.itemIndex].emails.push(result.data);
              $scope.selectItem($scope.itemIndex, 'suspect', 0, $scope.suspectList, event);
           });
        }
  }

}])


.controller('ChecklistCtrl',["$rootScope", "$scope", "CVIPConfig", "DataFtry",  function($rootScope, $scope, CVIPConfig, DataFtry){

	

  $scope.saveChecklist = function(){
    console.log("updating checklist");
    $rootScope.editable = false;
    $scope.checklist.underEighteen = $scope.checklist.underEighteen==true?1:0;
    $scope.checklist.pornographic = $scope.checklist.pornographic==true?1:0;
    $scope.checklist.harmfulConduct = $scope.checklist.harmfulConduct==true?1:0;
    $scope.checklist.atRiskFromAge = $scope.checklist.atRiskFromAge==true?1:0;
    $scope.checklist.atRiskFromTime = $scope.checklist.atRiskFromTime==true?1:0;
    $scope.checklist.atRiskFromHome = $scope.checklist.atRiskFromHome==true?1:0;
    $scope.checklist.atRiskImminentDanger = $scope.checklist.atRiskImminentDanger==true?1:0;
    $scope.checklist.atRiskEgregiousActivity = $scope.checklist.atRiskEgregiousActivity==true?1:0;
    $scope.checklist.contactedIceNcvip = $scope.checklist.contactedIceNcvip==true?1:0;
    $scope.checklist.contactedIcacrtf = $scope.checklist.contactedIcacrtf==true?1:0;
    $scope.checklist.contactedInterpol = $scope.checklist.contactedInterpol==true?1:0;
    $scope.checklist.contactedNcs = $scope.checklist.contactedNcs==true?1:0;
    $scope.checklist.contactedTps = $scope.checklist.contactedTps==true?1:0;
    $scope.checklist.contactedOthers = $scope.checklist.contactedOthers==true?1:0;
    $scope.checklist.examineUniqueImageFeatures = $scope.checklist.examineUniqueImageFeatures==true?1:0;
    $scope.checklist.sroContactAttempt = $scope.checklist.sroContactAttempt==true?1:0;
    $scope.checklist.joContactAttempt = $scope.checklist.joContactAttempt==true?1:0;
    $scope.checklist.countyContactAttempt = $scope.checklist.countyContactAttempt==true?1:0;
    $scope.checklist.cpsContactAttempt = $scope.checklist.cpsContactAttempt==true?1:0;
    $scope.checklist.medicalContactAttempt = $scope.checklist.medicalContactAttempt==true?1:0;
    $scope.checklist.teacherContactAttempt = $scope.checklist.teacherContactAttempt==true?1:0;
    //console.log($scope.checklist);
    var url = CVIPConfig.contextPath + "checklist/"+$scope.checklist.id;
		var jsonString = JSON.stringify($scope.checklist);
    DataFtry.updateData(url, jsonString).then(function(result){ 
			
		});

  	}

}]);