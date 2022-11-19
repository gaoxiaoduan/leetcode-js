/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  const str = String(x);
  const len = str.length;
  if (len === 1) return true;
  let p1 = 0,
    p2 = len - 1;

  while (p1 < p2) {
    if (str[p1] !== str[p2]) return false;
    p1++;
    p2--;
  }
  return true;
};
// @lc code=end
