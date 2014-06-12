$(document).ready(function(){
	var input = document.getElementById("images"), 
		formdata = false;

	function showUploadedItem (source) {
  		var list = document.getElementById("img-prev"),
	  		img  = document.createElement("img");
  		img.src = source;
        $('#img-prev').html('');
		list.appendChild(img);
	}   

	if (window.FormData) {
  		formdata = new FormData();
	}
	
 	input.addEventListener("change", function (evt) {
 		var i = 0, len = this.files.length, img, reader, file;
	
     

     
		for ( ; i < len; i++ ) {
			file = this.files[i];
            var iSize = (file.size / 1024); 
             if (iSize / 1024 > 2.48) 
            { 
              display_modal_msg('Please upload a smaller file.');
              return
            }    
	
			if (!!file.type.match(/image.*/)) {
				if ( window.FileReader ) {
					reader = new FileReader();
					reader.onloadend = function (e) { 
						showUploadedItem(e.target.result, file.fileName);
					};
					reader.readAsDataURL(file);
				}
				if (formdata) {
					formdata.append("images[]", file);
				}
			}	
		}
	
	}, false);

})