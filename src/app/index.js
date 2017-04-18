'use strict';
/*jslint browser: true*/

// # "Angularify" stuff we are fetching through global scope
//
var lodash = angular.module('lodash', []);
lodash.factory('_', function() {
  return window._; //Underscore must already be loaded on the page
});

var madsLibrary = angular.module('MADS', []);
madsLibrary.factory('MADS', function () {
  return window.MADSAdrequest;
});


angular.module('almaMainosgalleria', [
  'ngAnimate',
  'ngTouch',
  'ui.router',
  'mm.foundation',
  'lodash',
  'MADS'
])
.config(function ($stateProvider, $urlRouterProvider, AppConstants, $uiViewScrollProvider) {

  // # Routes
  $stateProvider
  .state('landing', {
    url: '/',
    templateUrl: 'app/components/landing/landing.html',
    title: AppConstants.appTitle
  })
  .state('inspector', {
    url: '/mainos/:adName',
    templateUrl: 'app/components/inspector/inspector.html',
    controller: 'InspectorCtrl'
  })
  .state('yhteystiedot', {
    url: '/yhteystiedot',
    title: 'Yhteystiedot',
    templateUrl: 'app/components/yhteystiedot/yhteystiedot.html'
  });

  $urlRouterProvider.otherwise('/');


  // enable scroll top on ui-view state change
  $uiViewScrollProvider.useAnchorScroll();

})
.run(function OnRun($rootScope, AppConstants) {

    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      // Automatically scroll to top
      document.documentElement.scrollTop = 0;
      document.getElementById('main-container').scrollTop = 0;
      document.getElementById('canvas-wrap').scrollTop = 0;

      // Change page title based on state
      if (toState.title) {
        $rootScope.headerTitle = toState.title;
      }
      else {
        $rootScope.headerTitle = AppConstants.appTitle;
      }
    });
});
