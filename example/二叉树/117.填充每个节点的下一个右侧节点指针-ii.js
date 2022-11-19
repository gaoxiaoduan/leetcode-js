/*
 * @lc app=leetcode.cn id=117 lang=javascript
 *
 * [117] 填充每个节点的下一个右侧节点指针 II
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
  if (root === null) return null;
  const q = [root];
  while (q.length) {
    let pur = null; // 当前层
    for (let i = 0, len = q.length; i < len; i++) {
      const node = q.shift();
      if (pur) {
        pur.next = node;
      }
      pur = node;
      node.left && q.push(node.left);
      node.right && q.push(node.right);
    }
  }
  return root;
};
// @lc code=end
