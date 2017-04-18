'use strict';

angular.module('almaMainosgalleria')
.factory('ContentService', function (_) {
  /* jshint browser:true */

  var service = {};

  var AdvertisementsData = window.almaAdData; // ad-data.js is loaded in here on index.html

  // Get listing of ads, grouped by type
  service.getAdsList = function() {
    var list = [];

    _.map(AdvertisementsData, function(adObj) {
      list.push(_.pick(adObj, ['name', 'category']));
    });

    list = _.groupBy(list, 'category');

    return list;
  };

  // Get one ad info
  service.getAd = function(adName) {
    return _.find(AdvertisementsData, 'name', adName);
  };

  return service;
});
