/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.stocks')
    .controller('StockPageCtrl', StockPageCtrl);

  /** @ngInject */
  function StockPageCtrl($scope, $stateParams, socket, $timeout) {

    console.log('StockPageCtrl:: init!');
    var unsubscribers = [];
    var listeners = [];

    var updateStockInfo = function(stockInfo){
      console.log('StockPageCtrl:: update stock info', stockInfo);
      $scope.stock = stockInfo;
    };

    var saveOwnershipMap = function(ownershipMap){
      $scope.ownershipMap = ownershipMap;
    };

    socket.socket.on('update:stockInfo', updateStockInfo);
    unsubscribers.push( 'update:stockInfo' );
    listeners.push( updateStockInfo);

    socket.socket.on('update:ownershipMap', saveOwnershipMap);
    unsubscribers.push( 'update:ownershipMap' );
    listeners.push( saveOwnershipMap );


    $scope.$on('$destroy', function(){
      for (var i in unsubscribers){
        socket.socket.removeListener(unsubscribers[i], listeners[i]);
      }
    });

    socket.socket.emit('getStockInfo', $stateParams.uid);

  }
})();
