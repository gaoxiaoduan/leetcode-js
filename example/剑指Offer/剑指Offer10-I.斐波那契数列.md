## [剑指 Offer 10- I. 斐波那契数列](https://leetcode.cn/problems/fei-bo-na-qi-shu-lie-lcof/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(H) 树的高度，递归深度

- 思路（动态规划）
- 斐波那契数列的求解过程 可以看做是一个二叉树的结构
- 动态转移方程`dp(n) = dp(n-1) + dp(n-2)`
- 添加备忘录进行剪枝优化

```js
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  const memo = new Array(n + 1).fill(-1);
  const dp = (n) => {
    if (n === 0) return 0;
    if (n === 1 || n === 2) return 1;
    if (memo[n] !== -1) return memo[n];

    memo[n] = (dp(n - 1) + dp(n - 2)) % 1000000007;
    return memo[n];
  };
  return dp(n);
};
```
