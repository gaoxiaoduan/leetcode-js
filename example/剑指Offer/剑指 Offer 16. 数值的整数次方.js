// 剑指 Offer 16. 数值的整数次方:https://leetcode.cn/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/
// 本题与主站 50 题相同：https://leetcode-cn.com/problems/powx-n/
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (n === 0) return 1;

  // n是负数
  if (n < 0) {
    return myPow(1 / x, -n);
  }

  // n是奇数
  if (n % 2 === 1) {
    return x * myPow(x, n - 1);
  } else {
    // n 是偶数
    const sub = myPow(x, n / 2);
    return sub * sub;
  }
};
