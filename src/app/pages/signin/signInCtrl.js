/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.signin')
      .controller('signInCtrl', SignInCtrl);

  /** @ngInject */
  function SignInCtrl($scope, submit) {
    console.log('SigninCtrl:: init!');
    $scope.user = {
      username: '',
      password: ''
    };

    $scope.submit = function(){
      submit($scope.user);
    };
  }
})();
