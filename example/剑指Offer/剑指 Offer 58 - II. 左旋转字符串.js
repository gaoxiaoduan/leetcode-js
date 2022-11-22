// 剑指 Offer 58 - II. 左旋转字符串: https://leetcode.cn/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/
// tag: easy

/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
// - 若不能使用substring函数
// - 也可以将字符串转成数组操作，然后把被截取的字符串拼到数组后面
var reverseLeftWords = function (s, n) {
  return s.substring(n) + s.substring(0, n);
};
