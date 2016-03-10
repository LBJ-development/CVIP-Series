'use strict';

angular.module('CVIPSMApp.utilities', [])

.controller('leftMenuCtrl', ["$scope",  "DataFtry" ,  function($scope, DataFtry){

	
}])

.directive('leftMenu', function($state){
	return{
		restrict: "A",
		controller: 'leftMenuCtrl',
		templateUrl: 'components/seriesInfo/leftMenu-tmp.html',
		link: function (scope, element, attrs){

		// ADD/REMOVE ITEMS OBJECTS ///////////////////////////////////////////////
/*		scope.addToList = function(list, name) {
			list.push({
			name : name,	 
		});
		console.log(list, name)
	};


	scope.removeFromList = function(list, index) {
		list.splice(index, 1);
	} ;
*/
		
		}
	}
})

.directive('textField', function($parse, $compile){

	return{
		restrict: "A",
		scope:{
			label: '@',
			table: '@',
			display: '=',
			model:'=model'
		},
		template: function(elements, attrs){
			return "<label><span ng-show='display'>{{table}}</span><span ng-show='display'>: </span> {{label}}: </label><input type='text' class='form-control' ng-model='model' />"
			//return "<label><span >{{table}}</span>" + "<span >: </span>" + "{{label}}: </label><input type='text' class='form-control' ng-model='model' />"
		},
		link: function (scope, element, attrs){
			/*
			var newElement;
			var label = attrs.label;
			if(attrs.type == "date"){
				newElement = $compile("<label>" + attrs.label + "</label> <input kendo-date-picker k-ng-model='field.model' />")(scope);
				element.replaceWith(newElement);  
			}*/
		}
	}
})

.directive('dateField', function(){
	return{
		restrict: "A",
		scope:{
			label: '@',
			table: '@',
			display: '=',
			model:'=model'
		},
		template: function(elements, attrs){
			return "<label><span ng-show='display'>{{table}}</span><span ng-show='display'>: </span> {{label}}: </label><input kendo-date-picker ng-model='model' />"
		},
		link: function (scope, element, attrs){

		}
	}
})

.directive('dropDown', function(DataFtry){
	return{
		restrict: "A",
		scope:{
			label: '@',
			table: '@',
			column: '@',
			display: '=',
			model:'=model'
		},
		template: function(elements, attrs){
			return "<label><span ng-show='display'>{{table}}</span><span ng-show='display'>: </span> {{label}}: </label><select kendo-drop-down-list k-options='DDOptions'  class='form-control field-k-dropDown' ng-model='model'  ></select>"
		},
		link: function (scope, element, attrs){

			var ddData = attrs.column;
			var ddLabel = attrs.label;
			//console.log(ddData)

			scope.DDOptions = {
				dataTextField: "disLabel",
				dataValueField: "dbLabel",
				optionLabel: {
					disLabel : "",
					dbLabel: ""
			},
			dataSource: DataFtry.dropdownData(ddData).data
			}
		}
	}
})

.directive('checkBox', function(DataFtry){
	return{
		restrict: "A",
		scope:{
			label: '@',
			table: '@',
			column: '@',
			display: '=',
			model:'=model'
		},
		template: function(elements, attrs){
			return "<label style='padding:0px 0px 0 0'><span ng-show='display' style='float:left; clear:both'>{{table}}</span><span style='float:left' ng-show='display'>: </span>  <input type='checkbox'  style='float:left; clear:left; margin:5px 10px 0 0; ' ng-model='model' >  <span style='float:left;'>{{label}} </span></label>"
		},
		link: function (scope, element, attrs){

			var ddData = attrs.column;
			var ddLabel = attrs.label;
			console.log(ddData)

			scope.DDOptions = {
				dataTextField: "disLabel",
				dataValueField: "dbLabel",
				optionLabel: {
					disLabel : "",
					dbLabel: ""
			},
			dataSource: DataFtry.dropdownData(ddData).data
			}
		}
	}
})
.directive('footer', function(){
	return{
		restrict: "A",
		templateUrl: 'components/shared/footer-tmp.html',
		link: function (scope, element, attrs){

		}
	}
})

.factory('WindowSizeFtry', [ '$rootScope' , '$window' ,function($rootScope, win) {

	var wrapperWidth;

	win.addEventListener('resize', function() {

		wrapperWidth = $("#wrapper").width();

		//BROADCAST THE WIDTH OF THE WRAPPER FOR THE WHOLE APPLICATION
		$rootScope.$broadcast('wrapperWidthChanges', wrapperWidth);

		}, false);
	return { };
}])




