// 剑指 Offer 05. 替换空格: https://leetcode.cn/problems/ti-huan-kong-ge-lcof/

/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function (s) {
  const n = s.length;
  if (n === 0) return s;
  const resArr = s.split("");
  let p = 0;
  while (p <= n) {
    if (resArr[p] === " ") {
      resArr[p] = "%20";
    }
    p++;
  }
  return resArr.join("");
};
