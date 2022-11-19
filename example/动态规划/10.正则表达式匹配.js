/*
 * @lc app=leetcode.cn id=10 lang=javascript
 *
 * [10] 正则表达式匹配
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
/**
 * 时间复杂度 O(mn)
 * 空间复杂度 O(mn)
 */
var isMatch = function (s, p) {
  const m = s.length,
    n = p.length;
  const memo = new Map(); // 备忘录

  // 含义：计算 p[j..] 是否匹配 s[i..]
  const dp = (s, i, p, j) => {
    // base case
    // 1.当j走到尾部的时候，判断i是否也走到头
    if (j === n) return i === m;

    // 2.当i走到头
    if (i === m) {
      // 2.1 如果能匹配上 x* 肯定是成对出现的，为下一步进行筛选
      if ((n - j) % 2 !== 0) return false;
      // 2.2 检查是否为 x*y*z* 这种形式
      for (; j + 1 < n; j += 2) {
        if (p[j + 1] !== "*") {
          return false;
        }
      }
      // 2.3 上面两种情况都不满足，那么说明剩下的p可以被匹配到
      return true;
    }

    // 设置备忘录，消除重叠子问题
    const key = i + " " + j;
    if (memo.has(key)) return memo.get(key);

    let res = false;

    // 1.s[i] === p[j]，匹配「.」的时候
    if (s[i] === p[j] || p[j] === ".") {
      // 1.1 匹配上「*」
      if (j + 1 < n && p[j + 1] === "*") {
        // 「.*」 的情况下，「*」可能会匹配0次到多次
        res =
          dp(s, i, p, j + 2) || // 0次
          dp(s, i + 1, p, j); // 多次
      } else {
        // 「.」的情况下就 常规匹配1次
        res = dp(s, i + 1, p, j + 1);
      }
    } else {
      // 2.s[i] !== p[j],不匹配「.」的时候
      if (j + 1 < n && p[j + 1] === "*") {
        // 2.1「*」的情况下,匹配0次,然后看下一个字符是否匹配
        // eg: s = "aa", p = "b*aa"
        res = dp(s, i, p, j + 2);
      } else {
        // s[i] !== p[j] 没有「.」 没有「*」 匹配就无法进行下去了
        res = false;
      }
    }

    memo.set(key, res);
    return res;
  };

  return dp(s, 0, p, 0);
};
// @lc code=end
