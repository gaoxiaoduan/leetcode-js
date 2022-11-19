/*
 * @lc app=leetcode.cn id=83 lang=javascript
 *
 * [83] 删除排序链表中的重复元素
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
 * 时间复杂度O(N)
 * 空间复杂度O(1)
 * 思路
 * - 快慢指针法，与26.题相识
 * - 因为链表已经有序，所以可以使用快指针在前面探路
 * - 当遇到元素不相等的情况时，说明不是重复元素
 * - 此时可以将slow指针的next指向快指针，这样就能让不重复的元素相连接
 * - 然后再将slow指针指向fast，fast指针继续探路
 * - 当fast指针探路结束，断开slow后的所有链接，即slow.next=null;这样做可以维护slow走过的链表不重复，返回head即可
 */
var deleteDuplicates = function (head) {
  if (head === null) return null;
  let slow = head,
    fast = head;
  while (fast !== null) {
    if (fast.val !== slow.val) {
      // 将slow的下一个节点与fast相连
      slow.next = fast;
      // slow移动到fast的位置
      slow = fast;
    }
    fast = fast.next;
  }
  // 断开后面所有连接
  slow.next = null;
  return head;
};
// @lc code=end
