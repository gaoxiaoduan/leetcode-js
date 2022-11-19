/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

// 反转以head为起点的n个节点，返回新的头节点
let successor = null; // 后继
var reverseN = function (head, n) {
  if (n === 1) {
    successor = head.next; // 保存后继
    return head;
  }
  // 以head.next为起点的n-1个节点，返回新的头节点
  let last = reverseN(head.next, n - 1);
  head.next.next = head;
  head.next = successor;
  return last;
};

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  if (left === 1) {
    // 当left为1时，可以看做反转前n个节点
    return reverseN(head, right);
  }
  // 前进到反转的起点 触发base case
  head.next = reverseBetween(head.next, left - 1, right - 1);
  return head;
};
// @lc code=end
