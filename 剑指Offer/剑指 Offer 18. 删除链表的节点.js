// 剑指 Offer 18. 删除链表的节点: https://leetcode.cn/problems/shan-chu-lian-biao-de-jie-dian-lcof/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
// 创建一个新的链表，其中不包含val
var deleteNode = function (head, val) {
  let newList = new ListNode(-1);
  let q = newList; // q负责结果链表
  let p = head; // p 负责遍历原链表
  while (p) {
    if (p.val !== val) {
      q.next = new ListNode(p.val); // 创建新的节点
      q = q.next;
    }

    p = p.next;
  }
  return newList.next;
};

// 直接删除链表中的值
var deleteNode1 = function (head, val) {
  let newList = new ListNode(-1);
  newList.next = head; // 创建一个新的头节点，连接head

  let pre = newList; // 上一个节点
  let p = head; // 当前节点
  while (p) {
    // 找到val
    if (p.val === val) {
      // 删除当前节点
      pre.next = pre.next.next;
    }

    pre = p; // 保留上一个节点
    p = p.next; // 当前节点后移动
  }

  return newList.next;
};
