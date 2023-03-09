---
nav:
  title: Blog
group:
  title: js相关
  order: 1
order: 1
toc: content
---

# Promise 分析与实现

## 一、参考资料

- [深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469)
- [Promise A+规范](https://promisesaplus.com/#notes)
- [promise v8 源码](https://chromium.googlesource.com/v8/v8/+/3.29.45/src/promise.js)

## 二、术语

- **promise**是一个有 then 方法的对象或者函数
- **thenable**是一个有 then 方法的对象或者函数
- **value**是 promise 状态成功时的值，也就是 resolve 的参数, 包括各种数据类型, 也包括 undefined/thenable 或者是 promise
- **reason** 是 promise 状态失败时的值, 也就是 reject 的参数, 表示拒绝的原因
- **exception**是一个使用 throw 抛出的异常值

## 三、Promise States

promise 应该有**三种状态**. 要注意他们之间的**流转关系**.

### 1.pending

1.1 初始的状态, 可改变.
1.2 一个 promise 在 resolve 或者 reject 前都处于这个状态。
1.3 可以通过 resolve -> fulfilled 状态;
1.4 可以通过 reject -> rejected 状态;

### 2.fulfilled

2.1 最终态, 不可变.
2.2 一个 promise 被 resolve 后会变成这个状态.
2.3 必须拥有一个 value 值

### 3.rejected

3.1 最终态, 不可变.
3.2 一个 promise 被 reject 后会变成这个状态
3.3 必须拥有一个 reason

Tips: 总结一下, 就是 promise 的状态流转是这样的

pending -> resolve(value) -> fulfilled
pending -> reject(reason) -> rejected

## 四、Then 方法

promise 应该提供一个 then 方法, 用来访问最终的结果, 无论是 value 还是 reason.

```js
promise.then(onFulfilled, onRejected);
```

### 1.参数要求

1.1 onFulfilled 必须是**函数类型,** 如果不是函数, 应该被忽略.
1.2 onRejected 必须是**函数类型**, 如果不是函数, 应该被忽略.

### 2.onFulfilled 特性

2.1 在 promise 变成 fulfilled 时，应该调用 onFulfilled, 参数是 value
2.2 在 promise 变成 fulfilled 之前, 不应该被调用.
2.3 只能被**调用一次** (所以在实现的时候需要一个变量来限制执行次数)

### 3.onRejected 特性

3.1 在 promise 变成 rejected 时，应该调用 onRejected, 参数是 reason
3.2 在 promise 变成 rejected 之前, 不应该被调用.
3.3 只能被**调用一次**(所以在实现的时候需要一个变量来限制执行次数)

### 4.onFulfilled 和 onRejected 应该是**微任务**

这里用**queueMicrotask**来实现微任务的调用.

### 5.then 方法可以被**调用多次**

5.1 promise 状态变成 fulfilled 后，所有的 onFulfilled 回调都需要按照**then 的顺序执行**, 也就是按照注册顺序执行(所以在实现的时候需要一个**数组来存放**多个 onFulfilled 的回调)
5.2 promise 状态变成 rejected 后，所有的 onRejected 回调都需要按照**then 的顺序执行**, 也就是按照注册顺序执行(所以在实现的时候需要一个**数组来存放**多个 onRejected 的回调)

### 6.返回值

- then 应该返回一个 promise

```js
promise2 = promise1.then(onFulfilled, onRejected);
```

6.1 onFulfilled 或 onRejected 执行的结果为 x, 调用 **resolvePromise**
6.2 如果 **onFulfilled 或者 onRejected 执行时抛出异常 e,** promise2 需要被 reject
6.3 如果 onFulfilled 不是一个函数, promise2 以 promise1 的 value 触发 fulfilled
6.4 如果 onRejected 不是一个函数, promise2 以 promise1 的 reason 触发 rejected

### 7.resolvePromise

```js
resolvePromise(promise2, x, resolve, reject);
```

- 如果 **promise2 和 x 相等**，那么**reject TypeError，防止循环引用，造成死循环**
- 如果 x **是一个 promise**
  - 如果 x 是 pending 态，那么 promise 必须要在 pending,直到 x 变成 fulfilled or rejected.
  - 如果 x 被 fulfilled, 用相同的 value 执行 promise
  - 如果 x 被 rejected, 用相同的 reason 拒绝 promise
- 如果 x**是一个 object 或者 是一个 function**
  - 首先取出 then，let then = x.then.
  - 如果**x.then 这步出错**，那么 reject(e)
  - 如果**then 是一个函数**，then.call(x, resolvePromiseFn, rejectPromiseFn)
  - resolvePromiseFn 的 入参是 y, 执行 resolvePromise(promise2, y, resolve, reject);
  - rejectPromiseFn 的 入参是 r, resolvePromise(promise2, r, resolve, reject)
  - 如果 resolvePromise 和 rejectPromise 都调用了，那么第一个调用优先，后面的调用忽略。使用 called 标识
  - 如果调用 then 抛出异常 e
  - 如果 resolvePromise 或 rejectPromise 已经被调用，那么忽略
- 如果 then 不是一个 function. resolve(x)

## 五、实现 promise

### 1.定义并设置三种状态，传入执行器 exec

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(exec) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;

    // 执行器传入后立即执行
    exec();
  }
}
```

### 2.为 exec 添加 reject 和 resolve 方法，执行回调

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(exec) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;

    // resolve和reject被回调的时候，状态流转
    // 这里使用箭头函数，绑定resolve和reject的this始终指向MyPromise
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
      }
    };

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
      }
    };
    // 若执行器报错，直接reject出去
    try {
      // 执行器传入后立即执行
      exec(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
}
```

