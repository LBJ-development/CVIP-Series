'use strict';

//  SETTER AND GETTER FOR THE REQUESTOR ///////////////////////////////////////////////////////////
angular.module('CVIPSMApp.services', [])

//  DATA FACTORY ///////////////////////////////////////////////////////////
.factory('DataFtry', [ '$http' , '$q' ,   function($http, $q) {

	var fakeTable = function(){

		return {
				data : [
					{dbLabel: "series", disLabel: "Series" },
					{dbLabel: "child", disLabel: "Child" },
					{dbLabel: "suspect", disLabel: "Suspect" },
					{dbLabel: "contact", disLabel: "Contact" },
					{dbLabel: "childrenrelationship", disLabel: "Children Relationship" },
					{dbLabel: "screenname", disLabel: "Screen Name" },
					{dbLabel: "exif", disLabel: "Exif" },
					{dbLabel: "Leacontact", disLabel: "Lea Contact" },
					{dbLabel: "lead", disLabel: "Lead" },
					{dbLabel: "note", disLabel: "Note" },
					{dbLabel: "identifier", disLabel: "Identifier" },
					{dbLabel: "filepartialname", disLabel: "File Partial Name" },
					{dbLabel: "survey", disLabel: "Survey" }
				],
			};
		};
	var fakeColumn = function(table){

		var column = {};

		var series = { 
				data : [
					{dbLabel: "serieid", disLabel: "Series ID" , dataType: "string"},
					{dbLabel: "seriesname", disLabel: "Series Name", dataType: "string" },
					{dbLabel: "dateseriesstarted", disLabel: "Date Series Started" , dataType: "date"},
					{dbLabel: "dateserieslastmodified", disLabel: "Date Series Last Modified" , dataType: "date"},
					{dbLabel: "seriestype", disLabel: "Series Type" , dataType: "string"},
					{dbLabel: "alias", disLabel: "Alias" , dataType: "string"},
					{dbLabel: "origincountry", disLabel: "Origin Country", dataType: "string" },
					{dbLabel: "periodofabuse", disLabel: "Period of Abuse" , dataType: "string"}
				],
			}
		var child = { 
				data : [
					{dbLabel: "childname", disLabel: "Child Name" , dataType: "string"},
					{dbLabel: "description", disLabel: "Description" , dataType: "string"},
					{dbLabel: "gender", disLabel: "Gender" , dataType: "string"},
					{dbLabel: "haircolor", disLabel: "Hair Color" , dataType: "string"},
					{dbLabel: "agecategory", disLabel: "Age Category" , dataType: "string"},
					{dbLabel: "childageinseries", disLabel: "Child Age in Series", dataType: "string"},
					{dbLabel: "ethnicity", disLabel: "Ethnicity" , dataType: "string"},
					{dbLabel: "frekles", disLabel: "Freckles", dataType: "string" }
				],
			}
		var suspect = { 
				data : [
					{dbLabel: "offendername", disLabel: "Offender Name" , dataType: "string"},
					{dbLabel: "description", disLabel: "Description" , dataType: "string"},
					{dbLabel: "gender", disLabel: "Gender", dataType: "string"},
					{dbLabel: "haircolor", disLabel: "Hair Color", dataType: "string"},
					{dbLabel: "agecategory", disLabel: "Age Category" , dataType: "string"},
					{dbLabel: "childageinseries", disLabel: "Child Age in Series" , dataType: "string"},
					{dbLabel: "ethnicity", disLabel: "Ethnicity" , dataType: "string"},
					{dbLabel: "frekles", disLabel: "Freckles" , dataType: "string"}
				],
			}
		var contact = { 
				data : [
					{dbLabel: "agency", disLabel: "Agency" , dataType: "string"},
					{dbLabel: "name", disLabel: "Name" , dataType: "string"},
					{dbLabel: "phone", disLabel: "Phone" , dataType: "string"},
					{dbLabel: "contactdate", disLabel: "Contact Date", dataType: "date" },
					{dbLabel: "state", disLabel: "State" , dataType: "string"},
					{dbLabel: "email", disLabel: "Email" , dataType: "string"},
					{dbLabel: "country", disLabel: "Country", dataType: "string" },
					{dbLabel: "notes", disLabel: "Notes", dataType: "string" }
				],
			}
			
		switch(table){
			case "series" :
				column = series
				break;
			case "child" :
				column = child
				break;
			case "suspect" :
				column = suspect
				break;
			case "contact" :
				column = contact
				break;
			default:
				column = series
		}
		return  column
		}

/*	var getData = function(url){
		var $promise =  $http({
				method: 'GET',
				url:  url,
				headers: {'Content-Type': 'application/json'}
			});
			var deferred = $q.defer();
			$promise.then(function(result){

				if(result.data.status.status == 'SUCCESS'){
					deferred.resolve(result);
				} else  if( result.data.status.status == 'FAILED') {
					alert(result.data.status.message);
				}
			});
			return deferred.promise;
		};
*/	
/*	// TESTING START ////////////////
	var getUser = function(id){

		return $http.get('/users/' + id);
	}

	var getPromise = function(value) {
		return $q.when(value);
	 }
	// TESTING END ////////////////
*/	var sendData = function(url, data){

		console.log("FROM DATA SEND");
		console.log(url);

		var $promise =  $http({
			method: 'POST',
			url:  url,
			headers: {'Content-Type': 'application/json'},
			data: data
		});
		var deferred = $q.defer();
		$promise.then(function(result){

			if(result.data.status == 'SUCCESS'){
				deferred.resolve(result.data.message);
				} else {
					alert('Woops something wen wrong with the AJAX call');
				}
			});
			return deferred.promise;
		};

	var getData = function(url){

		var $promise =  $http({
			method: 'GET',
			url:  url,
			headers: {'Content-Type': 'application/json'}
		});

		var deferred = $q.defer();

		$promise.then(function(result){
			deferred.resolve(result.data);
			});
			return deferred.promise;
		};

	return {
		// TESTING START ////////////////
		//getUser: getUser,
		//getPromise: getPromise,
		// TESTING END ////////////////
		getData		: getData,
		sendData		: sendData,
		fakeTable		: fakeTable,
		fakeColumn	: fakeColumn
	};
}]);

