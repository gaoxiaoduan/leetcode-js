/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
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
 * @return {ListNode}
 */
/**
 * 时间复杂度 O(N)
 * 空间复杂度 O(1)
 * 思路
 * - 使用快慢指针找到相遇点
 * - 然后将其中一个指针重置
 * - 再将两个指针共同向前走，再次相遇的地方就是这个环的头
 */
var detectCycle = function (head) {
  let p1 = head,
    p2 = head;
  while (p2 && p2.next) {
    p1 = p1.next;
    p2 = p2.next.next;
    // 若p1===p2结束循环
    // 此时有两种情况
    // 1.p1,p2是相同节点，说明有环
    // 2.p1,p2都是null，说明没环
    if (p1 === p2) break;
  }
  if (p2 === null || p2.next === null) return null;
  p1 = head;
  while (p1 !== p2) {
    p1 = p1.next;
    p2 = p2.next;
  }
  return p1;
};
// @lc code=end