/*
// GOOGLE SEARCH DIRECTIVE ///////////////////////////////////////////////////////
.directive ('searchNcmec', function () {
	return {
		restrict: 'E',
		transclude: true,
		//scope: true,
		templateUrl: 'components/searchNCMEC-tmp.html',
		link: function (scope, element, attrs){
		}
	};
})
// PAGINATION CONTROLER ///////////////////////////////////////////////////////
.controller('PaginationCtrl', function ($rootScope, $scope, $log) {
	//RESET THE PAGINATION TO THE FIRST PAGE WHEN USER MAKE A NEW SEARCH
	$scope.$on('RESET-PAGINATION', function(event) {
		$scope.currentPage = 1;
	});

	$scope.pageChanged = function() {
		$log.log('Page changed to: ' + $scope.currentPage);
		$rootScope.$broadcast('PAGE-CHANGED', $scope.currentPage);
	};
});



// SUMMARY CONTROLLER /////////////////////////////////////////////////////////
.controller('SummaryCtrl', function($scope){
	
	$scope.isSearchable = false;
	$scope.buttonClass = "btn-disabled";
})



// SELECT A STATE DIRECTIVE /////////////////////////////////////////////////////////
.directive ('selectState',function ( $rootScope) {
	return {
	restrict: 'E',
	transclude: true,
	scope: { 
		classdir:'@',
		mod:'=ngModel'
		 },
	templateUrl: 'components/states.html',
	link: function (scope, element, attrs){

		}
	};
})

// SELECT A GENDER /////////////////////////////////////////////////////////
.directive ('selectGender',function ( $rootScope) {
	return {
	restrict: 'E',
	transclude: true,
	scope: { 
		classdir:'@',
		mod:'=ngModel'
		 },
	template: '<select class={{classdir}} ng-model="mod"> <option value=""></option><option value="Male">Male</option> <option value="Female">Female</option> <option value="T">Transgender</option></select>',
	link: function (scope, element, attrs){

		}
	};
})

// SUMMARY DIRECTIVE /////////////////////////////////////////////////////////
.directive ('summaryDir',function ( $rootScope) {
	return {
	restrict: 'E',
	// scope :{},
	controller: 'SummaryCtrl',
	templateUrl: 'components/summary.html',
	link: function (scope, element, attrs){
		// MAKE SURE THAT THERE IS AT LEAST ONE PERSON IN THE SEARCH REQUEST ////////////////////////////////
		scope.isPersonInSearch = function(){
			for(var i=0; i<scope.childrenList.length; i++){
				if(scope.childrenList[i].person.isSearchable && scope.childrenList[i].searches.length >0){
					scope.isSearchable = true;
					scope.buttonClass = "btn-primary";
					return;
				} else {
					scope.isSearchable = false;
					scope.buttonClass = "btn-disabled";
					}
				}
			for(var i=0; i<scope.csawList.length; i++){
				if(scope.csawList[i].person.isSearchable && scope.csawList[i].searches.length >0){
					scope.isSearchable = true;
					scope.buttonClass = "btn-primary";
					return;
				} else {
					scope.isSearchable = false;
					scope.buttonClass = "btn-disabled";
					}
				}
			for(var i=0; i<scope.guardianList.length; i++){
				if(scope.guardianList[i].person.isSearchable && scope.guardianList[i].searches.length >0){
					scope.isSearchable = true;
					scope.buttonClass = "btn-primary";
					return;
				} else {
					scope.isSearchable = false;
					scope.buttonClass = "btn-disabled";
					}
				}
			for(var i=0; i<scope.uhrList.length; i++){
				if(scope.uhrList[i].person.isSearchable && scope.uhrList[i].searches.length >0){
					scope.isSearchable = true;
					scope.buttonClass = "btn-primary";
					return;
				} else {
					scope.isSearchable = false;
					scope.buttonClass = "btn-disabled";
					}
				}
			}
		}
	};
})

// EXT REQUESTOR  DIRECTIVE /////////////////////////////////////////////////////////
.directive ('extRequestorDir',function () {
	return {
	restrict: 'E',
	// scope :{},
   // controller: 'SummaryCtrl',
	templateUrl: 'components/extRequestor.html',
	link: function (scope, element, attrs){

		scope.isNCMECCcase = function(evt) {
			
			scope.cleanCase();

			 if($(NCMECcase).is(":checked")) {
				scope.addExtRequestor();
				} else {
				scope.extRequestorList = [];
			}
		};
		scope.addExtRequestor = function(evt) {
	   
				scope.extRequestorList.push({
					name:  {firstName: "",  lastName: ""},
					department: "",
					title: "",
					contactNumber: "",
					cellNumber: "",
					email: "",
					 });
				};
			}
	   };
})

// CALENDAR DIRECTIVE ////////////////////////////////////////////////////////
.directive("datepicker", function() {
	return {
		restrict: "A",
		require: "ngModel",
		link: function(scope, elem, attrs, ngModelCtrl) {
			var updateModel = function(dateText) {
				scope.$apply(function() {
					ngModelCtrl.$setViewValue(dateText);
				});
			};
			var options = {
				dateFormat: "dd/mm/yy",
				changeMonth: true,
				changeYear: true,
				onSelect: function(dateText) {
					updateModel(dateText);
				}
			};
		   elem.datepicker(options);
		}
	}
})

// WATCH THE VIEWPORT SIZE //////////////////////////////////////////////
.factory('WindowSizeFtry', [ '$rootScope' , '$window' , "$interval", function($rootScope, win, $interval) {

	var wrapperWidth;

	var delay = $interval(function() {
		wrapperWidth = $("#wrapper").width();
		$rootScope.$broadcast('wrapperWidthChanges', wrapperWidth);
		   $interval.cancel(delay);
	}, 500);

	win.addEventListener('resize', function() {
		wrapperWidth = $("#wrapper").width();
		//BROADCAST THE WIDTH OF THE WRAPPER FOR THE WHOLE APPLICATION
		$rootScope.$broadcast('wrapperWidthChanges', wrapperWidth);

		}, false);
	return { };
}])

*/