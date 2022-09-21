/*
 * @lc app=leetcode.cn id=876 lang=javascript
 *
 * [876] 链表的中间结点
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
/**
 * 时间复杂度 O(N/2)
 * 空间复杂度 O(1)
 * 思路(快慢指针)
 * - 使用快慢指针
 * - 慢指针走一步，快指针走两步
 * - 这样当快指针走到头，慢指针刚好走一半
 * - 这里让慢指针先走，如果链表长度是偶数，慢指针刚好指向第二个数
 */
var middleNode = function (head) {
  let fast = head,
    slow = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};
// @lc code=end
