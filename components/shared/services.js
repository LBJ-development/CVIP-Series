'use strict';

//  SETTER AND GETTER FOR THE REQUESTOR ///////////////////////////////////////////////////////////
angular.module('CVIPSMApp.services', [])

//  DATA FACTORY ///////////////////////////////////////////////////////////
.factory('DataFtry', [ '$http' , '$q' ,   function($http, $q) {

	var fakeTable = function(){

		return {
				"data" : [
					{"dbLabel": "series", "disLabel": "Series" },
					{"dbLabel": "child", "disLabel": "Child" },
					{"dbLabel": "suspect", "disLabel": "Suspect" },
					{"dbLabel": "contact", "disLabel": "Contact" },
					{"dbLabel": "childrenrelationship", "disLabel": "Children Relationship" },
					{"dbLabel": "screenname", "disLabel": "Screen Name" },
					{"dbLabel": "exif", "disLabel": "Exif" },
					{"dbLabel": "Leacontact", "disLabel": "Lea Contact" },
					{"dbLabel": "lead", "disLabel": "Lead" },
					{"dbLabel": "note", "disLabel": "Note" },
					{"dbLabel": "identifier", "disLabel": "Identifier" },
					{"dbLabel": "filepartialname", "disLabel": "File Partial Name" },
					{"dbLabel": "survey", "disLabel": "Survey" }
				],
			};
		};
	var fakeColumn = function(table){

		var column = {};

		var series = { "data" : [
					{"dbLabel": "serieid", "disLabel": "Series ID" },
					{"dbLabel": "seriesname", "disLabel": "Series Name" },
					{"dbLabel": "dateseriesstarted", "disLabel": "Date Series Started" },
					{"dbLabel": "dateserieslastmodified", "disLabel": "Date Series Last Modified" },
					{"dbLabel": "seriestype", "disLabel": "Series Type" },
					{"dbLabel": "alias", "disLabel": "Alias" },
					{"dbLabel": "origincountry", "disLabel": "Origin Country" },
					{"dbLabel": "periodofabuse", "disLabel": "Period of Abuse" }
				],
			}
		var child = { "data" : [
					{"dbLabel": "childname", "disLabel": "Child Name" },
					{"dbLabel": "description", "disLabel": "Description" },
					{"dbLabel": "gender", "disLabel": "Gender" },
					{"dbLabel": "haircolor", "disLabel": "Hair Color" },
					{"dbLabel": "agecategory", "disLabel": "Age Category" },
					{"dbLabel": "childageinseries", "disLabel": "Child Age in Series" },
					{"dbLabel": "ethnicity", "disLabel": "Ethnicity" },
					{"dbLabel": "frekles", "disLabel": "Freckles" }
				],
			}
		var suspect = { "data" : [
					{"dbLabel": "offendername", "disLabel": "Offender Name" },
					{"dbLabel": "description", "disLabel": "Description" },
					{"dbLabel": "gender", "disLabel": "Gender" },
					{"dbLabel": "haircolor", "disLabel": "Hair Color" },
					{"dbLabel": "agecategory", "disLabel": "Age Category" },
					{"dbLabel": "childageinseries", "disLabel": "Child Age in Series" },
					{"dbLabel": "ethnicity", "disLabel": "Ethnicity" },
					{"dbLabel": "frekles", "disLabel": "Freckles" }
				],
			}
		var contact = { "data" : [
					{"dbLabel": "agency", "disLabel": "Agency" },
					{"dbLabel": "name", "disLabel": "Name" },
					{"dbLabel": "phone", "disLabel": "Phone" },
					{"dbLabel": "contactdate", "disLabel": "Contact Date" },
					{"dbLabel": "state", "disLabel": "State" },
					{"dbLabel": "email", "disLabel": "Email" },
					{"dbLabel": "country", "disLabel": "Country" },
					{"dbLabel": "notes", "disLabel": "Notes" }
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

