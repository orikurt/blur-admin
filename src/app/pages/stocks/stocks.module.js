/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.stocks', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('stocks', {
          url: '/stocks',
          title: 'Stocks',
          templateUrl: 'app/pages/stocks/stocks.html',
          controller: 'StocksPageCtrl'
        });
  }

})();
