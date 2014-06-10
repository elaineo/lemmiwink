function geoFunc(data) {
    var locstr = data.address + ' ' + data.zip;
    var geocoder = new google.maps.Geocoder();
    // is it blank? 
    if (locstr == '') {
        alert('Invalid Address');
        return;
    }
    console.log(locstr);
    geocoder.geocode( { 'address': locstr, componentRestrictions: {country: 'us'}  }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var latLng = {};
        latLng.lat = results[0].geometry.location.lat();
        latLng.lon = results[0].geometry.location.lng();   
        console.log(JSON.stringify(latLng));
        var newdata = data;
        newdata.lat = latLng.lat;
        newdata.lon = latLng.lon;
        geoFuncCallback(newdata);
        return;
      } else {
        alert('Invalid Address');
        return;              
      }
    });     
}

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};