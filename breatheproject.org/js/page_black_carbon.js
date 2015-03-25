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

jQuery(function() {
  // Deal with stupid mobile rubberband effect (iOS, etc) when pulling a page up/down at the end points
  jQuery("#container").on('touchmove', function(e){
    e.preventDefault();
    e.stopPropagation();
  });
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
