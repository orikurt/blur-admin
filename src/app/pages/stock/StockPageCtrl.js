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

    $scope.users = socket.data.users;
    $scope.binding = {
      userId: '',
      shares: 10,
      uid: $stateParams.uid
    };

    $scope.addSharesUser = function(){
      console.log('StockPageCtrl:: addSharesUser', $scope.binding);
      socket.socket.emit('sharesToUser', $scope.binding);
    };

    var updateStockInfo = function(stockInfo){
      console.log('StockPageCtrl:: update stock info', stockInfo);
      $scope.stock = stockInfo;
    };

    var updateUsers = function(users){
      console.log('StockPageCtrl:: users', users);
      $timeout(function(){
        $scope.users = users;
      });
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

    socket.socket.on('update:users', updateUsers);
    unsubscribers.push( 'update:users' );
    listeners.push( updateUsers);

    $scope.$on('$destroy', function(){
      for (var i in unsubscribers){
        socket.socket.removeListener(unsubscribers[i], listeners[i]);
      }
    });

    socket.socket.emit('getStockInfo', $stateParams.uid);

  }
})();
