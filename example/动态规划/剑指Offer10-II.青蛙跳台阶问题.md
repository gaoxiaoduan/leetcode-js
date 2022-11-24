## [剑指 Offer 10- II. 青蛙跳台阶问题](https://leetcode.cn/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/) <Badge type="success">easy</Badge>

跟[70题](https://leetcode-cn.com/problems/climbing-stairs/)相同

```js
/**
 * @param {number} n
 * @return {number}
 */
var numWays = function (n) {
  const memo = new Array(n + 1).fill(0);
  const dp = (n) => {
    if (n === 0) return 1;
    if (n <= 2) return n;
    if (memo[n] > 0) return memo[n];

    memo[n] = (dp(n - 1) + dp(n - 2)) % 1000000007; // 防止溢出
    return memo[n];
  };

  return dp(n);
};

```
