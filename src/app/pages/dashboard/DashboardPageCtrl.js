/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardPageCtrl', DashboardPageCtrl);

  /** @ngInject */
  function DashboardPageCtrl($scope, $timeout, baConfig, baUtil, socket) {

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

    $scope.setMarketState = function(state){
      socket.socket.emit('setMarketState', state);
    };

    socket.socket.on('update:marketState', updateMarketState);
    unsubscribers.push( 'update:marketState' );
    listeners.push( updateMarketState);

    socket.socket.emit('getSMarketState');
  }
})();
