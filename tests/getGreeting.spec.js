describe("getGreeting", function() {
  var greeter;
  beforeEach(module('demo'));
  beforeEach(inject(function(_greeters_) {
    greeter = _greeters_;
  }));

  it("says Hello to me", function() {
    expect(greeter.getGreeting("Ludwig")).toEqual("Hello Ludwig");
  });
});

describe("userAPI", function(){

	beforeEach(module('CVIPSMApp.test'));

	var userApi, $httpBackend;

	beforeEach(inject(function(_userApi_ , _$httpBackend_){
		userApi = _userApi_
		$httpBackend = _$httpBackend_;
	}));

	it('should get data', function(){

		$httpBackend.expect("GET", '/users/42').respond(200);

		userApi.getUser(42);

		expect($httpBackend.flush).not.toThrow();
	});
})

describe("get user", function(){

	beforeEach(module('CVIPSMApp.services'));

	var DataFtry, $httpBackend;

	beforeEach(inject(function(_DataFtry_ , _$httpBackend_){
		DataFtry = _DataFtry_
		$httpBackend = _$httpBackend_;
	}));

	it('should get user', function(){

		$httpBackend.expect("GET", '/users/42').respond(200);

		DataFtry.getUser(42);

		expect($httpBackend.flush).not.toThrow();
	});
})

describe("get data", function(){

	beforeEach(module('CVIPSMApp.services'));

	var DataFtry, $rootScope;

	beforeEach(inject(function(_DataFtry_ , _$rootScope_){
		DataFtry = _DataFtry_
		$rootScope = _$rootScope_;
	}));

	it('should get data', function(){

		var returnValue;

		DataFtry.getPromise(42).then(function(val){

			returnValue = val;
		});
		$rootScope.$digest();

		expect(returnValue).toEqual(42);
	});
})