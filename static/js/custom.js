jQuery(document).ready(function () {
    jQuery( 'body' ).on( "pagechange", function( event, ui ) {
        jQuery('.ui-content').on('click', '.alert', function(){
            jQuery(this).fadeOut();
        });

        jQuery('.menu-btn-background').removeClass('accent-color');

    });
    jQuery( document ).on( "panelopen", "#left_panel", function( event, ui ) {
        jQuery('.menu-btn-background').addClass('accent-color');
    });
    jQuery( 'body' ).on( "panelclose", "#left_panel", function( event, ui ) {
        jQuery('.menu-btn-background').removeClass('accent-color');
    });
    jQuery( document ).on( "panelopen", "#right_panel", function( event, ui ) {
        jQuery('.share-btn-background').addClass('accent-color');
    });
    jQuery( 'body' ).on( "panelclose", "#right_panel",  function( event, ui ) {
        jQuery('.share-btn-background').removeClass('accent-color');
    });
});