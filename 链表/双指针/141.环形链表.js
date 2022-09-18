/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
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
 * @param {ListNode} head
 * @return {boolean}
 */
/**
 * 时间复杂度 O(N)
 * 空间复杂度 O(1)
 * 思路
 * - 声明快慢两个指针进行赛跑
 * - 如果有环，快慢指针肯定会重逢
 * - 如果没有环，则不会重逢
 */
var hasCycle = function (head) {
  let p1 = head,
    p2 = head;
  while (p1 && p2 && p2.next) {
    p1 = p1.next;
    p2 = p2.next.next;
    if (p1 === p2) return true;
  }
  return false;
};
// @lc code=end
