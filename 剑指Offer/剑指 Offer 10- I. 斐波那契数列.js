// 剑指 Offer 10- I. 斐波那契数列: https://leetcode.cn/problems/fei-bo-na-qi-shu-lie-lcof/
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
