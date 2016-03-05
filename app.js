var dashboard = angular.module('dashboard', []);

dashboard.controller('Ctrl', ['$scope', '$timeout',
  function($scope, $timeout) {
    $scope.name = "Aircraft dashboard";

    $scope.values = {
      "control": {
        "landing_gear": 0,
        "flaps": 0
      },
      "telemetry": {
        "altitude": 0,
        "airspeed": 0
      }
    };
    $scope.connection = 0; // 0 connecting, 1 online, 2 offline
    $scope.messages = [];
    // When we see a new msg event from the server
    // socket.on('new:msg', function(message) {
    //   $scope.messages.push(message);
    // });
    // Tell the server there is a new message
    $scope.connect = function() {
    // socket.init();
      wsUri = 'ws://ec2-54-228-248-101.eu-west-1.compute.amazonaws.com:8888/telemetry';
      websocket = new WebSocket(wsUri);
      console.log('connect to websocket');
      $scope.connection = 0;
      websocket.onmessage = function(evt){
        // console.log('message received: ' + $scope.messages);
        // $scope.messages.push(evt.data);
        updateValues(evt.data);
      }
    };

    function updateValues(newData) {
      console.log('write data: '+ newData)
      if (newData == 'hello, world'){
        $scope.name = 'Connection established';
        $scope.connection = 1;
      }
      else if (newData == 'The quick jet plane jetwashed my lazy prop'){
        $scope.name = 'The quick jet plane jetwashed my lazy prop'
        $scope.connection = 2;
      }
      else {
        $scope.values = JSON.parse(newData);
      }
      $scope.$apply();
    }

    $timeout($scope.connect(), 10000);

}]);

dashboard.factory('socket', function ($rootScope) {
  var wsUri = 'ws://ec2-54-228-248-101.eu-west-1.compute.amazonaws.com:8888/telemetry';
  // var socket = io.connect(' ws://ec2-54-228-248-101.eu-west-1.compute.amazonaws.com:8888/telemetry');
  return {
    init: function() {
      websocket = new WebSocket(wsUri);
      websocket.onmessage = function(evt) { this.update(evt) };
      // socket.on(eventName, function() {
      //   var args = arguments;
      //   $rootScope.$apply(function() {
      //     callback.apply(socket, args);
      //   });
      // });
    },
    update: function(evt) {
      console.log('message received: ' + evt.data);
      $scope.messages.push(evt.data);

      // socket.emit(eventName, data, function() {
      //   var args = arguments;
      //   $rootScope.$apply(function() {
      //     if (callback) {
      //       callback.apply(socket, args);
      //     }
      //   });
      // })
    }
  };
});
