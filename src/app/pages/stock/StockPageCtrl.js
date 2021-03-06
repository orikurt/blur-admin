/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.stocks')
    .controller('StockPageCtrl', StockPageCtrl);

  /** @ngInject */
  function StockPageCtrl($scope, $stateParams, socket, $timeout, $uibModal) {

    console.log('StockPageCtrl:: init!');
    var unsubscribers = [];
    var listeners = [];

    $scope.users = socket.data.users;
    $scope.binding = {
      userId: socket.data.users[0].userId || '',
      shares: 10,
      uid: $stateParams.uid
    };

    $scope.openAuth = function () {
      $scope.modal = $uibModal.open({
        animation: true,
        templateUrl: 'app/pages/signin/form.html',
        size: 'md',
        controller: 'reAuthCtrl',
        resolve: {
          submit: function(){
            return resolveSignIn;
          }
        }
      });

      $scope.modal.result.then(function(user){
        console.log('DashboardPageCtrl:: signin resolve', user);
        $scope.addSharesUser(user);
      });
  
    };

    var resolveSignIn = function(data){
      $scope.modal.close(data);
    }


    $scope.addSharesUser = function(user){
      Object.assign(user, $scope.binding);
      console.log('StockPageCtrl:: addSharesUser', user);
      socket.socket.emit('sharesToUser', user);
    };

    var updateStockInfo = function(stockInfo){
      console.log('StockPageCtrl:: update stock info', stockInfo);
      $scope.stock = stockInfo;
    };

    var updateUsers = function(users){
      console.log('StockPageCtrl:: users', users);
      $timeout(function(){
        $scope.users = users;
        $scope.binding.userId = users[0].userId;
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
