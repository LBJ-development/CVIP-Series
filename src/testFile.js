angular.module('demo', [])
.factory('greeters', function() {
  return {
    // ...
    getGreeting: function(name) {
      return "Hello " + name;
    }
  };
});

angular.module('CVIPSMApp.test', [])
.factory('userApi', function($http) {
  return {
    getUser: getUser,
    getFullName: getFullName
  };

  function getUser(id) {
    return $http.get('/users/' + id);
  }

  function getFullName(user) {
    return user.firstName + " " + user.lastName;
  }
});