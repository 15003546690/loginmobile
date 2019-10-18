;(function(win,doc){
    var rem = 100 * doc.documentElement.clientWidth / 750;
     doc.documentElement.style.fontSize = rem + 'px';
     win.onresize = function () {
         rem = 100 * doc.documentElement.clientWidth / 750;
         doc.documentElement.style.fontSize = rem + 'px';
     };
})(window,document);
