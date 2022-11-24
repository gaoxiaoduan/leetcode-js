## [剑指 Offer II 103. 最少的硬币数目](https://leetcode.cn/problems/gaM7Ch/) <Badge type="warning">medium</Badge>

跟[322题](https://leetcode-cn.com/problems/coin-change/)相同

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const memo = [];
  // 定义dp(n)可以返回amount为n时，所需要的最少硬币数量
  function dp(n) {
    if (n === 0) return 0;
    if (n < 0) return -1;
    if (memo[n] !== undefined) return memo[n];
    let res = Infinity;
    for (const coin of coins) {
      const subProblem = dp(n - coin);
      if (subProblem === -1) continue;
      res = Math.min(res, 1 + subProblem);
    }
    memo[n] = res === Infinity ? -1 : res;
    return memo[n];
  }

  return dp(amount);
};

```
