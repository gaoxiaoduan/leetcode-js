/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  // need为统计t出现的次数
  let need = new Map(),
    window = new Map();
  for (let i of t) {
    need.set(i, need.has(i) ? need.get(i) + 1 : 1);
  }
  // valid为字符串满足的数量
  let valid = 0;
  let left = 0,
    right = 0;
  let res = "";
  while (right < s.length) {
    // c是将移入窗口的数据
    let c1 = s[right];
    // 放大窗口
    right += 1;
    // 数据更新操作
    if (need.has(c1)) {
      window.set(c1, window.has(c1) ? window.get(c1) + 1 : 1);
      if (window.get(c1) === need.get(c1)) {
        // 当window中的字符，已经满足need，valid++
        valid += 1;
      }
    }

    // 当valid满足need的size，说明已经找到符合条件的子串了,需要缩小窗口继续找最小
    while (valid === need.size) {
      // 更新结果
      let newStr = s.substring(left, right);
      if (!res || newStr.length < res.length) res = newStr;

      // c2是将移除窗口的数据
      let c2 = s[left];
      // 缩小窗口
      left += 1;
      // 更新数据
      if (need.has(c2)) {
        if (window.get(c2) === need.get(c2)) {
          valid -= 1;
        }
        window.set(c2, window.get(c2) - 1);
      }
    }
  }
  return res;
};
// @lc code=end
