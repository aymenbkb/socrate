(function ($) {
    "use strict";

    // Spinner - Remove loading animation
    var spinner = function () {
        var $spinner = $('#spinner');
        if ($spinner.length > 0) {
            setTimeout(function () {
                $spinner.fadeOut(300, function() {
                    $(this).remove();
                });
            }, 500);
        }
    };
    spinner();
    
    // Also ensure spinner is removed on window load
    $(window).on('load', function() {
        var $spinner = $('#spinner');
        if ($spinner.length > 0) {
            $spinner.fadeOut(300, function() {
                $(this).remove();
            });
        }
    });
    
    
    // Initiate the wowjs
    new WOW().init();

    // Navbar - Fixed positioning adjustment
    var navbarHeight = $('.navbar-sleek').outerHeight();
    $('html').css('scroll-padding-top', navbarHeight + 'px');

    // Navbar scroll effect
    $(window).scroll(function () {
        var navbar = $('.navbar-sleek');
        if ($(this).scrollTop() > 50) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
    });

    // Mobile menu toggle
    var menuBtn = $('#menuBtn');
    var navbarMenu = $('#navbarMenu');
    var navbarOverlay = $('#navbarOverlay');

    menuBtn.on('click', function() {
        menuBtn.toggleClass('active');
        navbarMenu.toggleClass('active');
        navbarOverlay.toggleClass('active');
        $('body').toggleClass('navbar-open');
    });

    // Close menu when overlay is clicked
    navbarOverlay.on('click', function() {
        menuBtn.removeClass('active');
        navbarMenu.removeClass('active');
        navbarOverlay.removeClass('active');
        $('body').removeClass('navbar-open');
    });

    // Close menu when a link is clicked
    $('.navbar-item').on('click', function() {
        menuBtn.removeClass('active');
        navbarMenu.removeClass('active');
        navbarOverlay.removeClass('active');
        $('body').removeClass('navbar-open');
    });

    // Smooth scrolling for nav links
    $('a[href^="#"]').on('click', function(e) {
        var href = $(this).attr('href');
        
        // Skip if it's not an anchor link to a section
        if (href === '#' || !$(href).length) {
            return;
        }
        
        e.preventDefault();
        
        var target = $(href);
        var offset = target.offset().top - navbarHeight - 20;
        
        $('html, body').animate({
            scrollTop: offset
        }, 800, 'easeInOutExpo');
    });
   
    // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        autoplayTimeout: 3000,
        smartSpeed: 1500,
        center: true,
        dots: true,
        loop: true,
        margin: 0,
        nav : true,
        navText: false,
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


     // Fact Counter
     $(document).ready(function(){
        $('.counter-value').each(function(){
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            },{
                duration: 2000,
                easing: 'easeInQuad',
                step: function (now){
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });

})(jQuery);

// Team Slider
var sliderTeam = (function(document, $) {
  
  'use strict';
  
  var $sliderTeams = $('.slider--teams'),
      $list = $('#list'),
      $listItems = $('#list li'),
      $nItems = $listItems.length,
      $nView = 3,
      autoSlider,
      $current = 0,
      $isAuto = true,
      $acAuto = 3000,
      
      _init = function() {
        _initWidth();
        _eventInit();
      },
      
      _initWidth = function() {
        $list.css({
          'margin-left': ~~(100 / $nView) + '%',
          'width': ~~(100 * ($nItems / $nView)) + '%'
        });
        $listItems.css('width', 100 / $nItems + '%');
        $sliderTeams.css({ opacity: 1 });
      },
      
      _eventInit = function() {
        
        window.requestAnimFrame = (function() {
          return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(callback, element){
                window.setTimeout(callback, 1000 / 60);
              };
        })();

        window.requestInterval = function(fn, delay) {
            if( !window.requestAnimationFrame       && 
                !window.webkitRequestAnimationFrame && 
                !window.mozRequestAnimationFrame    && 
                !window.oRequestAnimationFrame      && 
                !window.msRequestAnimationFrame)
                    return window.setInterval(fn, delay);
            var start = new Date().getTime(),
            handle = new Object();

            function loop() {
                var current = new Date().getTime(),
                delta = current - start;
                if(delta >= delay) {
                    fn.call();
                    start = new Date().getTime();
                }
                handle.value = requestAnimFrame(loop);
            };
            handle.value = requestAnimFrame(loop);
            return handle;
        }

        window.clearRequestInterval = function(handle) {
            window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
            window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value)   :
            window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
            window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
            window.msCancelRequestAnimationFrame ? msCancelRequestAnimationFrame(handle.value) :
            clearInterval(handle);
        };
        
        $.each($listItems, function(i) {
          var $this = $(this);
          $this.on('touchstart click', function(e) {
            e.preventDefault();
            _stopMove(i);
            _moveIt($this, i);
          });
        });
        
        autoSlider = requestInterval(_autoMove, $acAuto);
      },
      
      _moveIt = function(obj, x) {
        
        var n = x;
        
        obj.find('figure').addClass('active');        
        $listItems.not(obj).find('figure').removeClass('active');
        
        $list.css({
          'transform': 'translateX(' + (-(100 / $nItems) * n) + '%) translateZ(0)',
          'transition': 'transform 1000ms cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        });
        
      },
      
      _autoMove = function(currentSlide) {
        if ($isAuto) { 
          $current = ~~(($current + 1) % $nItems);
        } else {
          $current = currentSlide;
        }
        _moveIt($listItems.eq($current), $current);
      },
      
      _stopMove = function(x) {
        clearRequestInterval(autoSlider);
        $isAuto = false;
        _autoMove(x);
      };
  
  return {
    init: _init
  };

})(document, jQuery);

$(window).on('load', function(){
  'use strict';
  if ($('#list').length > 0) {
    sliderTeam.init();
  }
});