### 3.简单实现 then 方法

```js
then(onFulfilled, onRejected) {
	if (this.status === FULFILLED) {
    // 调用成功回调，并且把值返回
    onFulfilled(this.value);
  } else if (this.status === REJECTED) {
    // 调用失败回调，并且把原因返回
    onRejected(this.reason);
  }
}
```

到这个地方一个简单的 promise 的骨架已经形成了，写一个测试检查一下

```js
const promise = new MyPromise((resolve, reject) => {
  resolve('success');
  reject('err');
  // 如果这里使用异步的方法，上述的then是感觉不到的
  // setTimeout(() => {
  //     resolve('success')
  // })
});

promise.then(
  (value) => {
    console.log('resolve', value);
  },
  (reason) => {
    console.log('reject', reason);
  },
);

// 输出: resolve success
```

### 4.添加 then 方法的对异步的处理

> 思考：为什么使用异步的方法就感受不到了呢？
> 上面的写法, 是在 then 函数被调用的瞬间就会执行.
> 那这时候如果 status 还没变成 fulfilled 或者 rejected 怎么办, 很有可能还是 pending 的
> 那么我们首先要拿到所有的回调, 然后才能在某个时机去执行他.
> 新建两个数组, 来分别存储成功和失败的回调, 调用 then 的时候, 如果还是 pending 就存入数组

```js
class MyPromise {
  constructor(exec) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;

    this.resolveCallbacks = [];
    this.rejectCallbacks = [];

    // resolve和reject被回调的时候，状态流转
    // 这里使用箭头函数，绑定resolve和reject的this始终指向MyPromise
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.resolveCallbacks.forEach((fn) => fn());
      }
    };

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.rejectCallbacks.forEach((fn) => fn());
      }
    };

    // 若执行器报错，直接reject出去
    try {
      // 执行器传入后立即执行
      exec(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      // 调用成功回调，并且把值返回
      onFulfilled(this.value);
    } else if (this.status === REJECTED) {
      // 调用失败回调，并且把原因返回
      onRejected(this.reason);
    } else if (this.status === PENDING) {
      this.resolveCallbacks.push(onFulfilled);
      this.rejectCallbacks.push(onRejected);
    }
  }
}
```

### 5.完善 then 方法-（链式调用）

1. onFulfilled 和 onRejected 如果不是函数，就返回原 value 或 reason
2. then 方法返回一个 promise 对象
   1. onFulfilled 或 onRejected 执行的结果是 x，调用 resolvePromise
   2. 如果 onFulfilled 或者 onRejected 执行时抛出异常 e，promise2 需要被 reject，其 reason 为 e
3. onFulfilled 和 onRejected 是微任务，需要使用 queueMicrotask 或者 setTimeout 包裹

