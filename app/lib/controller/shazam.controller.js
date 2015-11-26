/*jslint vars: true, devel:true, nomen: true, node: true, indent: 2, maxerr: 50*/
/*global describe, it, angular*/
'use strict';

(function () {

  var app = angular.module("shazamApp");

  function ShazamController($scope, shazamSocket) {

    var WEBSITEAPP = "WebsiteApp",
      shazamMsg = {
        location: WEBSITEAPP
      };


    $scope.appState = {};
    $scope.imgUrl = "";
    $scope.imgSrc = "";
    $scope.shazam = function () {
      console.log("Emiitted Shazam");
      shazamSocket.emit("Shazam!", shazamMsg);
    };


    function onRefresh(newState) {
      console.log("Refresh called.");
      var lastLocation = newState.lastEventSource;
      console.log(lastLocation);
      //Copy the app state
      $scope.appState = newState;
      console.log($scope.appState);
      // console.log($scope.appState[lastLocation]);
      // //Set the image to be displayed
      if ($scope.appState.isBilly) {
        $scope.imgUrl = $scope.appState[lastLocation].billyImg;
        $scope.imgSrc = $scope.appState[lastLocation].billySrc;
      } else {
        $scope.imgUrl = $scope.appState[lastLocation].shazamImg;
        $scope.imgSrc = $scope.appState[lastLocation].shazamSrc;
      }
    }

    function onTransform(newState) {
      console.log("Transform called.");
      // console.log(newState);
      onRefresh(newState);
      //Flicker Screen
    }

    shazamSocket.on("Refresh!", onRefresh);
    shazamSocket.on("Transform!", onTransform);
    shazamSocket.emit("WhatAmI!");
  }

  app.controller('shazam.controller', ["$scope", "shazamSocket", ShazamController]);
}());
