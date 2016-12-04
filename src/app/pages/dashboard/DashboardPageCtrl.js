/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardPageCtrl', DashboardPageCtrl);

  /** @ngInject */
  function DashboardPageCtrl($scope, $timeout, baConfig, baUtil, socket, $uibModal) {

    console.log('DashboardPageCtrl:: init!');
    var unsubscribers = [];
    var listeners = [];
    var timeInterval;

    var updateMarketState = function(marketState){
      console.log('main_ctrl:: marketState update', marketState);
  		$timeout(function(){
  			$scope.marketState = marketState;
  		});
  		if (!timeInterval){
  			timeInterval = setInterval(function(){
  				$timeout(function(){
  					$scope.marketState.ttl -= 1000;
  					$scope.marketState.hours = parseInt($scope.marketState.ttl / 1000 / 60 / 60);
  					$scope.marketState.minutes = parseInt(($scope.marketState.ttl / 1000 / 60) % 60);
  					$scope.marketState.seconds = parseInt(($scope.marketState.ttl / 1000) % 60);
  				});
  			}, 1000)
  		}
    };

    $scope.openAuth = function (state) {
      $scope.modal = $uibModal.open({
        animation: true,
        templateUrl: 'app/pages/signin/form.html',
        size: 'md',
        controller: 'signInCtrl',
        resolve: {
          submit: function(){
            return resolveSignIn;
          }
        }
      });

      $scope.modal.result.then(function(user){
        user.state = state;
        console.log('DashboardPageCtrl:: signin resolve', user);
        $scope.setMarketState(user);
      });
  
    };

    var resolveSignIn = function(data){
      $scope.modal.close(data);
    }

    $scope.setMarketState = function(data){
      socket.socket.emit('setMarketState', data);
    };

    socket.socket.on('update:marketState', updateMarketState);
    unsubscribers.push( 'update:marketState' );
    listeners.push( updateMarketState);

    socket.socket.emit('getSMarketState');
    $scope.$on('$destroy', function(){
      for (var i in unsubscribers){
        socket.socket.removeListener(unsubscribers[i], listeners[i]);
      }
    });
  }
})();
