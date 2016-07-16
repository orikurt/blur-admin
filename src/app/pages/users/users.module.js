/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.users', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('users', {
          url: '/users',
          title: 'Users',
          templateUrl: 'app/pages/users/users.html',
          controller: 'UsersPageCtrl'
        });
  }

})();
