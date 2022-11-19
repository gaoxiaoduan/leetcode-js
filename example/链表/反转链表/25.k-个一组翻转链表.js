/*
 * @lc app=leetcode.cn id=25 lang=javascript
 *
 * [25] K 个一组翻转链表
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
 * @param {number} k
 * @return {ListNode}
 */
/**
 * 时间复杂度 O(N)
 * 空间复杂度 O(logN)
 * 思路
 * - 先知道如何反转单个链表，然后在这个函数上拓展出[a,b)区间的反转函数
 * - 然后再分段去递归反转这个链表，若a，b的范围不足k，则不需要反转
 * - 将反转后的链表链接出来
 */
var reverseKGroup = function (head, k) {
  if (head === null) return null;
  let a = head,
    b = head;
  for (let i = 0; i < k; i++) {
    // base case
    if (b === null) return head;
    b = b.next;
  }
  let newHead = reverse(a, b);
  a.next = reverseKGroup(b, k);
  return newHead;
};

// 以链表head到b的链表,翻转的是[head,b)区间，返回新的head
var reverse = function (head, b) {
  let pre = null,
    cur = head,
    next = head;
  while (cur !== b) {
    next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  // 返回反转后的头节点
  return pre;
};
// @lc code=end
