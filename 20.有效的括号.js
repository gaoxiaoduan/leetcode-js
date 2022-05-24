/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (s === 0) return false;
  if (s.length % 2 === 1) return false;

  let stack = [];
  let leftStr = "{[(";

  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    // if (leftStr.indexOf(c) !== -1) {
    if (leftStr.includes(c)) {
      stack.push(c);
    } else {
      const top = stack[stack.length - 1];
      if (isMath(top, c)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};

const isMath = (left, right) => {
  if (left === "{" && right === "}") return true;
  if (left === "[" && right === "]") return true;
  if (left === "(" && right === ")") return true;
  return false;
};
// @lc code=end
