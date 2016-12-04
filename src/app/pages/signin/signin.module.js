/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.signin', [])
  .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('signin', {
          url: '/signin',
          templateUrl: 'app/pages/signin/signin.html',
          title: 'SignIn',
          controller: 'signInCtrl',
          params: {
          	from: null,
          	params: {}
          }
        });
  }

})();
