/*!
 * Yeshiva Open House
 * Yeshiva Open House
 *
 * @author Yeshiva University
 * @version 1.1.0
 * Copyright 2014.  licensed.
 */
(function ($) {

  'use strict';

  /* globals Dragdealer, skrollr, getCookie */

  var $container = $('.content-body').imagesLoaded( function() {
    $container.isotope({
      itemSelector: '.item',
      layoutMode: 'packery',
      packery: {
        isHorizontal: true,
        gutter: 10
      }
    });

    // Main Scrolling Photoslider

    var availWidth = $('.content-body').outerWidth() -
                      $('.content-mask').outerWidth();
    new Dragdealer('content-scroller', {
      horizontal: true,
      vertical: false,
      animationCallback: function(x) {
        $('.content-body').css('margin-left', -x * availWidth);
      }
    });

    // Scrolling SVG Line

    skrollr.init({
      edgeStrategy: 'set',
      forceHeight: false,
      easing: {
        WTF: Math.random,
        inverted: function(p) {
          return 1-p;
        }
      },
      render: function(data) {
        //Log the current scroll position.
        console.log(data.curTop);
      }
    });

    // Play Video only when visible

    var media = $('video').not('[autoplay="autoplay"]');
    var tolerancePixel = 40;

    function checkMedia(){
      // Get current browser top and bottom
      var scrollTop = $(window).scrollTop() + tolerancePixel;
      var scrollBottom = $(window).scrollTop() + $(window).height() - tolerancePixel;

      media.each(function() {
        var yTopMedia = $(this).offset().top;
        var yBottomMedia = $(this).height() + yTopMedia;

        if(scrollTop < yBottomMedia && scrollBottom > yTopMedia){
          $(this).get(0).play();
        } else {
          $(this).get(0).pause();
        }
      });
    }
    $(document).on('scroll', checkMedia);
  });

  // Checkmarks

  var cookieUtils,
  escape,
  unescape;

  cookieUtils = {
    getCookie: function (name) {
      var start = document.cookie.indexOf(name + '=');
      var len = start + name.length + 1;
      if ((!start) && (name !== document.cookie.substring(0, name.length))) {
        return null;
      }
      if (start === -1) { return null; }
      var end = document.cookie.indexOf(';', len);
      if (end === -1) { end = document.cookie.length;}
      return unescape(document.cookie.substring(len, end));
    },
    setCookie: function (name, value, expires, path, domain, secure) {
      var today = new Date();
      today.setTime(today.getTime());
      if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
      }
      var expiresDate = new Date(today.getTime() + (expires));
      document.cookie = name + '=' + escape(value) +
          ((expires) ? ';expires=' + expiresDate.toGMTString() : '') + //expires.toGMTString()
      ((path) ? ';path=' + path : '') +
      ((domain) ? ';domain=' + domain : '') +
      ((secure) ? ';secure' : '');
    },
    deleteCookie: function (name, path, domain) {
      if (getCookie(name)) {
        document.cookie = name + '=' +
          ((path) ? ';path=' + path : '') +
          ((domain) ? ';domain=' + domain : '') + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
      }
    }
  };

  var $checkmarks = $('.checklist li');

  $($checkmarks).each(function() {
    $(this).on('click', function(){
      $(this).toggleClass('checked');
      console.log('checked');
      cookieUtils.setCookie('yeshivaChecklist', new Date(), 'complementstudioreview.com/yeshiva/discovery-pathways/' );
    });
  });


})(jQuery);
