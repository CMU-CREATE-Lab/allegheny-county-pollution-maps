var $iframe = jQuery("#black-carbon");
var $window = jQuery(window);
var iframeRootUrl = $iframe.attr("src");
var iframeOrigin = iframeRootUrl.substring(0, iframeRootUrl.lastIndexOf('/'));
var hashVar = window.location.hash;
var iframeUrl = hashVar ? iframeRootUrl + hashVar : iframeRootUrl;
$iframe.attr("src", iframeUrl);
var originalIframeHeight = $iframe.height();
var wideScreen = true;

function resizeBreathecamContainer() {
  var viewerContainer = jQuery(".col-3")[0];
  var referenceContainer = jQuery("#footer")[0];
  viewerContainer.style.width = document.body.offsetWidth + "px";
  viewerContainer.style.marginLeft = (-1 * referenceContainer.getBoundingClientRect().left) + "px";
  $iframe[0].height = (jQuery(window).height() - (jQuery("#breathe-cam-container").offset().top)) + "px";
}

function isMobile() {
  var navAgent = navigator.userAgent;
  return (navAgent.match(/Android/i) || navAgent.match(/webOS/i) || navAgent.match(/iPhone/i) || navAgent.match(/iPad/i) || navAgent.match(/iPod/i) || navAgent.match(/BlackBerry/i) || navAgent.match(/Windows Phone/i) || navAgent.match(/Opera Mini/i) || navAgent.match(/IEMobile/i));
}

$window.resize(function() {
  resizeBreathecamContainer();
});

$window.on("orientationchange",function(){
  resizeBreathecamContainer();
});

// Deal with stupid mobile rubberband effect (iOS, etc) when pulling a page up/down
(function($){
  "use strict";

  var startY;

  var defaults = {
    "$these": [],
    "touchstartInit": false,
    "touchmoveInit": false
  };

  $(".nonbounce").each(function() {
    defaults.$these.push($(this));
  });

  var initTouchHandling = function() {
    if (!defaults.touchstartInit) {
      defaults.touchstartInit = true;
      $(window).on("touchstart", touchstart);
    }

    if (!defaults.touchmoveInit) {
      defaults.touchmoveInit = true;
      $(window).on("touchmove", touchmove);
    }
  };

  var compareElem = function($elem, i, target) {
    return !!$(target).closest($elem).length;
  };

  var hasCorrectBounds = function(evt) {
    var y = (evt.originalEvent.touches) ? evt.originalEvent.touches[0].screenY : evt.originalEvent.screenY;
    var nonbounce = $(evt.target).closest(".nonbounce")[0];
    if (!nonbounce) {
      return true;
    }
    // Prevents scrolling of content to top
    if (nonbounce.scrollTop === 0 && startY <= y) {
      return false;
    }
    // Prevents scrolling of content to bottom
    if (nonbounce.scrollHeight-nonbounce.offsetHeight === nonbounce.scrollTop && startY >= y) {
      return false;
    }
    return true;
  };

  var touchstart = function(evt) {
    evt = evt.originalEvent || evt;
    startY = (evt.touches) ? evt.touches[0].screenY : evt.screenY;
  };

  var touchmove = function(evt) {
    if (!(evt.originalEvent.touches && evt.originalEvent.touches.length > 1)) {
      // Prevents scrolling of all but the nonbounce elements
      if (!~$.inArray(true, $.map(defaults.$these, compareElem, evt.target))) {
        evt.preventDefault();
      }
      // Prevents scrolling of nonbounce element if bound conditions are met
      if (!hasCorrectBounds(evt)) {
        evt.preventDefault();
      }
    }
  };

  $.fn.nonbounce = function() {
    initTouchHandling();
    return this.each(function() {
      defaults.$these.push($(this));
    });
  };

  $.nonbounce = function() {
    initTouchHandling();
  };
})(jQuery);

jQuery(function() {
  jQuery("body, #black-carbon, #breathe-cam-container, .content-block-breathe-cam, .gray-area-breathe-cam").addClass("nonbounce");
  jQuery.nonbounce();
  if (isMobile()) {
    jQuery("#share").hide();
    jQuery("#navhash").remove();
    jQuery("#navbar").css("top", "-21px");
    jQuery("#breathe-meter-top").css("padding-top", "6px");
  } else {
    jQuery("#share").hide();
    jQuery("#navbar").css("top", "-8px");
    jQuery("#breathe-meter-top").css("padding-top", "32px");
  }
  jQuery("#heinz-links").hide();
  resizeBreathecamContainer();
});
