/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
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
 * @param {number} n
 * @return {ListNode}
 */
/**
 * 时间复杂度 O(N)
 * 空间复杂度 O(1)
 * 思路
 * - 需要先找到倒数第n节点的前一个节点（n+1）,然后将第个n节点删除即可
 */
var removeNthFromEnd = function (head, n) {
  let dummy = new ListNode();
  dummy.next = head;
  // 要删除倒数n个节点，要先获取前一个节点，也就是(n+1)
  let x = getKthFromEnd(dummy, n + 1);
  x.next = x.next.next;
  return dummy.next;
};

// 剑指 Offer 22. 链表中倒数第k个节点
// https://leetcode.cn/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/
// 获取链表的倒数第k个节点
var getKthFromEnd = (head, k) => {
  let p1 = head;
  for (let i = 0; i < k; i++) {
    p1 = p1.next;
  }
  let p2 = head;
  while (p1 !== null) {
    p1 = p1.next;
    p2 = p2.next;
  }
  return p2;
};
// @lc code=end
