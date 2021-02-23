/**
 * 实现一个自己的 Promise
 *
 * 内部同步转异步的方法使用的是 settimeout 会产生宏任务，这个跟原生没法比，原生就是微任务
 */
// 1 promise 有三个状态： 等待, 完成, 拒绝
// 2 一个执行阶段只执行一个类型的处理函数
// 3 是函数的执行部分都进行一次 try...catch...
// 4 then 里面的函数执行需要是异步的
class MyPromise {
  // 等待
  static PENDING = 'pending';
  // 完成
  static FULFILLED = 'fulfilled';
  // 拒绝
  static REJECT = 'reject';

  constructor(exector) {
    // 需要维护一个 value
    this.value = null;
    // 默认状态
    this.status = MyPromise.PENDING;
    // exector 内异步执行时收集 then
    this.callbacks = [];

    // 1 同步执行传入的函数
    // 2 class 默认是严格模式，回调执行里需要手动指定 this
    // 3 捕获错误 丢给 reject
    // 4
    try {
      exector(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(value) {
    if (this.status === MyPromise.PENDING) {
      this.value = value;
      // 状态改为 完成
      this.status = MyPromise.FULFILLED;
      this.callbacks.forEach((callback) => {
        callback.onFulfilled(value);
      });
    }
  }

  reject(reason) {
    if (this.status === MyPromise.PENDING) {
      this.value = reason;
      // 状态改为 拒绝
      this.status = MyPromise.REJECT;
      this.callbacks.forEach((callback) => {
        callback.onRejected(reason);
      });
    }
  }
  /**
   * 1 允许不传某个函数
   * 2 状态之间不能变化
   * 3 then 是个异步任务
   */
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = () => {};
    }
    if (typeof onRejected !== 'function') {
      onRejected = () => {};
    }
    if (this.status === MyPromise.PENDING) {
      // 构造时，内部使用异步了才会进入这个状态
      // 原生 promise 没有异步执行中的错误做处理
      this.callbacks.push({
        onFulfilled: (value) => {
          try {
            onFulfilled(value);
          } catch (error) {
            onRejected(error);
          }
        },
        onRejected,
      });
    }
    // 同步执行直接到这
    else if (this.status === MyPromise.FULFILLED) {
      setTimeout(() => {
        try {
          // 成功执行成功
          onFulfilled(this.value);
        } catch (error) {
          onRejected(error);
        }
      });
    } else if (this.status === MyPromise.REJECT) {
      setTimeout(() => {
        try {
          // 失败执行失败
          onRejected(this.value);
        } catch (error) {
          onRejected(error);
        }
      });
    }
  }
}
