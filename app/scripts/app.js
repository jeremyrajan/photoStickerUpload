'use strict';

/**
 * @ngdoc overview
 * @name photoStickerAppApp
 * @description
 * # photoStickerAppApp
 *
 * Main module of the application.
 */
angular
  .module('photoStickerAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
