'use strict';

// The "Ad Inspector" view controller

angular.module('almaMainosgalleria')
.controller('InspectorCtrl',
function (
  $scope,
  $rootScope,
  $stateParams,
  $location,
  ContentService,
  AdInjectorService,
  AppConstants
) {
  // # Variables
  $scope.ad = null; // the ad object
  $scope.adStyles = {};
  $scope.adLoadingFailed = false;

  // These are used on the footer mailto:href
  $scope.contactEmail = AppConstants.sellerContactEmail;
  $scope.absUrl = $location.absUrl();

  // # Functions
  $scope.init = function() {

    $scope.ad = ContentService.getAd($stateParams.adName);

    if (!$scope.ad) {
      $location.path('/'); // ad not found, forward to root
    }
    else {
      // "announce" that we've found an ad
      $rootScope.$broadcast('inspector:ad-opened', $scope.ad.name);

      // Ask injector to load the ad
      AdInjectorService.injectAd($scope.ad, 'advertisement__wrapper')
      .then(function injectionDoneOrFailed(response) {
         if (response.status !== 'ad') {
            $scope.adLoadingFailed = true;
          }
          else {
            // all cool!
            $scope.adLoadingFailed = false;
          }
      });

      // If ad had width or height, add them to adStyles
      if ($scope.ad.width) {
        $scope.adStyles.width = $scope.ad.width;
      }
      if ($scope.ad.height) {
        $scope.adStyles.height = $scope.ad.height;
      }

      document.documentElement.scrollTop = 0;
      document.getElementById('main-container').scrollTop = 0;

    }
  };

  $scope.notSorted = function(obj){
    if (!obj) {
      return [];
    }
    return Object.keys(obj);
  };
});
