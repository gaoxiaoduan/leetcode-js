## [剑指 Offer 62. 圆圈中最后剩下的数字](https://leetcode.cn/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/) <Badge type="success">easy</Badge>

- 动态规划
- [题解](https://leetcode.cn/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/solution/jian-zhi-offer-62-yuan-quan-zhong-zui-ho-dcow/)
- 推导结论：`f(n) = (f(n-1) + m) % n;`

自底向上解法

```js
/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
//  f(n) = (f(n-1) + m) % n;
var lastRemaining = function (n, m) {
  let x = 0;
  for (let i = 2; i <= n; i++) {
    x = (x + m) % i;
  }
  return x;
};
```

自顶向下解法

```js
/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
//  f(n) = (f(n-1) + m) % n;
var lastRemaining = function (n, m) {
  const memo = Array(n + 1).fill(-1);
  const f = (n) => {
    if (n === 1) return 0;
    if (memo[n] !== -1) return memo[n];

    memo[n] = (f(n - 1) + m) % n;
    return memo[n];
  };

  return f(n);
};
```
