angular.module('BlurAdmin').service('authentication', function($http, urls){
  var self = this;
  self.data = {};

  console.log('Trade Admin authentication Service!');

  self.login = function(user){
    return $http({
      method: 'POST',
      url: urls.server + urls.login,
      data: user
    }).then(function(response){
      console.log('authentication service login response', response);
      self.data = response.data;
      return response.data;
    }, function(error){
      console.error('authentication service login error', error);
      return false;
    });
  };

  self.isAdmin = function(){
    return self.data.admin;
  };

}).constant('urls', {
  server: window.location.protocol + '//' + window.location.hostname + ':' + window.location.port,
  login: '/users/login'
});