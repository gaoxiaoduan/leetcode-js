// 剑指 Offer II 097. 子序列的数目: https://leetcode.cn/problems/21dk04/
// 本题与主站 115 题相同： https://leetcode-cn.com/problems/distinct-subsequences/

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  // 以s视角出发，寻找子序列的个数
  const m = s.length,
    n = t.length;
  const memo = new Array(m + 1).fill(-1).map((_) => new Array(n + 1).fill(-1));

  // 定义dp(i,j)
  // 返回[i,...]中 子序列t[j,...]的数量
  const dp = (i, j) => {
    // base case
    if (j === n) return 1; // 就走到头，匹配一个子序列
    if (n - j > m - i) return 0; // t的剩余长度大于s，说明不匹配，直接返回0
    if (memo[i][j] !== -1) return memo[i][j];

    let res = 0;
    if (s[i] === t[j]) {
      // aab,ab => a_b , _ab
      res += dp(i + 1, j + 1) + dp(i + 1, j);
    } else {
      // 如果s[i]!==t[j],i继续往后走，跟t[j]进行尝试匹配
      res += dp(i + 1, j);
    }
    memo[i][j] = res;
    return res;
  };

  return dp(0, 0);
};
