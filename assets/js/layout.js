var timerBanner = null;
$(document).ready(function() {
	initiateBanner();
	
	//parallax begin
	$('.parallax').each(function(){
	  var img = $(this);
	  var imgParent = $(this).parent();
	  function parallaxImg () {
		var speed = img.data('speed');
		var imgY = imgParent.offset().top;
		var winY = $(this).scrollTop();
		var winH = $(this).height();
		var parentH = imgParent.innerHeight();

		// The next pixel to show on screen      
		var winBottom = winY + winH;
		// If block is shown on screen
		if (winBottom > imgY && winY < imgY + parentH) {		
		  // Number of pixels shown after block appear	  
		  var imgBottom = ((winBottom - imgY) * speed);
		  // Max number of pixels until block disappear		  
		  var imgTop = winH + parentH;
		  // Porcentage between start showing until disappearing
		  var imgPercent = ((imgBottom / imgTop) * 100) + (50 - (speed * 50));
		}
		imgPercent = (imgPercent - 50);
		img.css('margin-top', '-' + imgPercent + '%');
	  }
	  $(document).on({
		scroll: function () {
		  parallaxImg();
		}, ready: function () {
		  parallaxImg();
		}
	  });
	});
	//parallax end
	
});

$( window ).resize(function() {
  checkBanner();//hack to fix eventual broken banner
});

//top menu functions//
$(document).on({
	scroll: function () {
		menuTopCheck();
	}, ready: function () {
		showBanner(0);
		checkBanner();
	}
});
function menuTopCheck(){
	var header = $('#header');
	var bannerMainHeight = $('#bannerMain').innerHeight();
	var windowScroll = $(window).scrollTop();
	if (windowScroll > bannerMainHeight){
		header.attr('class', 'menuFixed');
	}else{
		header.removeAttr('class');
	}
}

// banner functions begin //
function initiateBanner(){
	$('#bannerMain .bannerItem').fadeTo(0, 0);
	$('#bannerMain ul li').click(function(e){
		e.preventDefault();
		$('#bannerMain ul li').attr('class', '');
		$(this).attr('class', 'active');
		var bannerIndex = $('#bannerMain ul li').index($(this));
		showBanner(bannerIndex);
	});
	$('#bannerMain ul li').eq(0).attr('class', 'active');
	showBanner(0);	
}

function showBanner(position){
	var bannerMain = $('#bannerMain');
	var bannerItem = bannerMain.find('.bannerItem');
	bannerItem.not(':eq(' + position + ')').fadeTo(500, 0, function(){
		$(this).css('z-index', 9);//hack to allow cursor selection
	});
	bannerItem.eq(position).fadeTo(500, 1, function (){
		$(this).css('z-index', 10);//hack to allow cursor selection
	});
}
function checkBanner(){
	clearTimeout(timerBanner);
	timerBanner = setTimeout(function(){//timeout to hack DOM render
		var bannerMain = $('#bannerMain');	
		var bannerMainHeight = bannerMain.innerHeight();
		var bannerItemHeight = bannerMain.find('.bannerItem img').innerHeight();
		if (bannerItemHeight < bannerMainHeight){		
			bannerMain.removeAttr('class');
			bannerMain.css('height', bannerItemHeight + 'px');
		}else{
			bannerMain.attr('class', 'fullPage');
			bannerMain.css('height', 'auto');
		}
	}, 500);
}