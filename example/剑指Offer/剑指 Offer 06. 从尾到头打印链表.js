// 剑指 Offer 06. 从尾到头打印链表: https://leetcode.cn/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
// 利用递归栈 （先进后出）的特性进行反转结果
var reversePrint = function (head) {
  let res = [];

  const help = (node) => {
    if (node === null) return;
    node.next && help(node.next);
    res.push(node.val);
  };
  help(head);
  return res;
};
