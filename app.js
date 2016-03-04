var dashboard = angular.module('dashboard', []);

dashboard.controller('Ctrl', ['$scope', 'socket',
  function($scope, socket) {
    $scope.name = "Aircraft dashboard";

    $scope.message = '';
    $scope.messages = [];
    // When we see a new msg event from the server
    socket.on('new:msg', function(message) {
      $scope.messages.push(message);
    });
    // Tell the server there is a new message
    $scope.broadcast = function() {
      socket.emit('broadcast:msg', {
        message: $scope.message
      });
      $scope.messages.push($scope.message);
      $scope.message = '';
    };
}]);


dashboard.factory('socket', function ($rootScope) {
  var socket = io.connect('http://ec2-54-228-248-101.eu-west-1.compute.amazonaws.com:8888/telemetry');
  return {
    on: function(eventName, callback) {
      socket.on(eventName, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          callback.apply(socket, args);
        });
      });
    },
    emit: function(eventName, data, callback) {
      socket.emit(eventName, data, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});
