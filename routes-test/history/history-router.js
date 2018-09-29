/**
 * @desc HistoryRouter
 */
(function (window) {
  // 构造函数Hash
  function His() {
    this.routes = {};
    this.currentUrl = '';
  }

    // hash对象
    var his = {
      init: function () {
        return new His();
      }
    }

  // 定义方法
  his.fn = {
    constructor: his.init,

    // 传入 URL 以及 根据 URL 对应的回调函数
    route: function (path, callback) {
      var cb = callback || function () {};
      this.routes[path] = function (type) {
        if (type == 1) history.pushState({path: path}, path, path);
        if (type == 2) history.replaceState({path: path}, path, path);
        cb();
      }
    },

    // 根据当前路由渲染页面
    refresh: function () {
      console.log("cb")
      this.routes[this.currentUrl] && this.routes[this.currentUrl]();
    },

    // 初始化
    init: function () {
      var _this = this;
      // 页面加载时触发refresh
      window.addEventListener('load', function () {
          _this.currentUrl = window.location.href.slice(location.href.indexOf('/', 8));
          _this.refresh(this.currentUrl, 2);
      });
      // popstate事件改变时触发refresh
      window.addEventListener('hashchange', function () {
        _this.currentUrl = history.state.path;
        console.log(_this.currentUrl)
        _this.refresh(this.currentUrl, 2);
      });

      var links = document.querySelectorAll('.route');
      links.forEach(function (item) {
        // 监听a标签href
        item.addEventListener('click', function (e) {
          // 阻止默认事件
          e.preventDefault();
          // 获取url
          this.currentUrl = e.target.getAttribute('href');
          // 触发refresh
          this.refresh(this.currentUrl, 2)
        })
      })
    }
  }
  
  His.prototype = his.fn;
  // 输出接口
  window.HistoryRouter = his.init();
  window.HistoryRouter.init();
  console.log(window.HistoryRouter)
})(window)

/*  
  class newRouter {
    // 初始化路由信息
    constructor() {
      this.routes = {};
      this.currentUrl = '';
    }
    route(path, callback) {
      this.routes[path] = (type) => {
        if (type === 1) history.pushState( { path }, path, path );
        if (type === 2) history.replaceState( { path }, path, path );
        callback()
      };
    }
    refresh(path, type) {
      this.routes[this.currentUrl] && this.routes[this.currentUrl](type);
    }
    init() {
      window.addEventListener('load', () => {
        // 获取当前 URL 路径
        this.currentUrl = location.href.slice(location.href.indexOf('/', 8))
        this.refresh(this.currentUrl, 2)
      }, false);
      window.addEventListener('popstate', () => {
        this.currentUrl = history.state.path
        this.refresh(this.currentUrl, 2)
      }, false);
      const links = document.querySelectorAll('.route')
      links.forEach((item) => {
        // 覆盖 a 标签的 click 事件，防止默认跳转行为
        item.onclick = (e) => {
          e.preventDefault()
          // 获取修改之后的 URL
          this.currentUrl = e.target.getAttribute('href')
          // 渲染
          this.refresh(this.currentUrl, 2)
        }
      })
    }
  } 
*/