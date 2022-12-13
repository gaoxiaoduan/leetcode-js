## [剑指 Offer 14- I. 剪绳子](https://leetcode.cn/problems/jian-sheng-zi-lcof/) <Badge type="warning">medium</Badge>

跟[343.整数拆分](/js-logs/dynamic-programming#343整数拆分)相同

```js
/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function (n) {
  // 定义dp[i]表示 i分解后 的最大乘积
  let dp = new Array(n + 1).fill(0);
  dp[0] = dp[1] = 0; // 0和1不能被拆分
  for (let i = 2; i <= n; i++) {
    let curMax = 0;
    for (let j = 0; j < i; j++) {
      curMax = Math.max(curMax, j * (i - j), j * dp[i - j]);
    }
    dp[i] = curMax;
  }

  return dp[n];
};
```

自顶向下+备忘录

```js
/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function (n) {
  const memo = Array(n + 1).fill(-1);
  // 返回拆解n后的最大乘积
  const dp = (n) => {
    if (n === 0 || n === 1) return n;
    if (memo[n] !== -1) return memo[n];

    let res = -Infinity;
    for (let i = 1; i < n; i++) {
      res = Math.max(res, Math.max(i, dp(i)) * Math.max(n - i, dp(n - i)));
    }
    memo[n] = res;
    return res;
  };

  return dp(n);
};
```
