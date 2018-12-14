(function (window, $) {
  // default configs
  var defaultConfs = [
    {
      type: 0,
      css: {
        
      }
    }
  ]

  var myPrint = function (config) {
    // define config

    var conf = config || {

    }

    console.log(222)
  }


  $.extend({
    myPrint: myPrint,
  })
})(window, jQuery)