```js
isFunction(params) {
    return typeof params === 'function';
}

then(onFulfilled, onRejected) {
    // 1.onFulfilled和onRejected如果不是函数，就返回原value或reason
    const fulFilledFn = this.isFunction(onFulfilled) ? onFulfilled : value => value;
    const rejectedFn = this.isFunction(onRejected) ? onRejected : reason => { throw reason };

    // 2.then方法返回一个promise对象
    const p2 = new MyPromise((resolve, reject) => {
        if (this.status === FULFILLED) {
            // fulFilledFn(this.value)
            // 3.3. onFulfilled和onRejected是微任务，需要使用queueMicrotask或者setTimeout包裹
            queueMicrotask(() => {
              // 2.2 如果onFulfilled或者onRejected执行时抛出异常e，promise2需要被reject，其reason为e
              try {
                // 2.1 onFulfilled或onRejected执行的结果是x，调用resolvePromise
                // 获取成功回调函数的执行结果
                const x = fulFilledFn(this.value);
                // 传入 resolvePromise 集中处理
                this.resolvePromise(p2, x, resolve, reject);
              } catch (e) {
                  reject(e);
              }
            })
        } else if (this.status === REJECTED) {
            // rejectedFn(this.reason);
            queueMicrotask(() => {
              try {
                const x = rejectedFn(this.value);
                // 传入 resolvePromise 集中处理
                this.resolvePromise(x, resolve, reject);
              } catch (e) {
                  reject(e);
              }
            })
        } else if (this.status === PENDING) {
            this.resolveCallbacks.push(() => {
                queueMicrotask(() => {
                  try {
                    const x = fulFilledFn(this.value);
                    // 传入 resolvePromise 集中处理
                    this.resolvePromise(x, resolve, reject);
                  } catch (e) {
                    reject(e);
                  }
                })
            });
            this.rejectCallbacks.push(() => {
              queueMicrotask(() => {
                try {
                  const x = rejectedFn(this.value);
                  // 传入 resolvePromise 集中处理
                  this.resolvePromise(x, resolve, reject);
                } catch (e) {
                  reject(e);
                }
              })
            });
        }
    });
    return p2;
}

resolvePromise(x, resolve, reject) {
    // 判断x是不是 MyPromise 实例对象
    if (x instanceof MyPromise) {
        // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
        // x.then(value => resolve(value), reason => reject(reason))
        // 简化之后
        x.then(resolve, reject);
    } else {
        // 普通值
        resolve(x);
    }
}
```

发现上面 promise2 中很多重复的代码，进行抽离

```js
then(onFulfilled, onRejected) {
    // 1.onFulfilled和onRejected如果不是函数，就返回原value或reason
    const fulFilledFn = this.isFunction(onFulfilled) ? onFulfilled : value => value;
    const rejectedFn = this.isFunction(onRejected) ? onRejected : reason => { throw reason };

    // 2.then方法返回一个promise对象
    const p2 = new MyPromise((resolve, reject) => {

        const fulfilledMicrotask = () => {
            // 3.3. onFulfilled和onRejected是微任务，需要使用queueMicrotask或者setTimeout包裹
            queueMicrotask(() => {
                // 2.2 如果onFulfilled或者onRejected执行时抛出异常e，promise2需要被reject，其reason为e
                try {
                    // 2.1 onFulfilled或onRejected执行的结果是x，调用resolvePromise
                    // 获取成功回调函数的执行结果
                    const x = fulFilledFn(this.value);
                    // 传入 resolvePromise 集中处理
                    this.resolvePromise(p2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            })
        }

        const rejectedMicrotask = () => {
            queueMicrotask(() => {
                try {
                    const x = rejectedFn(this.reason);
                    // 传入 resolvePromise 集中处理
                    this.resolvePromise(p2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            })
        }

        if (this.status === FULFILLED) {
            // fulFilledFn(this.value)
            fulfilledMicrotask();
        } else if (this.status === REJECTED) {
            // rejectedFn(this.reason);
            rejectedMicrotask();
        } else if (this.status === PENDING) {
            this.resolveCallbacks.push(fulfilledMicrotask);
            this.rejectCallbacks.push(rejectedMicrotask);
        }
    });

    return p2;
}
```

### 6.完善 resolvePromise 的处理

