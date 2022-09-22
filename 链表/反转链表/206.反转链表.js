/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
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
 * 时间复杂度 O(N)
 * 空间复杂度 O(1)
 * 思路
 * - 链表太长不容易看出如何反转，所以可以看作两个最短链表反转
 * - 短链表反转，只需要将 当前节点的next 指回 给 上一个节点
 * - 所以使用p1为头节点，p2为后节点，双指针一直指回，然后让双指针共同前进即可
 * - 因为p1最后会指向一个null，p2会指向5
 * - 所以最后返回p2链表
 */
var reverseList = function (head) {
  let p1 = head;
  let p2 = null;
  while (p1 !== null) {
    let temp = p1.next;
    p1.next = p2; // 反转
    p2 = p1;
    p1 = temp;
  }
  return p2;
};

/**
 * 递归解法
 * @param {*} head
 * @returns
 */
// 函数定义:返回链表反转后的头节点
var reverseList2 = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  let last = reverseList2(head.next);
  head.next.next = head;
  head.next = null;
  return last;
};
// @lc code=end
