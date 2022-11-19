/*
 * @lc app=leetcode.cn id=438 lang=javascript
 *
 * [438] 找到字符串中所有字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  let need = new Map(),
    window = new Map();
  for (let i of p) {
    need.set(i, need.has(i) ? need.get(i) + 1 : 1);
  }

  let left = 0,
    right = 0;
  let valid = 0;
  let res = [];
  while (right < s.length) {
    let c1 = s[right]; // 将要进入window的字符
    right++; // 放大窗口
    // 更新数据
    if (need.has(c1)) {
      window.set(c1, window.has(c1) ? window.get(c1) + 1 : 1);
      if (window.get(c1) === need.get(c1)) {
        valid++;
      }
    }

    while (right - left >= p.length) {
      if (valid === need.size) {
        res.push(left);
      }

      let c2 = s[left];
      left++;
      // 更新数据
      if (need.has(c2)) {
        if (window.get(c2) === need.get(c2)) {
          valid--;
        }
        window.set(c2, window.get(c2) - 1);
      }
    }
  }

  return res;
};
// @lc code=end
