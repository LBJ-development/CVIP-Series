'use strict';

//  SETTER AND GETTER FOR THE REQUESTOR ///////////////////////////////////////////////////////////
angular.module('CVIPSMApp.services', [])

// SERVICE DATA FOR TESTING PURPOSE -- RETURN AN INSTANCE OF THE FUNCTION
.service("DataTesting" ,function(){
	this.getData = function(num){
		var data = generateSeriesSearchResult(num);
		return data;	
	}
	return this;
})

// SAMPLE JSON FOR SERIES /////////////////////////////////////////
/*
data : {
	general: [{
		general: {
			seriesid: "",
			seriesname: ""
			etc...
		},
		transferttointerpol: {
			icseseizurename: "",
			matchinicse: false,
			etc...
		},
	etc...		
	}],
	summary:{
		associatedseries: "",
		summary: ""
	},
	suspects: [{
			name: defaultName,
			agegroup: "",
			age: "",
			uploadedphotos: [{}],
			birthdate: "",
			haircolor: "",
			eyecolor: "",
			gender: "",
			ethnicity: "",
			isdeceased: false,
			physicalfeatures: {freckles: false, scars: false, glasses: false, moles: false, braces: false, makeup: false, tatoos: false, acne: false, watch: false, jewelry: false, nailPolish: false, piercing: false },
			description: ""
		 }],
	children: [{}],
	checklist:{},
	leads: [{}],
	identifiers: [{}],
	partialfilenames: [{}],
	BOLO: {},
	leapocs:[{}],
	contacts: [{}]
	}


http://cvipcmsdev1.ncmecad.net:8080/series/rest/cases/subjecttypes

}


*/
 

