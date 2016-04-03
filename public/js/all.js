(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderDirective = HeaderDirective;
function HeaderDirective() {
  'ngInject';

  var directive = {
    restrict: "E",
    templateUrl: 'layouts/header'
  };
  return directive;
}

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HomeController = exports.HomeController = ["$scope", function HomeController($scope) {
  'ngInject';

  _classCallCheck(this, HomeController);
}];

},{}],3:[function(require,module,exports){
'use strict';

var _index = require('./index.route');

var _home = require('./controller/home.controller');

var _header = require('./component/header.directive');

// start apps
angular.module('WeInternship', ['ui.router']).config(_index.routerConfig).directive('header', _header.HeaderDirective).controller('HomeController', _home.HomeController);

},{"./component/header.directive":1,"./controller/home.controller":2,"./index.route":4}],4:[function(require,module,exports){
'use strict';

routerConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routerConfig = routerConfig;
function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider.state('home', {
    url: '/',
    controller: 'HomeController',
    templateUrl: 'templates/home',
    controllerAs: 'ctrl'
  });
  $urlRouterProvider.otherwise('/');
}

},{}]},{},[3]);
