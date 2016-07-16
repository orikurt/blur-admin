/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($scope, $timeout, baConfig, baUtil, socket) {

    var unsubscribers = [];
    var listeners = [];
    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
    $scope.smartTablePageSize = 10;

    $scope.charts = [{
      color: pieColor,
      description: 'New Visits',
      stats: '57,820',
      icon: 'person',
    }, {
      color: pieColor,
      description: 'Purchases',
      stats: '$ 89,745',
      icon: 'money',
    }, {
      color: pieColor,
      description: 'Active Users',
      stats: '178,391',
      icon: 'face',
    }, {
      color: pieColor,
      description: 'Returned',
      stats: '32,592',
      icon: 'refresh',
    }, {
      color: pieColor,
      description: 'Registered Users',
      class: 'registered',
      stats: 0,
      icon: 'person',
    }, {
      color: pieColor,
      class: 'onliners',
      description: 'Online Now',
      stats: 0,
      icon: 'person',
    }
  ];

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {
      $('.chart').each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });

      $('.refresh-data').on('click', function () {
        updatePieCharts();
      });
    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function(index, chart) {
        $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
        $('.onliners').data('easyPieChart').update(parseInt( (socket.data.online / socket.data.users.length)*100 ));
        $('.registered').data('easyPieChart').update(parseInt( 100 ));
        $scope.charts[4].stats = socket.data.users.length;
        $scope.charts[5].stats = socket.data.online;
      });
    }

    var updateCount = function(count){
      console.log('DashboardPieChartCtrl:: count', count, $scope.charts[4].stats);
      $timeout(function(){
        $scope.charts[5].stats = count.count;
        $scope.onlineUsers = socket.data.onlineUsers;
        try{
            $('.onliners').data('easyPieChart').update(parseInt( (socket.data.online / socket.data.users.length)*100 ));
        }
        catch (e){};
      });

    };

    var updateUsers = function(users){
      console.log('DashboardPieChartCtrl:: users', users);
      $timeout(function(){
        $scope.charts[4].stats = users.length;
      });

    };

    socket.socket.on('update:count', updateCount);
    unsubscribers.push( 'update:count' );
    listeners.push(updateCount);

    socket.socket.on('update:users', updateUsers);
    unsubscribers.push( 'update:users' );
    listeners.push( updateUsers);

    $timeout(function () {
      loadPieCharts();
      updatePieCharts();
    }, 2000);

    $scope.$on('$destroy', function(){
      for (var i in unsubscribers){
        socket.socket.removeListener(unsubscribers[i], listeners[i]);
      }
    });
  }
})();
