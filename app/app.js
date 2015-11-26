/*jslint vars: true, devel:true, nomen: true, node: true, indent: 2, maxerr: 50*/
/*global describe, it, angular, io*/
'use strict';

(function () {
  var shazamApp = angular.module('shazamApp', ['btford.socket-io']);

  shazamApp.factory('shazamSocket', function (socketFactory) {
    var myIoSocket = io.connect('http://localhost');

    var mySocket = socketFactory({
      ioSocket: myIoSocket
    });

    return mySocket;
  });
}());
