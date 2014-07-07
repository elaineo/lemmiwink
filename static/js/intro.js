jQuery(document).ready(function () {

		jQuery('.ui-page-active .owl-carousel').addClass('owl-active');
		// Touch Slider START
		jQuery('.owl-active').owlCarousel({
			items: 3,
			itemsDesktop : [1000,3], // between 1000px and 901px
			itemsDesktopSmall : [900,2], // betweem 900px and 601px
			itemsTablet: [600,2], // between 600 and 0
			autoPlay: 10000
		});
		// Touch Slider END



		// Touch Gallery START
		if ( jQuery('.gallery').hasClass('gallery-active') ) {
			var myPhotoSwipe = jQuery(".gallery-active a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });
		}
		// Touch Gallery END

		jQuery( 'body' ).on( "pagebeforeload", function( event ) {
			jQuery('.ui-page-active .owl-carousel').removeClass('owl-active');
			jQuery('.gallery').removeClass('gallery-active');
		});
		jQuery( 'body' ).on( "pagechange", function( event, ui ) {
			jQuery('.ui-content').on('click', '.alert', function(){
				jQuery(this).fadeOut();
			});



        jQuery('.ui-page-active .owl-carousel').addClass('owl-active');
        if ( jQuery('.ui-page-active .owl-carousel').hasClass('owl-active') ) {
            // Touch Slider START
            jQuery('.ui-page-active .owl-active').owlCarousel({
                items: 3,
                itemsDesktop : [1000,3], // between 1000px and 901px
                itemsDesktopSmall : [900,2], // betweem 900px and 601px
                itemsTablet: [600,2], // between 600 and 0
                autoPlay: 10000
            });
            // Touch Slider END
        }
        if ( jQuery('.gallery').hasClass('gallery-active') ) {
            var myPhotoSwipe = jQuery(".gallery-active a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });
        }

		});
});
