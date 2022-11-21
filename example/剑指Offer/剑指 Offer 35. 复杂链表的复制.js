// 剑指 Offer 35. 复杂链表的复制：https://leetcode.cn/problems/fu-za-lian-biao-de-fu-zhi-lcof/
// tag:medium

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
//  时间复杂度O(n)
//  空间复杂度O(n)
//  - 思路（回溯+map）
//  - 因为链表里有random，所以不能使用遍历+创建新节点的方式进行拷贝
//  - 我们用回溯递归的特性，在回溯返回的位置，单独对节点进行拷贝，并存储到map中
//  - 若map中已经存有改节点的copy节点，直接返回即可，减少重复拷贝
var copyRandomList = function (head, map = new Map()) {
  if (head === null) return null;
  if (!map.has(head)) {
    map.set(head, {
      val: head.val,
      // next: copyRandomList(head.next, map),
      // random: copyRandomList(head.random, map)
    });
    Object.assign(map.get(head), {
      next: copyRandomList(head.next, map),
      random: copyRandomList(head.random, map)
    })
  }

  return map.get(head);
};
