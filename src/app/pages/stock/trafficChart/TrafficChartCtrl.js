/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('TrafficChartCtrl', TrafficChartCtrl);

  /** @ngInject */
  function TrafficChartCtrl($scope, $timeout, socket, $stateParams) {

    var unsubscribers = [];
    var listeners = [];
    var pie_colors = [

      '#462066', //(purple)
      '#4D4D4D', //(gray)
      '#5DA5DA', //(blue)
      '#FAA43A', //(orange)
      '#60BD68', //(green)
      '#F17CB0', //(pink)
      '#B2912F', //(brown)
      '#B276B2', //(purple)
      '#DECF3F', //(yellow)
      '#F15854' //(red)

    ];

    $scope.total_shares = 0;

    var pieData = {
      datasets: [],
      labels: []
    };

    var config = {
        type: 'pie',
        data: {
            datasets: [{
                data: [
                    420,
                    180,
                    200,
                    73,
                    123
                ],
                backgroundColor: [
                    "#F7464A",
                    "#46BFBD",
                    "#FDB45C"
                ],
            }],
            labels: [
                "Principal Amount",
                "Interest Amount",
                "Processing Fee",
                "whatever",
                "some"
            ]
        },
            options: {
            responsive: true
        }
    };

    var loadPie = function(ownershipMap){
      var dataSet = {
        data: [],
        backgroundColor: []
      };
      for (var i in ownershipMap){
        var owner = ownershipMap[i];
        if (owner.id !== $stateParams.uid){
          pieData.labels.push(owner.name);
          dataSet.data.push(owner.shares);
          $scope.total_shares += parseInt(owner.shares);
          dataSet.backgroundColor.push(pie_colors[i%pie_colors.length]);
        }
      }
      pieData.datasets.push(dataSet);
      config.data = pieData;
      console.log('TrafficChartCtrl:: pie loading.... NOW!', pieData);
      var ctx = document.getElementById("chart-area").getContext("2d");
      window.myPie = new Chart(ctx, config);
    };

    socket.socket.on('update:ownershipMap', loadPie);
    unsubscribers.push( 'update:ownershipMap' );
    listeners.push( loadPie);

    $scope.$on('$destroy', function(){
      for (var i in unsubscribers){
        socket.socket.removeListener(unsubscribers[i], listeners[i]);
      }
    });

    socket.socket.emit('getOwnershipMap', $stateParams.uid);
  }
})();
