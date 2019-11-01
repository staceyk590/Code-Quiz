function startTimer() {
    var tobj = document.getElementById("timespent")
    var t = "16:30";
    var s = 30;
    var d = new Date();
    var timeint = setInterval(function () {
      s += 1;
      d.setMinutes("16");
      d.setSeconds(s);
      min = d.getMinutes();
      sec = d.getSeconds();
      if (sec < 10) sec = "0" + sec;
      document.getElementById("timespent").value = min + ":" + sec;
    }, 1000);
    tobj.value = t;
  }
  if (window.addEventListener) {              
    window.addEventListener("load", startTimer);
  } else if (window.attachEvent) {                 
    window.attachEvent("onload", startTimer);
  }