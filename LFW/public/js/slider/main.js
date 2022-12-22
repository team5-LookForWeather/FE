(function($){
	//==================================================*
	//	Document:Ready
	//==================================================*
	$(document).ready(function(){
		//MainSlider
		var mainSliderThumb = new Swiper(".MainSliderThumb-container", {
			observer: true,
			observeParents: true,
			watchOverflow: true,
			slidesPerView: 1,
			speed:800,
			loop: true,
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			pagination: {
			  el: ".swiper-pagination",
			  type: "fraction",
			},
			navigation: {
			  nextEl: ".MainSliderMeta-next",
			  prevEl: ".MainSliderMeta-prev",
			},
			on: {
			  init: function init() {
				$('.MainSliderMetaPaging-bar').addClass('is-StartVoid');
			  },
			  
			  slideChange:function(){
				$('.MainSliderMetaPaging-bar').removeClass('is-StartVoid');
				$('.MainSliderMetaPaging-bar').removeClass('is-Start');
				$('.MainSliderMetaPaging-bar').outerWidth();
				$('.MainSliderMetaPaging-bar').addClass('is-Start');
			  }
			}
		});
		
		var mainSliderText = new Swiper(".MainSliderText-container", {
			observer: true,
			observeParents: true,
			watchOverflow: true,
			slidesPerView: 1,
			loop: true,
			effect: "fade",
		});
		
		mainSliderThumb.controller.control = mainSliderText;
		mainSliderText.controller.control = mainSliderThumb;
		
		$(".MainSliderMetaAuto-pause").click(function(){
			mainSliderThumb.autoplay.stop();
			$('.MainSliderMeta').addClass('is-Stop');
			$('.MainSliderMeta').removeClass('is-Play');
		});
		
		$(".MainSliderMetaAuto-play").click(function(){
			mainSliderThumb.autoplay.start();
			$('.MainSliderMeta').addClass('is-Play');
			$('.MainSliderMeta').removeClass('is-Stop');
			$('.MainSliderMetaPaging-bar').removeClass('is-StartVoid');
			$('.MainSliderMetaPaging-bar').removeClass('is-Start');
			$('.MainSliderMetaPaging-bar').outerWidth();
			$('.MainSliderMetaPaging-bar').addClass('is-StartVoid');
		});
		
		 //Main Event
		 if($('.MainNewsList').length > 0){
			MainNewsListSection = new Swiper('.MainNewsList ', {            
				observer: true,
				observeParents: true,
				watchOverflow: true,
				slidesPerView: 4,
				navigation: {
				  nextEl: ".MainNewsArrow-next",
				  prevEl: ".MainNewsArrow-prev",
				},
				breakpoints : {
				  1024 : {
					freeMode: true,
					slidesPerView: 'auto',
				  },
				},
			});     
		 }
		 
		 //Main Feed
		if($('.MainFeedList').length > 0){
			var ScrollSlideSection = undefined;
			function sectionSwiper() {
				var screenWidth = $(window).width();
				if(screenWidth < 768 && ScrollSlideSection == undefined) {            
					ScrollSlideSection = new Swiper('.MainFeedList', {            
						slidesPerView: "auto",
						freeMode: true,
						scrollbar: {
						  el: ".MainFeedList-scrollbar",
						  hide: true,
						},
					});
				} else if (screenWidth > 767 && ScrollSlideSection != undefined) {
					ScrollSlideSection.destroy();
					ScrollSlideSection = undefined;     
				}        
			}

			//Swiper plugin initialization
			sectionSwiper();

			//Swiper plugin initialization on window resize
			$(window).on('resize', function(){
				sectionSwiper();        
			});
		 }
	});
})(jQuery);





/* 아이콘 클릭 시 스크롤 다운 */
$(".scroll-icon").click(function() {
    $('html,body').animate({
        scrollTop: $("#cody").offset().top},
        700);
});



