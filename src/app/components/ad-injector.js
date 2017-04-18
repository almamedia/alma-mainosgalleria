'use strict';

// The "Ad Inspector" view controller

angular.module('almaMainosgalleria')
.factory('AdInjectorService', function($q, MADS, AppConstants) {
  /*jshint camelcase: false  */
  /*jshint browser:true */


  var service = {};

  // # Public functions
  //
  service.injectAd = function injectAd(ad, targetid) {

    return new $q(function (resolve) {

      if (ad.loadViaIframe) {
        _injectViaIframe(ad, targetid, resolve);
      }
      else {
        MADS.adrequest({
          async: true,
          element_id: targetid,
          pid: AppConstants.madsPId,
          fid: ad.madsId,

          callback: function(response) {
            resolve(response);
          }
        });
      }
    });
  };

  // # Internal functions
  var _injectViaIframe = function loadEasIframe(ad, targetId, resolve) {
    var adWrapper = document.getElementById(targetId);

    while (adWrapper.hasChildNodes()) {
      adWrapper.removeChild(adWrapper.lastChild);
    }

    var fif = document.createElement('iframe'); // "friendly iframe"

    fif.src = '/assets/alma-ads/ad-iframe.html';


    fif.style.width = (ad.width ? ad.width : AppConstants.adDefaultSize.width) + 'px';
    fif.style.height = (ad.height ? ad.height : AppConstants.adDefaultSize.width) + 'px';

    fif.style.margin = '0px';
    fif.style.borderWidth = '0px';
    fif.style.padding = '0px';
    fif.scrolling = 'no';
    fif.frameBorder = '0';
    fif.allowTransparency = 'true';

    fif.adId = ad.madsId;

    fif.callback = function(response) {
      resolve(response);
    };

    adWrapper.appendChild(fif);
  };




  return service;
});
