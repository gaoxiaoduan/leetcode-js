/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
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
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
/**
 * 时间复杂度 O(M+N)
 * 空间复杂度 O(1)
 * 思路(双指针)
 * - 两个链表值比较，取较小的值加入链表
 * - 重复第一步，然后将另一个剩下的链表直接指向要返回的链表即可
 */
var mergeTwoLists = function (list1, list2) {
  // 虚拟头节点
  let dummy = new ListNode(),
    p = dummy;
  let p1 = list1,
    p2 = list2;
  while (p1 && p2) {
    if (p1.val > p2.val) {
      // 将较小的p2节点，放入dummy中
      p.next = p2;
      p2 = p2.next;
    } else {
      p.next = p1;
      p1 = p1.next;
    }
    // 指针p偏移
    p = p.next;
  }
  // 将剩下的节点，直接接到新链表到后面
  if (p1 !== null) {
    p.next = p1;
  }
  if (p2 !== null) {
    p.next = p2;
  }
  // 返回真实的节点
  return dummy.next;
};
// @lc code=end
