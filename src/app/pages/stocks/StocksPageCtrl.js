/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.stocks')
    .controller('StocksPageCtrl', StocksPageCtrl);

  /** @ngInject */
  function StocksPageCtrl($scope, fileReader, $filter, $uibModal, $stateParams, socket, $timeout) {

    var unsubscribers = [];
    var listeners = [];
    $scope.smartTablePageSize = 10;
    $scope.stocks = socket.data.stocks;

    var updateStocks = function(stocks){
      console.log('StocksPageCtrl:: updateStocks', stocks);
      $scope.stocks = stocks;
    };

    socket.socket.on('update:stocks', updateStocks);
    unsubscribers.push( 'update:stocks' );
    listeners.push( updateStocks);

    $scope.$on('$destroy', function(){
      for (var i in unsubscribers){
        socket.socket.removeListener(unsubscribers[i], listeners[i]);
      }
    });

  }
})();
