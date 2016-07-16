/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.users')
    .controller('UsersPageCtrl', UsersPageCtrl);

  /** @ngInject */
  function UsersPageCtrl($scope, fileReader, $filter, $uibModal, $stateParams, socket, $timeout) {

    var unsubscribers = [];
    var listeners = [];
    $scope.smartTablePageSize = 10;

    $scope.users = socket.data.users;
    $scope.onlineUsers = socket.data.onlineUsers;

    var updateUsers = function(users){
      console.log('UsersPageCtrl:: users', users);
      $timeout(function(){
        $scope.users = users;
      });
    };

    var updateCount = function(count){
      console.log('UsersPageCtrl:: count', count);
      $timeout(function(){
        $scope.onlineUsers = socket.data.onlineUsers;
        try{
            $('.onliners').data('easyPieChart').update(parseInt( (socket.data.online / socket.data.users.length)*100 ));
        }
        catch (e){};
      });

    };

    socket.socket.on('update:users', updateUsers);
    unsubscribers.push( 'update:users' );
    listeners.push( updateUsers);

    socket.socket.on('update:count', updateCount);
    unsubscribers.push( 'update:count' );
    listeners.push(updateCount);

  }
})();
