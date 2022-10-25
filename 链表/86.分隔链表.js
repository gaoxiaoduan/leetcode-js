/*
 * @lc app=leetcode.cn id=86 lang=javascript
 *
 * [86] 分隔链表
 */

// @lc code=start
// 时间复杂度O(1)
// 空间复杂度O(N)
// 思路
// - 使用指针p遍历链表
// - 使用两个新链表分别保存小于x的节点，和大于x的节点
// - 最后将两个链表合并返回即可
// - 注意：虚拟头节点的链接使用
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
var partition = function (head, x) {
  let newList1 = new ListNode(-1),
    newList2 = new ListNode(-1);
  let p1 = newList1,
    p2 = newList2;
  let p = head;
  while (p) {
    if (p.val >= x) {
      p2.next = new ListNode(p.val);
      p2 = p2.next;
    } else {
      p1.next = new ListNode(p.val);
      p1 = p1.next;
    }
    p = p.next;
  }

  // 将两个分好类的节点相连
  p1.next = newList2.next;
  return newList1.next;
};
// @lc code=end
