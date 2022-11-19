/*
 * @lc app=leetcode.cn id=86 lang=javascript
 *
 * [86] 分隔链表
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
 * @param {number} x
 * @return {ListNode}
 */
/**
 * 时间复杂度O(1)
 * 空间复杂度O(N)
 * 思路
 * - 使用指针p遍历链表
 * - 使用两个新链表分别保存小于x的节点，和大于x的节点
 * - 最后将两个链表合并返回即可
 * - 注意：虚拟头节点的链接使用
 */
var partition = function (head, x) {
  let dummy1 = new ListNode(),
    dummy2 = new ListNode();
  let p1 = dummy1,
    p2 = dummy2;
  let p = head;
  while (p !== null) {
    if (p.val >= x) {
      p2.next = new ListNode(p.val);
      p2 = p2.next;
    } else {
      p1.next = new ListNode(p.val);
      p1 = p1.next;
    }
    p = p.next;
  }
  p1.next = dummy2.next;
  return dummy1.next;
};
// @lc code=end
