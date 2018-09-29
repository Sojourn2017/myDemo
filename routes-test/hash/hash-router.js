/**
 * @desc HashRouter
 */
(function (window) {
  // 构造函数Hash
  function Hash() {
    this.routes = {};
    this.currentUrl = '';
  }

    // hash对象
    var hash = {
      init: function () {
        return new Hash();
      }
    }

  // 定义方法
  hash.fn = {
    constructor: hash.init,

    // 传入 URL 以及 根据 URL 对应的回调函数
    route: function (path, callback) {
      var cb = callback || function () {};
      this.routes[path] = cb;
    },

    // 根据当前路由渲染页面
    refresh: function () {
      this.currentUrl = location.hash.slice(1) || '/';
      this.routes[this.currentUrl] && this.routes[this.currentUrl]();
    },

    // 初始化
    init: function () {
      // 页面加载时触发refresh
      window.addEventListener('load', this.refresh.bind(this), false);
      // hash事件改变时触发refresh
      window.addEventListener('hashchange', this.refresh.bind(this), false);
    }
  }
  
  Hash.prototype = hash.fn;
  // 输出接口
  window.HashRouter = hash.init();
  window.HashRouter.init();
})(window)

/* 
  class HashRouter {
    // 初始化路由信息
    constructor() {
      this.routes = {};
      this.currentUrl = '';
    }
    // 传入 URL 以及 根据 URL 对应的回调函数
    route(path, callback = () => {}) {
      this.routes[path] = callback;
    }
    // 切割 hash，渲染页面
    refresh() {
      this.currentUrl = location.hash.slice(1) || '/';
      this.routes[this.currentUrl] && this.routes[this.currentUrl]();
    }
    // 初始化
    init() {
      window.addEventListener('load', this.refresh.bind(this), false);
      window.addEventListener('hashchange', this.refresh.bind(this), false);
    }
  } 
 */