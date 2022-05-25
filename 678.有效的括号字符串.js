/*
 * @lc app=leetcode.cn id=678 lang=javascript
 *
 * [678] 有效的括号字符串
 */

// @lc code=start
// 思路：
// - 使用两个栈，left存放"(" 的位置，start存放"\*"的位置
// - 遍历字符串，遇到（、\*时，记录位置
// - 遍历过程中遇到 ）时，优先删除left中的（，当left为空时，删除start中的*，若start也为空，说明不匹配，直接返回false
// - 当 ")" 遍历结束，会出现两种情况
// - 1. left中的数量比start多，说明不平衡，无法正确匹配，返回false
// - 2. left中 "(" 的位置，在start的右边，即 "\*("这种情况，也无法正确匹配，返回false
// - 3. 判断完上面两种情况，剩下的情况也就是可以正确匹配的，即start中的数量比left多，start中的\*都在left的右边，\*就可以匹配完所有的(,也就是有效的

/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function (s) {
  let left = [],
    start = [];

  for (let i = 0; i < s.length; i++) {
    const n = s[i];
    if (n === "(") {
      left.push(i);
    } else if (n === "*") {
      start.push(i);
    } else {
      if (left.length === 0) {
        if (start.length === 0) return false;
        start.pop();
      } else {
        left.pop();
      }
    }
  }

  if (left.length > start.length) return false;
  while (left.length && start.length) {
    if (left.pop() > start.pop()) return false;
  }
  return true;
};
// @lc code=end
