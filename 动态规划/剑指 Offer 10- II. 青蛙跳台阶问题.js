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
