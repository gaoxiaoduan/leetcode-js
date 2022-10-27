/*
 * @lc app=leetcode.cn id=264 lang=javascript
 *
 * [264] 丑数 II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// 合并2，3，5倍速的链表
var nthUglyNumber = function (n) {
  if (n === 1) return 1;
  let p_2 = 1,
    p_3 = 1,
    p_5 = 1; // 理解为头节点的值
  let p2 = 1,
    p3 = 1,
    p5 = 1; // 理解为链表头节点
  // 结果链表
  const ugly = new Array(n + 1).fill(0);
  // 结果链表上的指针
  let p = 1;

  while (p <= n) {
    let min = Math.min(p_2, p_3, p_5);
    ugly[p] = min;
    p++;
    // 指针后移
    if (min === p_2) {
      p_2 = ugly[p2] * 2;
      p2++;
    }
    if (min === p_3) {
      p_3 = ugly[p3] * 3;
      p3++;
    }
    if (min === p_5) {
      p_5 = ugly[p5] * 5;
      p5++;
    }
  }

  return ugly[n];
};
// @lc code=end
