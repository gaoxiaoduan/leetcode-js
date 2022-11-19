/*
 * @lc app=leetcode.cn id=115 lang=javascript
 *
 * [115] 不同的子序列
 */

// @lc code=start
// 以s的视角出发
// 时间复杂度O(MN)
var numDistinct = function (s, t) {
  const m = s.length,
    n = t.length;

  const memo = new Array(m + 1).fill(-1).map((_) => new Array(n + 1).fill(-1));
  // 定义dp函数
  // 返回s[i,...]中 子序列t[j,...]的数量
  const dp = (i, j) => {
    // base case
    if (j === n) return 1; // 匹配子序列
    if (n - j > m - i) return 0; // t剩余的长度不应该比s的还长

    if (memo[i][j] !== -1) return memo[i][j];

    let res = 0;
    if (s[i] === t[j]) {
      // aab,ab => a_b, _ab
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
// @lc code=end

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
// 以t的视角出发
// 时间复杂度 O(MN) * O(M)  M、N分别为s和t的个数
var numDistinct1 = function (s, t) {
  const memo = new Array(s.length + 1)
    .fill(-1)
    .map((_) => new Array(t.length + 1).fill(-1));
  // 定义函数dp
  // 返回 s[i,...] 中包含t[j,...]的数量
  const dp = (i, j) => {
    if (j === t.length) {
      // 子序列全部匹配
      return 1;
    }
    if (i === s.length) return 0;
    if (memo[i][j] !== -1) return memo[i][j];

    let res = 0;
    for (let k = i; k < s.length; k++) {
      // 当s[k] === t[j]的开头相同
      if (s[k] === t[j]) {
        // 寻找s[k+1,...] 中包含 t[j+1,...]的数量
        res += dp(k + 1, j + 1);
      }
    }
    memo[i][j] === res;
    return res;
  };

  return dp(0, 0);
};
