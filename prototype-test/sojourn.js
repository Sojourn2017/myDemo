(function (window) {
  // 定义属于自己的对象
  var Sojourn = {}

  // 定义构造函数
  function S(dom, selector) {
    var i, len = dom ? dom.length : 0;
    for (i = 0; i < len; i++) {
      this[i] = dom[i];
    }
    this.length = len;
    this.selector = selector || '';
  }

  // 定义生成实例接口
  Sojourn.S = function (dom, selector) {
    return new S(dom, selector);
  }

  // 定义初始化函数
  Sojourn.init = function (selector) {
    var slice = Array.prototype.slice;
    var dom = slice.call(document.querySelectorAll(selector));
    return Sojourn.S(dom, selector);
  }

  // 提供对外接口
  var $ = Sojourn.init;

  // 提供扩展接口
  $.fn = {
    constructor: Sojourn.S,
    // 添加方法

    // 定义一个修改元素html内容的方法
    html: function (content) {
      console.log(this);
      if (content) {
        this[0].innerHTML = content;
      } else {
        alert('no change');
      }
      // 返回dom对象以实现链式调用
      return this;
    }
  }

  // 绑定原型
  Sojourn.S.prototype = S.prototype = $.fn;

  // 绑定到全局对象
  window.$ = $;
})(window)