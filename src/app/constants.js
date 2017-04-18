'use strict';

// Collection about various constants used in different parts of the application
angular.module('almaMainosgalleria')
.constant('AppConstants', {
  appTitle: 'Mainosgalleria',

  madsPId: '5479789835',

  adDefaultSize: {
    // default size for iframe-ads, in pixels
    // this will be overriden if the ad object itself has width and height
    width: 300,
    height: 300
  },

  sellerContactEmail: 'verkkomainonta@almamedia.fi'
});