//  DATA FACTORY ///////////////////////////////////////////////////////////
.factory('DataFtry', [ '$http' , '$q' ,   function($http, $q) {

	// SAMPLE JSON FOR DYNAMIC GENERAL SECTION //////////////////////////////
	var testData = function(){
		return {
			data : [	
				{label : "Series ID",		section: "summaryData",	model : "seriesid",		dddata: "",				datatype : "string",	required : false,	disabled : false,	multiple : false, 	deletable : false,	},
				{label : "Series Name", 	section: "summaryData",	model : "seriesname",	dddata: "",				datatype : "string",	required : false,	disabled : false,	multiple : false,	deletable : false,	},
				{label : "Analyt Name", 	section: "summaryData",	model : "analystname",	dddata: "analysts",		datatype : "dropdown",	required : false,	disabled : false,	multiple : false,	deletable : false,	},
				{label : "Date Created", 	section: "summaryData",	model : "datecreated",	dddata: "",				datatype : "date",		required : false,	disabled : false,	multiple : false,	deletable : false,	},
				{label : "Series Type",		section: "summaryData",	model : "subjecttype",	dddata: "subjecttype",	datatype : "dropdown",	required : false,	disabled : false,	multiple : false,	deletable : false,	},
				{label : "Is Deceased",		section: "summaryData",	model : "isdeceased",	dddata: "",				datatype : "checkbox",	required : false,	disabled : false,	multiple : false,	deletable : false,	},
			]
		}
	}

	// DATA FOR IDENTIFICATION TIMELINE //////////////////////////////
	var generalIdenTimeline = function(){
		return {
			data : [	
				
				{label : "Creation Date",	section: "generalInfo.idenTimeline",	model : "creation_date",				datatype : "date"},
				{label : "First Report Date",		section: "generalInfo.idenTimeline",	model : "first_report_dtm",				datatype : "date"},
				{label : "Date Identified",		section: "generalInfo.idenTimeline",	model : "date_entered_identified",				datatype : "date"},
				
				]
		}
	}
	// DATA FOR DATE RECORD STARTED //////////////////////////////
	var generalDateRecordStarted = function(){
		return {
			data : [	
				{label : "Date Series Record Started",	section: "generalInfo.dateRecordStarted",	model : "create_dtm",			datatype : "date"},
				{label : "Analyst",						section: "generalInfo.dateRecordStarted",	model : "analyst",				datatype : "dropdown", dddata: "analysts",	},
				{label : "First Recorded by NCMEC",		section: "generalInfo.dateRecordStarted",	model : "first_recorded_ncmec",	datatype : "date"},
				{label : "Related to CT/TA",			section: "generalInfo.dateRecordStarted",	model : "related_to_ctta",		datatype : "string"},
				{label : "Where",						section: "generalInfo.dateRecordStarted",	model : "first_report_where",	datatype : "string"},
				{label : "Detail",						section: "generalInfo.dateRecordStarted",	model : "first_report_details",	datatype : "string"},
				
				]
		}
	}
	// DATA FOR DATE RECORD STARTED //////////////////////////////
	var generalActivity = function(){
		return {
			data : [	
				{label : "Bondage",					section: "generalInfo.activity",	model : "bondage_sm",				datatype : "checkbox"},
				{label : "Defecation",				section: "generalInfo.activity",	model : "defecation",				datatype : "checkbox"},
				{label : "Exposure of Genitals/Anus",section: "generalInfo.activity",	model : "exposure_genitalia_anus",	datatype : "checkbox"},
				{label : "Erotica Fully Clothed",	section: "generalInfo.activity",	model : "erotica_fully_clothed",	datatype : "checkbox"},
				{label : "Erotica Present",			section: "generalInfo.activity",	model : "erotica_present",			datatype : "checkbox"},
				{label : "Exposure of Breast",		section: "generalInfo.activity",	model : "exposure_breast_chest",	datatype : "checkbox"},
				{label : "Urination",				section: "generalInfo.activity",	model : "urination",				datatype : "checkbox"},
				{label : "Licking",					section: "generalInfo.activity",	model : "licking",					datatype : "checkbox"},
				{label : "Oral Copulation",			section: "generalInfo.activity",	model : "oral_copulation",			datatype : "checkbox"},
				{label : "Ejaculation",				section: "generalInfo.activity",	model : "ejaculation_seen",			datatype : "checkbox"},
				{label : "Manual Stimulation",		section: "generalInfo.activity",	model : "manual_stimulation",		datatype : "checkbox"},
				{label : "Full Nudity",				section: "generalInfo.activity",	model : "full_nudity",				datatype : "checkbox"},
				{label : "Bestiality",				section: "generalInfo.activity",	model : "bestiality",				datatype : "checkbox"},
				{label : "Kissing",					section: "generalInfo.activity",	model : "kissing",					datatype : "checkbox"},
				{label : "Vaginal Penetration",		section: "generalInfo.activity",	model : "vaginal_penetration",		datatype : "checkbox"},
				{label : "Drugged Sleeping",		section: "generalInfo.activity",	model : "drugged_sleeping",			datatype : "checkbox"},
				{label : "Anal Penetration",		section: "generalInfo.activity",	model : "anal_penetration",			datatype : "checkbox"},
				{label : "Other Sexual Content",	section: "generalInfo.activity",	model : "other_sexual_content",		datatype : "checkbox"},
				]
		}
	}

	// DATA FOR IDENTIFICATION TIMELINE //////////////////////////////
	var generalSummaryStats = function(){
		return {
			data : [	
				
				{label : "Number of Offenders",	section: "generalInfo.summaryStatistics",	model : "number_offenders",				datatype : "string"},
				{label : "Number of Images",		section: "generalInfo.summaryStatistics",	model : "number_images",				datatype : "string"},
				{label : "Number of Victims",		section: "generalInfo.summaryStatistics",	model : "number_child_victims",				datatype : "string"},
				
				]
		}
	}
	// DATA FOR MEDIA //////////////////////////////
	var generalMedia = function(){
		return {
			data : [	
				{label : "Videotape",		section: "generalInfo.media",	model : "media_videotape",		datatype : "checkbox"},
				{label : "Digital Photos",	section: "generalInfo.media",	model : "media_digital_photos",	datatype : "checkbox"},
				{label : "Camera Phone",	section: "generalInfo.media",	model : "media_camera_phone",	datatype : "checkbox"},
				{label : "Digital Video", 	section: "generalInfo.media",	model : "media_digital_video",	datatype : "checkbox"},
				{label : "Magazine",		section: "generalInfo.media",	model : "media_magazine",		datatype : "checkbox"},
				{label : "Web Cam",			section: "generalInfo.media",	model : "web_cam",				datatype : "checkbox"},
				{label : "Photographs",		section: "generalInfo.media",	model : "media_photographs",	datatype : "checkbox"},
				]
		}
	}

	// RETURN FAKE SECTIONS FOR ADVANDED SEARCH /////////////////////////////////////
/*	var fakeTable = function(){
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
		};*/
	// RETURN FAKE CRITERIAS FOR ADVANDED SEARCH /////////////////////////////////////
	/*var fakeColumn = function(table){

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
					{dbLabel: "periodofabuse", disLabel: "Period of Abuse" , dataType: "string"},
					{dbLabel: "submissiontype", disLabel: "Submission Type" , dataType: "dropdown"},
					{dbLabel: "ncmecnseriesnameiisnotchildname", disLabel: "Series Name is not Child's Name" , dataType: "checkbox"}
				],
			}
		var child = { 
				data : [
					{dbLabel: "childname", disLabel: "Child Name" , dataType: "string"},
					{dbLabel: "description", disLabel: "Description" , dataType: "string"},
					{dbLabel: "gender", disLabel: "Gender" , dataType: "string"},
					{dbLabel: "haircolors", disLabel: "Hair Color" , dataType: "dropdown"},
					{dbLabel: "agecategory", disLabel: "Age Category" , dataType: "string"},
					{dbLabel: "childageinseries", disLabel: "Child Age in Series", dataType: "string"},
					{dbLabel: "ethnicity", disLabel: "Ethnicity" , dataType: "string"},
					{dbLabel: "deceased", disLabel: "Deceased", dataType: "checkbox" }
				],
			}
		var suspect = { 
				data : [
					{dbLabel: "offendername", disLabel: "Offender Name" , dataType: "string"},
					{dbLabel: "description", disLabel: "Description" , dataType: "string"},
					{dbLabel: "gender", disLabel: "Gender", dataType: "string"},
					{dbLabel: "haircolors", disLabel: "Hair Color", dataType: "dropdown"},
					{dbLabel: "agecategory", disLabel: "Age Category" , dataType: "string"},
					{dbLabel: "childageinseries", disLabel: "Child Age in Series" , dataType: "string"},
					{dbLabel: "ethnicity", disLabel: "Ethnicity" , dataType: "string"},
					{dbLabel: "frekles", disLabel: "Freckles" , dataType: "string"},
					{dbLabel: "deceased", disLabel: "Deceased", dataType: "checkbox" }
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
	}*/

// RETURN DATA FOR THE DROPDOWN /////////////////////////

	/*var dropdownData = function(dropdown){

		var data = {};

		var seriestype =  {
				data : [
					{dbLabel: "awaitingcaseinfo", disLabel: "Awaiting Case Info" },
					{dbLabel: "Iidentified", disLabel: "Identified" },
					{dbLabel: "ncmecatrisk", disLabel: "NCMEC at Risk" },
					{dbLabel: "unconfirmed", disLabel: "Unconfirmed" },
					{dbLabel: "unfounded", disLabel: "Unfounded" },
					{dbLabel: "unidendtified", disLabel: "Unidentified" },
					{dbLabel: "null", disLabel: "Null" }
				],
			};
		var analysts =  {
				data : [
					{dbLabel: "analystName1", disLabel: "Analyst Name 1" },
					{dbLabel: "analystName2", disLabel: "Analyst Name 2" },
					{dbLabel: "analystName3", disLabel: "Analyst Name 3" },
					{dbLabel: "analystName4", disLabel: "Analyst Name 4" },
					{dbLabel: "analystName5", disLabel: "Analyst Name 5" },
					{dbLabel: "analystName6", disLabel: "Analyst Name 6" },
					{dbLabel: "analystName7", disLabel: "Analyst Name 7" }
				],
			};
		var submissiontypes =  {
				data : [
					{dbLabel: "federal", disLabel: "Federal" },
					{dbLabel: "icac", disLabel: "ICAC" },
					{dbLabel: "international", disLabel: "International" },
					{dbLabel: "local", disLabel: "Local" },
					{dbLabel: "military", disLabel: "Military" },
					{dbLabel: "state", disLabel: "State" }
				],
			};
		var haircolors =  {
				data : [
					{dbLabel: "blonde", disLabel: "Blonde" },
					{dbLabel: "brown", disLabel: "brown" },
					{dbLabel: "red", disLabel: "red" },
					{dbLabel: "black", disLabel: "black" },
					{dbLabel: "gray", disLabel: "gray" },
					{dbLabel: "bald", disLabel: "bald" },
					{dbLabel: "other", disLabel: "other" }
				],
			};
		var agegroups =  {
				data : [
					{dbLabel: "adult", disLabel: "Adult" },
					{dbLabel: "juvenile", disLabel: "Juvenile" },
					{dbLabel: "unknown", disLabel: "Unknown" }
				],
			};
		var genders =  {
				data : [
					{dbLabel: "male", disLabel: "Male" },
					{dbLabel: "female", disLabel: "Female" },
					{dbLabel: "unknown", disLabel: "Unknown" }
				],
			};
		var eyecolors =  {
				data : [
					{dbLabel: "blue", disLabel: "Blue" },
					{dbLabel: "brown", disLabel: "Brown" },
					{dbLabel: "green", disLabel: "Green" },
					{dbLabel: "hazel", disLabel: "Hazel" }
				],
			};
		var races =  {
				data : [
					{dbLabel: "black", disLabel: "Black" },
					{dbLabel: "white", disLabel: "White" },
					{dbLabel: "hispanic", disLabel: "Hispanic" },
					{dbLabel: "asian", disLabel: "Asian" },
					{dbLabel: "other", disLabel: "Other" }
				],
			};

		switch(dropdown){
			case "seriestype" :
				data = seriestype
				break;
			case "analystsname" :
				data = analysts
				break;
			case "submissiontypes" :
				data = submissiontypes
				break;
			case "haircolors" :
				data = haircolors
				break;
			case "agegroups" :
				data = agegroups
				break;
			case "genders" :
				data = genders
				break;
			case "eyecolors" :
				data = eyecolors
				break;
			case "races" :
				data = races
				break;
		}
		return  data
	}*/

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

		// console.log("FROM DATA SEND");
		// console.log(url);
		// console.log(data);

		var $promise =  $http({
			method: 'POST',
			url:  url,
			headers: {'Content-Type': 'application/json'},
			data: data
		});
		var deferred = $q.defer();
		$promise.then(function(result){

			if(result.statusText == 'OK'){
				deferred.resolve(result);
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
		//fakeTable		: fakeTable,
		//fakeColumn	: fakeColumn,
		testData : testData,
		generalMedia: generalMedia,
		generalIdenTimeline : generalIdenTimeline,
		generalDateRecordStarted : generalDateRecordStarted,
		generalActivity : generalActivity,
		generalSummaryStats : generalSummaryStats
		//dropdownData	: dropdownData
	};
}]);

