/*jslint vars: true, devel:true, nomen: true, node: true, indent: 2, maxerr: 50*/
/*global describe, it, angular, io, Audio*/
'use strict';

(function () {

  var app = angular.module("shazamApp");

  function ShazamController($scope) {
    //Heroku instance that is live;
    var socket = io("https://secure-citadel-7581.herokuapp.com/");
    // var socket = io("http://localhost:8080");


    var shazamMsg = {
      location: "websiteApp"
    };

    $scope.appState = {};
    $scope.imgUrl = "";
    $scope.imgSrc = "";
    $scope.shazam = function () {
      // console.log("Emiitted Shazam");
      socket.emit("Shazam!", shazamMsg);
    };

    function onRefresh(newState) {
      $scope.$apply(function () {
        // console.log("Refresh called @" + new Date());
        var lastLocation = newState.lastEventSource;

        //Copy the app state
        $scope.appState = newState;

        // console.log($scope.appState[lastLocation]);
        // //Set the image to be displayed
        if ($scope.appState.isBilly) {
          $scope.imgUrl = $scope.appState[lastLocation].billyImg;
          $scope.imgSrc = $scope.appState[lastLocation].billySrc;
        } else {
          $scope.imgUrl = $scope.appState[lastLocation].shazamImg;
          $scope.imgSrc = $scope.appState[lastLocation].shazamSrc;
        }
        // console.log($scope.appState);
        // console.log($scope.imgUrl);
        // console.log($scope.imgSrc);
      });
    }

    function onTransform(newState) {

        var audio = new Audio("assets/shazam.transform.mp3");
        audio.play();
        // console.log("Transform called @" + new Date());
        // console.log(newState);
        onRefresh(newState);
        //Flicker Screen

    }

    socket.on("Refresh!", onRefresh);
    socket.on("Transform!", onTransform);
    socket.emit("Who am I?");
  }

  app.controller('shazam.controller', ["$scope", ShazamController]);
}());
