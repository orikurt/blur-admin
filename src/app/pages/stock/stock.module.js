/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.stock', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('stock', {
          url: '/stock/:uid',
          title: 'Stock Profile',
          templateUrl: 'app/pages/stock/stock.html',
          controller: 'StockPageCtrl'
        });
  }

})();
