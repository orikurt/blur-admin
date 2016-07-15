/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile')
    .controller('ProfilePageCtrl', ProfilePageCtrl);

  /** @ngInject */
  function ProfilePageCtrl($scope, fileReader, $filter, $uibModal, $stateParams, socket, $timeout) {

    var unsubscribers = [];
    var listeners = [];

    $scope.picture = $filter('appImage')('theme/no-photo.png');
    //$scope.noPicture = true;
    $scope.Date = Date;
    $scope.locals = {};

    $scope.cashToUser = function($e){
      console.log('ProfilePageCtrl:: cashToUser', $scope.user.cash, $scope.locals.cash_add);
      if (!parseInt($scope.locals.cash_add)){
        console.error('ProfilePageCtrl:: cashToUser | cash must be number',$scope.locals.cash_add);
        return;
      }
      socket.socket.emit('admin:cash', {
        userId: $scope.user.userId,
        cash: parseInt($scope.locals.cash_add)
      });
    };

    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };

    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();

    };

    var updateUsers = function(users){
      console.log('ProfilePageCtrl:: all users', socket.data.users);
      for (var i in socket.data.users){
        if (socket.data.users[i].userId === $stateParams.userId){
          $scope.user = socket.data.users[i];
          $scope.user.total_deposit = 0;
          $scope.locals.cash_add = $scope.user.cash;
          for (var i in $scope.user.deposits){
            $scope.user.total_deposit += $scope.user.deposits[i].cash;
          }
          console.log('ProfilePageCtrl:: user', $scope.user);
        }
      }
    };

    var updateStocks = function(all_stock){
      console.log('ProfilePageCtrl:: all stocks', socket.data.stocks);
      $scope.stocks = {};
      for (var i in socket.data.stocks){
        $scope.stocks[socket.data.stocks[i].uid] = socket.data.stocks[i];
      }
      console.log('ProfilePageCtrl:: all stocks', $scope.stocks);
    };

    socket.socket.on('update:users', updateUsers);
    unsubscribers.push( 'update:users' );
    listeners.push( updateUsers);

    socket.socket.on('update:stocks', updateStocks);
    unsubscribers.push( 'update:stocks' );
    listeners.push( updateStocks);


    $scope.socialProfiles = [
      {
        name: 'Facebook',
        href: 'https://www.facebook.com/akveo/',
        icon: 'socicon-facebook'
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com/akveo_inc',
        icon: 'socicon-twitter'
      },
      {
        name: 'Google',
        icon: 'socicon-google'
      },
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/company/akveo',
        icon: 'socicon-linkedin'
      },
      {
        name: 'GitHub',
        href: 'https://github.com/akveo',
        icon: 'socicon-github'
      },
      {
        name: 'StackOverflow',
        icon: 'socicon-stackoverflow'
      },
      {
        name: 'Dribbble',
        icon: 'socicon-dribble'
      },
      {
        name: 'Behance',
        icon: 'socicon-behace'
      }
    ];

    $scope.unconnect = function (item) {
      item.href = undefined;
    };

    $scope.showModal = function (item) {
      $uibModal.open({
        animation: false,
        controller: 'ProfileModalCtrl',
        templateUrl: 'app/pages/profile/profileModal.html'
      }).result.then(function (link) {
          item.href = link;
        });
    };

    $scope.getFile = function () {
      fileReader.readAsDataUrl($scope.file, $scope)
          .then(function (result) {
            $scope.picture = result;
          });
    };

    $scope.switches = [true, true, false, true, true, false];

    $scope.$on('$destroy', function(){
      for (var i in unsubscribers){
        socket.socket.removeListener(unsubscribers[i], listeners[i]);
      }
    });

    $timeout(function(){
      updateUsers(socket.data.users);
      updateStocks(socket.data.stocks);
    });

  }

})();
