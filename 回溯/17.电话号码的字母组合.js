/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
// 元素【无重】【不可复用】
var letterCombinations = function (digits) {
  // 构建一个映射关系
  let mapping = [
    "",
    "",
    "abc",
    "def",
    "ghi",
    "jkl",
    "mno",
    "pqrs",
    "tuv",
    "wxyz",
  ];
  const res = [];
  if (digits === "") return [];
  const backTrack = (start, track) => {
    // base case
    if (track.length === digits.length) {
      res.push(track.join(""));
      return;
    }

    for (let i = start; i < digits.length; i++) {
      const digit = Number(digits[i]); // digits==>"23", digit==>2
      for (let c of mapping[digit].split("")) {
        track.push(c);
        backTrack(i + 1, track);
        track.pop();
      }
    }
  };

  backTrack(0, []);
  return res;
};
// @lc code=end
