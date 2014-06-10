function getUserCookie() {
  var value = window.localStorage.getItem("userkey");
  return value;
}

function setUserCookie(hashkey) {
  /* ask warren how this stuff is gonna work */
  window.localStorage.setItem("key", hashkey);
}

function checkLogin() {
  var account = window.localStorage.getItem("account");
  var user_id = window.localStorage.getItem("user_id");
  var userkey = window.localStorage.getItem("userkey");
  console.log(user_id);
  if (account != 'undefined' && user_id != 'undefined' && userkey != 'undefined') 
    return true;
  else
    return false;
}