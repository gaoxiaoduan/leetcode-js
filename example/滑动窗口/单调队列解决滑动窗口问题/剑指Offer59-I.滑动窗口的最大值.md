### [剑指 Offer59-I.滑动窗口的最大值](https://leetcode.cn/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/) <Badge type="error">hard</Badge>

时间复杂度 O(N)
空间复杂度 O(k) 滑动窗口的大小

跟[239.滑动窗口最大值](/js-logs/sliding-window#239滑动窗口最大值)相同

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const window = new MonotonicQueue(); // 滑动窗口队列
  let res = [];

  for (let i = 0; i < nums.length; i++) {
    if (i < k - 1) {
      // 先填满窗口的 k-1位，若k是3，就是先把前两位填充
      window.push(nums[i]);
    } else {
      // 入队，填满k
      window.push(nums[i]);

      // 计算出滑动窗口内大最大值
      // 可以使用单调队列，优化时间复杂度
      // const windowMax = Math.max.apply(null, [...window]);
      // res.push(windowMax);
      res.push(window.max());

      // 出队
      window.shift(nums[i - k + 1]);
    }
  }

  return res;
};

// 单调队列
class MonotonicQueue {
  constructor() {
    this.q = [];
  }

  push(num) {
    // 入队前，把队列前面小于自己的元素全部删除
    while (this.q.length !== 0 && this.q[this.q.length - 1] < num) {
      this.q.pop();
    }
    this.q.push(num);
  }

  max() {
    return this.q[0];
  }

  shift(num) {
    // 要删除的num可能已经在push的时候被删除了，所以可以不用处理
    // 只要当num是队头的时候删除
    if (num === this.max()) {
      this.q.shift();
    }
  }
}
```
