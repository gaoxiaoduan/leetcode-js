---
nav: JavaScript题解
group:
  title: TODO
  order: 3
order: 1
---

# 数学

## [50.pow-x-n](https://leetcode.cn/problems/powx-n/) <Badge type="warning">medium</Badge>

```js
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (n === 0) return 1;

  // n是负数
  if (n < 0) {
    return myPow(1 / x, -n);
  }

  // n是奇数
  if (n % 2 === 1) {
    return x * myPow(x, n - 1);
  } else {
    // n 是偶数
    const sub = myPow(x, n / 2);
    return sub * sub;
  }
};
```
