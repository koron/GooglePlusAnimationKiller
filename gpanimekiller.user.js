// ==UserScript==
// @name Google+ GIF Animation Killer
// @author KoRoN
// @version 1.1
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
        installController(img, src, newsrc);
      }
    }
  }

  function installController(img, runSrc, stopSrc) {
    // Build and install DOM elemennts.

    var ctrl = document.createElement('div');
    ctrl.style.display = 'inline';
    ctrl.style.padding = '4px';
    ctrl.style.backgroundColor = '#ccc';
    ctrl.style.position = 'absolute';
    ctrl.style.bottom = '0px';
    ctrl.style.right = '0px';
    ctrl.style.fontSize = '6px';
    img.parentNode.appendChild(ctrl);

    var start = document.createElement('a');
    start.innerText = 'Start';
    ctrl.appendChild(start);

    var stop = document.createElement('a');
    stop.innerText = 'Stop';
    stop.style.display = 'none';
    ctrl.appendChild(stop);

    // Install events.

    ctrl.onmousedown = function(e) { e.cancelBubble = true; }
    ctrl.onmouseup = function(e) { e.cancelBubble = true; }

    start.onclick = function(e) {
      start.style.display = 'none';
      stop.style.display = 'inline';
      img.src = runSrc;
    };

    stop.onclick = function(e) {
      stop.style.display = 'none';
      start.style.display = 'inline';
      img.src = stopSrc;
    };
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
