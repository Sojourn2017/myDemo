/**
 * Promise对象
 * @param {Function} resolver 执行器
 */
function Promise(resolver) {
  if (resolver && typeof resolver !== "function") {
    throw new Error("Promise resolver is not a function");
  }
  //当前promise对象的状态
  this.state = 'pending';
  //当前promise对象的数据（成功或失败）
  this.data = undefined;
  //当前promise对象注册的回调队列
  this.callbackQueue = [];
  //执行resove()或reject()方法
  if (resolver) executeResolver.call(this, resolver);
}

function executeResolver(resolver) {
  //[标准 2.3.3.3.3] 如果resove()方法多次调用，只响应第一次，后面的忽略
  var called = false,
    _this = this;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    //[标准 2.3.3.3.2] 如果是错误 使用reject方法
    executeCallback.bind(_this)("reject", value);
  }
  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    //[标准 2.3.3.3.1] 如果是成功 使用resolve方法
    executeCallback.bind(_this)("resolve", value);
  }
  // 使用try...catch执行
  //[标准 2.3.3.3.4] 如果调用resolve()或reject()时发生错误，则将状态改成rejected，并将错误reject出去
  try {
    resolver(onSuccess, onError);
  } catch (e) {
    onError(e);
  }
}

function executeCallback(type, x) {
  var isResolve = type === "resolve",
    thenable;
  // [标准 2.3.3] 如果x是一个对象或一个函数
  if (isResolve && (typeof x === "object" || typeof x === "function")) {
    //[标准 2.3.3.2]
    try {
      thenable = getThen(x);
    } catch (e) {
      return executeCallback.bind(this)("reject", e);
    }
  }
  if (isResolve && thenable) {
    executeResolver.bind(this)(thenable);
  } else {
    //[标准 2.3.4]
    this.state = isResolve ? 'resolve' : 'reject';
    this.data = x;
    this.callbackQueue &&
      this.callbackQueue.length &&
      this.callbackQueue.forEach(v => v[type](x));
  }
  return this;
}

function getThen(obj) {
  var then = obj && obj.then;
  if (obj && typeof obj === "object" && typeof then === "function") {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

Promise.prototype.then = function(onResolved, onRejected) {
  //[标准 2.2.1 - 2.2.2] 状态已经发生改变并且参数不是函数时，则忽略
  if (
    (typeof onResolved !== "function" && this.state === 'resolve') ||
    (typeof onRejected !== "function" && this.state === 'reject')
  ) {
    return this;
  }
  // 实例化一个新的Promise对象
  var promise = new this.constructor();
  // 一般情况下，状态发生改变时，走这里
  if (this.state !== 'pending') {
    var callback = this.state === 'resolve' ? onResolved : onRejected;
    // 将上一步 resolve(value)或rejecte(value) 的 value 传递给then中注册的 callback
    // [标准 2.2.4] 异步调用callback
    executeCallbackAsync.bind(promise)(callback, this.data);
  } else {
    // var promise = new Promise(resolve=>resolve(1)); promise.then(...); promise.then(...); ...
    // 一个实例执行多次then, 这种情况会走这里 [标准 2.2.6]
    this.callbackQueue.forEach(v => v[type](x));
  }
  // 返回新的实例 [标准 2.2.7]
  return promise;
};

// 用于异步执行 .then(onResolved, onRejected) 中注册的回调
function executeCallbackAsync(callback, value) {
  var _this = this;
  setTimeout(function() {
    var res;
    try {
      res = callback(value);
    } catch (e) {
      return executeCallback.bind(_this)("reject", e);
    }
    if (res !== _this) {
      return executeCallback.bind(_this)("resolve", res);
    } else {
      return executeCallback.bind(_this)(
        "reject",
        new TypeError("Cannot resolve promise with itself")
      );
    }
  }, 1);
}

// 用于注册then中的回调 .then(resolvedFn, rejectedFn)
function CallbackItem(promise, onResolved, onRejected) {
  this.promise = promise;
  // 为了保证在promise链中，resolve或reject的结果可以一直向后传递，可以默认给then添加resolvedFn和rejectedFn
  this.onResolved =
    typeof onResolved === "function"
      ? onResolved
      : function(v) {
          return v;
        };
  this.onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function(v) {
          throw v;
        };
}
CallbackItem.prototype.resolve = function(value) {
  //调用时异步调用 [标准 2.2.4]
  executeCallbackAsync.bind(this.promise)(this.onResolved, value);
};
CallbackItem.prototype.reject = function(value) {
  //调用时异步调用 [标准 2.2.4]
  executeCallbackAsync.bind(this.promise)(this.onRejected, value);
};

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.all = function(iterable) {
  var _this = this;
  return new this(function(resolve, reject) {
    if (!iterable || !Array.isArray(iterable))
      return reject(new TypeError("must be an array"));
    var len = iterable.length;
    if (!len) return resolve([]);
    var res = Array(len),
      called = false;
    iterable.forEach(function(v, i) {
      (function(i) {
        _this.resolve(v).then(
          function(value) {
            res[i] = value;
            if (++counter === len && !called) {
              called = true;
              return resolve(res);
            }
          },
          function(err) {
            if (!called) {
              called = true;
              return reject(err);
            }
          }
        );
      })(i);
    });
  });
};

Promise.race = function(iterable) {
  var _this = this;
  return new this(function(resolve, reject) {
    if (!iterable || !Array.isArray(iterable))
      return reject(new TypeError("must be an array"));
    var len = iterable.length;
    if (!len) return resolve([]);
    var called = false;
    iterable.forEach(function(v, i) {
      _this.resolve(v).then(
        function(res) {
          if (!called) {
            called = true;
            return resolve(res);
          }
        },
        function(err) {
          if (!called) {
            called = true;
            return reject(err);
          }
        }
      );
    });
  });
};

Promise.resolve = function(value) {
  if (value instanceof this) return value;
  return executeCallback.bind(new this())("resolve", value);
};

Promise.reject = function(value) {
  if (value instanceof this) return value;
  return executeCallback.bind(new this())("reject", value);
};

Promise.prototype.wait = function(ms) {
  var P = this.constructor;
  return this.then(
    function(v) {
      return new P(function(resolve, reject) {
        setTimeout(function() {
          resolve(v);
        }, ~~ms);
      });
    },
    function(r) {
      return new P(function(resolve, reject) {
        setTimeout(function() {
          reject(r);
        }, ~~ms);
      });
    }
  );
};

Promise.stop = function() {
  return new this();
};

Promise.prototype.always = function(fn) {
  return this.then(
    function(v) {
      return fn(v), v;
    },
    function(r) {
      throw (fn(r), r);
    }
  );
};

Promise.prototype.done = function(onResolved, onRejected) {
  this.then(onResolved, onRejected).catch(function(error) {
    setTimeout(function() {
      throw error;
    }, 0);
  });
};

Promise.deferred = Promise.defer = function() {
  var dfd = {};
  dfd.promise = new this(function(resolve, reject) {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

Promise.timeout = function(promise, ms) {
  return this.race([promise, this.reject().wait(ms)]);
};

Promise.sequence = function(tasks) {
  return tasks.reduce(function(prev, next) {
    return prev.then(next).then(function(res) {
      return res;
    });
  }, this.resolve());
};

module.exports = Promise;
