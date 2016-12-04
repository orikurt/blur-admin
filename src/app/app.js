'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.router',
  'ngTouch',
  'smart-table',

  'BlurAdmin.theme',
  'BlurAdmin.pages'
]).controller('mainCtrl', function($scope, $rootScope, authentication, $state){
	console.log('mainCtrl:: init');

	$rootScope.$on('$stateChangeStart', function(event, next){
		console.log('mainCtrl:: stateChangeStart', next);
		if (next.name === 'signin'){
			return;
		}
		if (!authentication.isAdmin()){
			$state.go('signin');
			event.preventDefault();
		}
	});

	if (!authentication.isAdmin() && $state.current.name !== 'signin'){
		$state.go('signin', {from: $state.current.name});		
	}
});
