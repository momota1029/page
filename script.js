if(!window.addEventListener){
  window.addEventListener = function(a, b){
    window.attachEvent("on" + a, b);
  }
}
window.addEventListener("load", function(){
  var iframes = document.getElementsByTagName("iframe");
  for( var i = 0; i <= iframes.length - 1; i++ ){
    var iframe = iframes[i];
    if( iframe.getAttribute("srcdoc") &&
        iframe.contentWindow.document.body.innerHTML == "" ){
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(iframe.getAttribute("srcdoc"));
      iframe.contentWindow.document.close();
    }
    if( iframe.getAttribute("data-seamless") != null ){
      iframe.style.overflowY = "hidden";
      iframe.style.width = "100%";
      iframe.setAttribute("scrolling", "no");
      var func;(func = function(){
        iframe.style.height = 0; //Edgeなどで大きすぎるiframeは小さくできないため
        iframe.style.height = iframe.contentWindow.document.documentElement[
          (document.all ? "scroll" : "offset")
        + "Height"] + "px";
      })();
      iframes[i].addEventListener("load", func, false);
      window.addEventListener("resize", func, false);
    }
  }
}, false);