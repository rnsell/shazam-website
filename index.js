/*jslint vars: true, devel:true, nomen: true, node: true, indent: 2, maxerr: 50*/
/*global describe, it*/
'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);

var port = 3000;

app.use(express.static('app'));

app.get('/', function (req, res) {
  var options = {
    root: __dirname + '/app/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  res.sendFile('index.html', options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('Sent:', 'index.html');
    }
  });

});


http.listen(port, function () {
  console.log("Connected to port " + port);
});
