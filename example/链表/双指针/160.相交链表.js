/*
 * @lc app=leetcode.cn id=160 lang=javascript
 *
 * [160] 相交链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
/**
 * 时间复杂度 O(N)
 * 空间复杂度 O(1)
 * 思路
 * - 难点在于，如何让指针【同时】指向相交的点
 * - 指针p1指向headA，p2指向headB，
 * - 当p1遍历结束，让p1去遍历headB，p2也如此
 * - 这样相当于把headA和headB拼接起来，当两个指针的值相等，说明找到了相同的起点
 */
var getIntersectionNode = function (headA, headB) {
  let p1 = headA,
    p2 = headB;
  while (p1 !== p2) {
    if (p1 === null) p1 = headB;
    else p1 = p1.next;
    if (p2 === null) p2 = headA;
    else p2 = p2.next;
  }
  return p1;
};
// @lc code=end
