jQuery.sharedCount = function(url, fn) {
	url = encodeURIComponent(url || location.href);
	var arg = {
		data: {
			url : url,
			apikey : "3cf8fcf612b51f448e41d579156aba6baac21107"
		},
		url: "//" + (location.protocol == "https:" ? "sharedcount.appspot" : "api.sharedcount") + ".com/",
		cache: true,
		dataType: "json"
	};
	if ('withCredentials' in new XMLHttpRequest) {
		arg.success = fn;
	}
	else {
		var cb = "sc_" + url.replace(/\W/g, '');
		window[cb] = fn;
		arg.jsonpCallback = cb;
		arg.dataType += "p";
	}
	return jQuery.ajax(arg);
};
jQuery(document).ready(function () {
		// New Items Counter START
		var headerCount = 0;
		jQuery('.countable').each(function () {
			var itemId = jQuery(this).attr('id');
			var itemsCount = jQuery(this).find('a').attr('data-count');
			var itemsCount = parseInt(itemsCount, 10);
			var storageValue = jQuery.jStorage.get(itemId); // Check if "storageValue" exists in the storage
			if(!storageValue && storageValue != 0){ // if not - assign current number of items
				storageValue = itemsCount;
				jQuery.jStorage.set(itemId,storageValue, {TTL: 86400000}); // and save it
			}
			var diff = itemsCount-storageValue;
			if (diff > 0) {
				jQuery(this).find('.ui-li-count').html(diff).removeClass('hidden');
			}else if (diff < 0) {
				jQuery.jStorage.set(itemId,itemsCount, {TTL: 86400000}); // reset value if items have been removed
			}
			headerCount = headerCount+diff;
		});
		if (headerCount > 0) {
			jQuery('.counter-header').html(headerCount).removeClass('hidden');
		}
		jQuery('.countable').on('click', function() {
			var strKey = jQuery(this).attr('id');
			var strValue = jQuery(this).find('a').attr('data-count');
			jQuery.jStorage.set(strKey,strValue, {TTL: 86400000}); // null the counter
		});
		// New Items Counter END
		// Share Counter START


		jQuery( 'body' ).on( "pagechange", function( event, ui ) {
			jQuery('.ui-content').on('click', '.alert', function(){
				jQuery(this).fadeOut();
			});

			// Validation END



			// New Items Counter START
			headerCount = 0;
			jQuery('.ui-page-active .countable').each(function () {
				var itemId = jQuery(this).attr('id');
				var itemsCount = jQuery(this).find('a').attr('data-count');
				var itemsCount = parseInt(itemsCount, 10);
				var currentCounter = jQuery.jStorage.get(itemId);
				currentCounter = parseInt(currentCounter, 10);
				var diff = itemsCount-currentCounter;
				if (diff > 0) {
					jQuery(this).find('.ui-li-count').html(diff).removeClass('hidden');
				}else if (diff <= 0) {
					jQuery(this).find('.ui-li-count').html(diff).addClass('hidden');
				}
				headerCount = headerCount+diff;
			});
			if (headerCount > 0) {
				jQuery('.counter-header').html(headerCount).removeClass('hidden');
			}else{
				jQuery('.counter-header').html(headerCount).addClass('hidden');
			}

		});
});
