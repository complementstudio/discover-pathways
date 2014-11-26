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

  /* globals Dragdealer, skrollr */

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

  var $checkmarks = $('.checklist li');

  $($checkmarks).each(function() {
    $(this).on('click', function(){
      $(this).toggleClass('checked');
    });
  });


})(jQuery);