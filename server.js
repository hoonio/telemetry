// Define routes for simple SSJS web app.
// Writes Coinbase orders to database.
var express = require('express')
  , fs      = require('fs')
  , http    = require('http')
  , https   = require('https')
  , autobahn = require('autobahn');

var app = express();
app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname + '/'));

app.get('/', function(request, response) {
  var data = fs.readFileSync('index.html').toString();
  response.send(data);
});

http.createServer(app).listen(app.get('port'), function() {
  console.log("Listening on " + app.get('port'));
});

var connection = new autobahn.Connection({
         url: 'ws://ec2-54-228-248-101.eu-west-1.compute.amazonaws.com:8888/telemetry/',
         realm: 'realm1'
      });
//
// connection.onopen = function (session) {
//   console.log('function executed')
//    // 1) subscribe to a topic
//    function onevent(args) {
//       console.log("Event:", args[0]);
//    }
//    session.subscribe('com.myapp.hello', onevent);
//
//    // 2) publish an event
//    session.publish('com.myapp.hello', ['Hello, world!']);
//
//    // 4) call a remote procedure
//    session.call('com.myapp.add2', [2, 3]).then(
//       function (res) {
//          console.log("Result:", res);
//       }
//    );
// };
//
// console.log('making connection')
// connection.open();
