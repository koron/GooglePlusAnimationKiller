// ==UserScript==
// @name Google+ GIF Animation Killer
// @author KoRoN
// @version Tue, 05 Jul 2011
// @namespace https://www.kaoriya.net/qb/gpanimekiller
// @description Do you hate GIF animation? Stop it now!
// @include https://plus.google.com/*
// @match https://plus.google.com/*
// ==/UserScript==

(function() {

  function hasClass(elem, clazz) {
    if (elem.className) {
      var zz = elem.className.split(/\s+/g);
      for (var m = 0; m < zz.length; m++) {
        if (zz[m] == clazz) return true;
      }
    }
    return false;
  }

  function addClass(elem, clazz) {
    if (elem.className) {
      elem.className += ' ' + clazz;
    } else {
      elem['className'] = clazz;
    }
  }

  function stopGIF(img) {
    var src = img.src;
    if (src && src.match(/\/\/.*\.googleusercontent\.com\//)) {
      // Swap image
      var newsrc = src.replace(/\/w(\d+)\//, function(str,w) {
          return '/w' + (w - 1) + '/';
      });
      if (newsrc != src) {
        img.src = newsrc;
      }
    }
  }

  function stopAllGIFAnimation() {
    var elems = document.getElementsByTagName('img');
    for (var i = 0, I = elems.length; i < I; ++i) {
      var img = elems[i];
      if (img.src.match(/\.gif\b/i) && !hasClass(img, 'gpanimekiller')) {
        addClass(img, 'gpanimekiller');
        stopGIF(img);
      }
    }
  }

  window.setInterval(stopAllGIFAnimation, 1000);
})()

// vim:set ts=8 sts=2 sw=2 tw=0 et:
