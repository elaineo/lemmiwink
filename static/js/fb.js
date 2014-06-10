var fbapi = {
    authorize: function (options) {

        var deferred = $.Deferred();    

        //Build the OAuth consent page URL
        var authUrl = 'https://www.facebook.com/dialog/oauth?' + $.param({
            client_id: options.client_id,
            redirect_uri: options.redirect_uri
        });

        console.log('about to open InAppBrowser with URL: ' + authUrl);

        //Open the OAuth consent page in the InAppBrowser
        var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');

        $(authWindow).on('loadstart', function (e) {
            var url = e.originalEvent.url;

            console.log('InAppBrowser: loadstart event has fired with url: ' + url);

            var code = /\?code=(.+)$/.exec(url);
            var error = /\?error=(.+)$/.exec(url);

            if (code || error) {
                //Always close the browser when match is found
                authWindow.close();
            }

            if (code) {
                //Exchange the authorization code for an access token
                $.post('https://graph.facebook.com/oauth/access_token', {
                    code: code[1],
                    client_id: options.client_id,
                    client_secret: options.client_secret,
                    redirect_uri: options.redirect_uri
                }).done(function (data) {
                    deferred.resolve(data);
                }).fail(function (response) {
                    deferred.reject(response.responseJSON);
                });
            } else if (error) {
                //The user denied access to the app
                deferred.reject({
                    error: error[1]
                });
            }
        });

        return deferred.promise();
    },

    profile: function (access_token) {
        var deferred = $.Deferred();

        //Build the OAuth consent page URL
        var profile_uri = 'https://graph.facebook.com/me?' + access_token;

        console.log('about to fetch facebook profile: ' + profile_uri);

        $.getJSON(profile_uri)
        .done(function (data) {
            deferred.resolve(data);
        }).fail(function (response) {
            deferred.reject(response.responseJSON);
        });

        return deferred.promise();
    }
};

$(document).on('deviceready', function () {
  //enable cross site script
  jQuery.support.cors = true;

  $('#btn_fb').click(function(e) {
     e.preventDefault();
     fblogin();

  });
});

function fblogin() {
   /* I know, I know, the server should be doing this crap, I'm lazy */
   /* remind me to fix it later */
    $.when(fbapi.authorize({
        client_id: '540602052657989',
        client_secret: '89a554288210c8f7a8f3292612ed7a6f',
        redirect_uri: 'http://localhost/'
    }))
    .then(function (access_token) {
      console.log('Executing then callback with access token: ' + access_token);
      $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: wwwHome + "/signup/fbapp",
        data: JSON.stringify(access_token),
        success: function(response) {
          console.log(JSON.stringify(response));
          if (response.status == "ok") {
            window.localStorage.setItem("account", response.account);
            window.localStorage.setItem("user_id", response.userid);  
            window.localStorage.setItem("userkey", response.userkey);  
            $(location).attr('href',"home.html");
          } else {
             alert(response.error);
          }
        },
        failure: function(f) {
             alert('Login Error');
        }
      });             

    });
}