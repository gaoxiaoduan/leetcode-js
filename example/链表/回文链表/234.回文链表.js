/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
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
 * @return {boolean}
 */
/**
 * 时间复杂度 O(N)
 * 空间复杂度 O(N)
 * 思路
 * - 反转链表，判断两个链表的值是否完全想等
 * - 利用函数递归的调用栈，可以拿到反转链表的值
 * - 然后再后续遍历的位置进行判断，然后再将left指针向右偏移即可
 */
var isPalindrome = function (head) {
  let left = head;

  var traverse = function (right) {
    if (right == null) return true;
    // 后序遍历位置，相当于反转了链表，因为上面的递归函数，让函数入栈了，出栈的第一个函数，就是链表最后一位
    // 这里相当于，让链表的首位进行判断
    let res = traverse(right.next); // 右指针左移
    res = res && right.val === left.val;
    left = left.next; // 左指针右移
    return res;
  };

  return traverse(head);
};
// @lc code=end