其实整体的处理逻辑与原来相似，不过是对边界情况更加细化了

```js
resolvePromise(x, resolve, reject) {
    // 判断x是不是 MyPromise 实例对象
    if (x instanceof MyPromise) {
        // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
        // x.then(value => resolve(value), reason => reject(reason))
        // 简化之后
        x.then(resolve, reject);
    } else {
        // 普通值
        resolve(x);
    }
}
```

---

```js
resolvePromise(promise2, x, resolve, reject);
```

- 防止循环引用，这里要给 resolvePromise 函数签名加一个新参数，判断 promise2 和 x 是否为同一个 promise
- 如果 x**是一个 object 或者 是一个 function**
  - 如果 x 是 null，直接 resolve(x)出去
  - 然后取出 then，let then = x.then.
  - 如果**x.then 这步出错**，那么 reject(e)
  - 如果**then 是一个函数**，then.call(x, resolvePromiseFn, rejectPromiseFn)
    - resolvePromiseFn 的入参是 y, 如果被调用，执行**resolvePromise(promise2, y, resolve, reject);**
    - rejectPromiseFn 的入参是 r, 如果被调用，**执行 reject(r)**
    - 如果 resolvePromise 和 rejectPromise 都调用了，那么第一个调用优先，后面的调用忽略。使用**called**标识
    - 如果调用 then 抛出异常 e
    - 如果 resolvePromise 或 rejectPromise 已经被调用，那么忽略，if(called) return
  - 如果 then 不是一个 function. resolve(x)

```js
resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        throw new TypeError('循环引用')
    }

    if (typeof x === 'object' || typeof x === 'function') {
        if (x === null) {
            return resolve(x);
        }
        let then;

        try {
            then = x.then;
        } catch (e) {
            return reject(e);
        }
        if (typeof then === 'function') {
            let called = false;
            try {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    this.resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r);
                })
            } catch (e) {
                if (called) return;
                reject(e);
            }
        } else {
            resolve(x);
        }
    } else {
        resolve(x);
    }
}
```

### 7.添加 resolve、reject、catch 静态方法

```js
static resolve(params) {
      if (params instanceof MyPromise) {
          return params;
      }
      return new MyPromise((resolve, reject) => {
          resolve(params);
      })
  }

static reject(reason) {
    return new MyPromise((resolve, reject) => {
        reject(reason);
    })
}

catch(onRejected){
    return this.then(null, onRejected)
}
```

### 8.实现 race、all、allSettled 方法

`const p = Promise.race([p1, p2, p3]);`
该方法是将多个 Promise 实例，包装成一个新的 Promise 实例。
只要 p1、p2、p3 之中有一个实例率先改变状态，p 的状态就跟着改变。
那个率先改变的 Promise 实例的返回值，就传递给 p 的回调函数。

```js
static race(promises) {
    if (!Array.isArray(promises)) {
        throw new TypeError('arguments must be an array')
    }
    return new MyPromise((resolve, reject) => {
        if (promises.length === 0) {
            return resolve();
        }
        for (let i = 0; i < promises.length; i++) {
            MyPromise.resolve(promises[i]).then(resolve, reject);
        }
    })
}

static all(promises) {
    return new MyPromise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            throw new TypeError('arguments must be an array')
        }
        if (promises.length === 0) {
            return resolve([]);
        }
        let result = [];
        let count = 0;
        for (let i = 0; i < promises.length; i++) {
            MyPromise.resolve(promises[i]).then(value => {
                result[i] = value;
                count++;
                if (count === promises.length) {
                    resolve(result);
                }
            }, reject);
        }
    })
}

// 返回所有promise的状态和结果
static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            throw new TypeError('arguments must be an array')
        }
        let count = 0;
        let result = [];

        for (let i = 0; i < promises.length; i++) {
            MyPromise.resolve(promises[i]).then(value => {
                result[i] = {
                    status: 'fulfilled',
                    value
                }
                count++;
                if (count === promises.length) {
                    resolve(result);
                }
            }, reason => {
                result[i] = {
                    status: 'rejected',
                    reason
                }
                count++;
                if (count === promises.length) {
                    resolve(result);
                }
            })
        }
    })
}
```

## 六、使用 promises-aplus-tests 进行测试

