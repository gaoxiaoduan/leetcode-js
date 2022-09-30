/*
 * @lc app=leetcode.cn id=116 lang=javascript
 *
 * [116] 填充每个节点的下一个右侧节点指针
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
/**
 * 时间复杂度 O(N)
 * 空间复杂度 O(logN)
 * 思路
 * - 最初想法，是直接将root.left.next = root.right,但是这样的话，跨节点的树就没办法连接
 * - 例如：5的next没办法跟6连接到一起
 * - 所以使用一个辅助函数，将两个相邻节点进行连接，从而实现跨节点相连
 * - 将节点之间的空隙看成一颗树，然后去遍历这颗树
 */

// 也可以使用117题的层序遍历方法
// 这里是完全二叉树，使用递归更方便
var connect = function (root) {
  if (root === null) return null;
  traverse(root.left, root.right);
  return root;
};

const traverse = (node1, node2) => {
  if (node1 === null || node2 === null) return;

  node1.next = node2;

  traverse(node1.left, node1.right);
  traverse(node2.left, node2.right);

  traverse(node1.right, node2.left); // 重点：跨树向连节点
};
// @lc code=end
