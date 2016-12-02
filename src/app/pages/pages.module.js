/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',
    'BlurAdmin.pages.profile',
    'BlurAdmin.pages.signin',
    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.users',
    'BlurAdmin.pages.stocks',
    'BlurAdmin.pages.stock'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/dashboard');

    baSidebarServiceProvider.addStaticItem({
          title: 'Users',
          icon: 'ion-person-stalker',
          subMenu: [{
            title: 'All users',
            stateRef: 'users'
          },
          {
            title: 'User Profile',
            stateRef: 'profile'
          }]
        },{
          title: 'Stocks',
          icon: 'ion-person-stalker',
          subMenu: [{
            title: 'All Stocks',
            stateRef: 'stocks'
          },
          {
            title: 'Stock Profile',
            stateRef: 'stock'
          }]
        });
  }

})();
