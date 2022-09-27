/*
 * @lc app=leetcode.cn id=567 lang=javascript
 *
 * [567] 字符串的排列
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  let need = new Map(),
    window = new Map();
  for (const i of s1) {
    need.set(i, need.has(i) ? need.get(i) + 1 : 1);
  }

  let left = 0,
    right = 0;
  let valid = 0;
  while (right < s2.length) {
    // 将要进入窗口的字符
    let c1 = s2[right];
    right++; // 放大窗口
    // 更新数据
    if (need.has(c1)) {
      window.set(c1, window.has(c1) ? window.get(c1) + 1 : 1);
      if (window.get(c1) === need.get(c1)) {
        valid++;
      }
    }

    while (right - left >= s1.length) {
      // 符合要求，更新结果
      if (valid === need.size) {
        return true;
      }
      // 将要移出窗口等字符
      let c2 = s2[left];
      left++; // 缩小窗口
      // 更新数据
      if (need.has(c2)) {
        if (window.get(c2) === need.get(c2)) {
          valid--;
        }
        window.set(c2, window.get(c2) - 1);
      }
    }
  }

  return false;
};
// @lc code=end
