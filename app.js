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
    $scope.altitude = [0,0,0,0] // track count, total, min, max
    $scope.airspeed = [0,0,0,0] // track count, total, min, max
    $scope.connection = 2; // 0 connecting, 1 online, 2 offline
    $scope.flapsStyle = {'margin-left':0};

    $scope.connect = () => {
    // socket.init();
      wsUri = 'ws://ec2-54-228-248-101.eu-west-1.compute.amazonaws.com:8888/telemetry';
      websocket = new WebSocket(wsUri);
      console.log('connect to websocket');
      $scope.connection = 0;
      websocket.onmessage = function(evt){
        updateValues(evt.data);
      }
    };

    updateValues = (newData) => {
      // console.log('write data: '+ newData)
      if (newData == 'hello, world'){
        $scope.name = 'Connection established';
        $scope.connection = 0;
      }
      else if (newData == 'The quick jet plane jetwashed my lazy prop'){
        $scope.name = 'The quick jet plane jetwashed my lazy prop'
        $scope.connection = 2;
      }
      else {
        $scope.connection = 1;
        $scope.values = JSON.parse(newData);
        if ($scope.altitude[0] == 0){
          $scope.airspeed[2] = JSON.parse(newData).telemetry.airspeed; // a small hack to record minimum speed without complicating the logic
        }
        updateStat($scope.values.telemetry.altitude,$scope.altitude);
        updateStat($scope.values.telemetry.airspeed,$scope.airspeed);
        $scope.flapsStyle = {'margin-left': 23*$scope.values.control.flaps + 'px'};
        $scope.speedNeedleStyle = {'transform': 'rotate('+$scope.values.telemetry.airspeed*360/500+'deg)'}
        $scope.altitudeSmallNeedleStyle = {'transform': 'rotate('+$scope.values.telemetry.altitude*360/1000+'deg)'}
        $scope.altitudeBigNeedleStyle = {'transform': 'rotate('+($scope.values.telemetry.altitude%1000)*360/100+'deg)'}
        // redrawNeedle('speed-needle',$scope.values.telemetry.airspeed);
      }
      $scope.$apply();
    }

    updateStat = (newInput, history) => {
      // could record each data point, but only need average, min, max, so only keeping the count and total
      history[0]++;
      history[1]+=newInput;
      if (newInput<history[2]) { history[2]=newInput; }
      if (newInput>history[3]) { history[3]=newInput; }
    }

    $timeout($scope.connect(), 10000);

}]);
