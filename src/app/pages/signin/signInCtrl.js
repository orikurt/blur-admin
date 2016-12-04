/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.signin')
      .controller('signInCtrl', SignInCtrl).controller('reAuthCtrl', ReAuthCtrl);

  /** @ngInject */
  function ReAuthCtrl($scope, submit) {
    console.log('reAuthCtrl:: init!');
    $scope.user = {
      username: '',
      password: ''
    };

    $scope.submit = function(){
      submit($scope.user);
    };
  };

  function SignInCtrl($scope, authentication, $state, $stateParams){
    console.log('SigninCtrl:: init!');
    $scope.user = {
      username: '',
      password: ''
    };
    $scope.submit = function(){
      authentication.login($scope.user).then(function(authenticated){
        if (authenticated && $stateParams.from){
          $state.go($stateParams.from);
        }
      });
    };
  };
})();
