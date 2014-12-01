/*!
 * Yeshiva Open House
 * Yeshiva Open House
 *
 * @author Yeshiva University
 * @version 1.1.0
 * Copyright 2014.  licensed.
 */

/*jshint -W108 */
/*jshint -W109 */

(function ($) {

  'use strict';

  /* Floating Nav */

  /**
     * This part does the "fixed navigation after scroll" functionality
     * We use the jQuery function scroll() to recalculate our variables as the
     * page is scrolled/
     */
  $(window).scroll(function(){
    var windowTop = $(window).scrollTop() + 120; // the "12" should equal the margin-top value for nav.stick
    var divTop = $('#nav-anchor').offset().top;

    if (windowTop > divTop) {
      $('nav').addClass('stick');
    } else {
      $('nav').removeClass('stick');
    }
  });

  /**
   * This part causes smooth scrolling using scrollto.js
   * We target all a tags inside the nav, and apply the scrollto.js to it.
   */
  $('nav a').click(function(evn){
    evn.preventDefault();
    $('html,body').scrollTo(this.hash, this.hash);
  });

  /**
   * This part handles the highlighting functionality.
   * We use the scroll functionality again, some array creation and
   * manipulation, class adding and class removing, and conditional testing
   */
  var aChildren = $('nav li').children(); // find the a children of the list items
  var aArray = []; // create the empty aArray
  for (var i=0; i < aChildren.length; i++) {
    var aChild = aChildren[i];
    var ahref = $(aChild).attr('href');
    aArray.push(ahref);
  } // this for loop fills the aArray with attribute href values

  $(window).scroll(function(){
    var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
    var windowHeight = $(window).height(); // get the height of the window
    var docHeight = $(document).height();

    for (var i=0; i < aArray.length; i++) {
      var theID = aArray[i];
      var divPos = $(theID).offset().top; // get the offset of the div from the top of page
      var divHeight = $(theID).height(); // get the height of the div in question
      if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
        $("a[href='" + theID + "']").addClass('nav-active');
      } else {
        $("a[href='" + theID + "']").removeClass('nav-active');
      }
    }

    if(windowPos + windowHeight === docHeight) {
      if (!$('nav li:last-child a').hasClass('nav-active')) {
        var navActiveCurrent = $('.nav-active').attr('href');
        $("a[href='" + navActiveCurrent + "']").removeClass('nav-active');
        $('nav li:last-child a').addClass('nav-active');
      }
    }
  });

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
      /*render: function(data) {
        //Log the current scroll position.
        console.log(data.curTop);
      }*/
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

  // Set Cookie

  $($checkmarks).each(function(index) {
    var checked = 'checked',
    checkedItems = [
      {'test': 'Matt'}
    ],
    jsonChecklist = JSON.stringify(checkedItems);

    $(this).on('click', function(){
      $(this).toggleClass('checked');
      checkedItems.push({'id':index, 'checked':checked});
      console.log(jsonChecklist);
      $.cookie('yeshivaChecklist', jsonChecklist, { expires: 7 });
    });
  });


})(jQuery);
