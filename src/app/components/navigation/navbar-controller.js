'use strict';

angular.module('almaMainosgalleria')
.controller('NavigationCtrl', function ($rootScope, $scope, ContentService) {

  $scope.adLinks = ContentService.getAdsList();

  $rootScope.$on('inspector:ad-opened', function(event, adName) {
    $rootScope.headerTitle = adName;
  });

  $scope.notSorted = function(obj) {
    if (!obj) {
      return [];
    }
    return Object.keys(obj);
  };
});