```js
// npm i promises-aplus-tests -g
// 命令行执行 => promises-aplus-tests [待测试文件] 即可验证
MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};
module.exports = MyPromise;
```

## 七、完整代码

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(exec) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;

    this.resolveCallbacks = [];
    this.rejectCallbacks = [];

    // resolve和reject被回调的时候，状态流转
    // 这里使用箭头函数，绑定resolve和reject的this始终指向MyPromise
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.resolveCallbacks.forEach((fn) => fn());
      }
    };

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.rejectCallbacks.forEach((fn) => fn());
      }
    };
    // 若执行器报错，直接reject出去
    try {
      // 执行器传入后立即执行
      exec(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  isFunction(params) {
    return typeof params === 'function';
  }

  then(onFulfilled, onRejected) {
    // 1.onFulfilled和onRejected如果不是函数，就返回原value或reason
    const fulFilledFn = this.isFunction(onFulfilled)
      ? onFulfilled
      : (value) => value;
    const rejectedFn = this.isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason;
        };

    // 2.then方法返回一个promise对象
    const p2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        // 3.3. onFulfilled和onRejected是微任务，需要使用queueMicrotask或者setTimeout包裹
        queueMicrotask(() => {
          // 2.2 如果onFulfilled或者onRejected执行时抛出异常e，promise2需要被reject，其reason为e
          try {
            // 2.1 onFulfilled或onRejected执行的结果是x，调用resolvePromise
            // 获取成功回调函数的执行结果
            const x = fulFilledFn(this.value);
            // 传入 resolvePromise 集中处理
            this.resolvePromise(p2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = rejectedFn(this.reason);
            // 传入 resolvePromise 集中处理
            this.resolvePromise(p2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      if (this.status === FULFILLED) {
        // fulFilledFn(this.value)
        fulfilledMicrotask();
      } else if (this.status === REJECTED) {
        // rejectedFn(this.reason);
        rejectedMicrotask();
      } else if (this.status === PENDING) {
        this.resolveCallbacks.push(fulfilledMicrotask);
        this.rejectCallbacks.push(rejectedMicrotask);
      }
    });

    return p2;
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      throw new TypeError('Chaining cycle ');
    }

    if (typeof x === 'object' || typeof x === 'function') {
      if (x === null) {
        return resolve(x);
      }
      let then;

      try {
        then = x.then;
      } catch (e) {
        return reject(e);
      }
      if (typeof then === 'function') {
        let called = false;
        try {
          then.call(
            x,
            (y) => {
              if (called) return;
              called = true;
              this.resolvePromise(promise2, y, resolve, reject);
            },
            (r) => {
              if (called) return;
              called = true;
              reject(r);
            },
          );
        } catch (e) {
          if (called) return;
          reject(e);
        }
      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  }

  static resolve(params) {
    if (params instanceof MyPromise) {
      return params;
    }
    return new MyPromise((resolve, reject) => {
      resolve(params);
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static race(promises) {
    if (!Array.isArray(promises)) {
      throw new TypeError('arguments must be an array');
    }
    return new MyPromise((resolve, reject) => {
      if (promises.length === 0) {
        return resolve();
      }
      for (let i = 0; i < promises.length; i++) {
        MyPromise.resolve(promises[i]).then(resolve, reject);
      }
    });
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        throw new TypeError('arguments must be an array');
      }
      if (promises.length === 0) {
        return resolve([]);
      }
      let result = [];
      let count = 0;
      for (let i = 0; i < promises.length; i++) {
        MyPromise.resolve(promises[i]).then((value) => {
          result[i] = value;
          count++;
          if (count === promises.length) {
            resolve(result);
          }
        }, reject);
      }
    });
  }

  static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        throw new TypeError('arguments must be an array');
      }
      let count = 0;
      let result = [];

      for (let i = 0; i < promises.length; i++) {
        MyPromise.resolve(promises[i]).then(
          (value) => {
            result[i] = {
              status: 'fulfilled',
              value,
            };
            count++;
            if (count === promises.length) {
              resolve(result);
            }
          },
          (reason) => {
            result[i] = {
              status: 'rejected',
              reason,
            };
            count++;
            if (count === promises.length) {
              resolve(result);
            }
          },
        );
      }
    });
  }
}
```
