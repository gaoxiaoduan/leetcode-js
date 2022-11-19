// 剑指 Offer 55 - I. 二叉树的深度: https://leetcode.cn/problems/er-cha-shu-de-shen-du-lcof/
// 本题与主站 104 题相同：https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 定义函数返回节点的最大深度
var maxDepth = function (root) {
  if (root === null) return 0;
  let leftDepth = maxDepth(root.left);
  let rightDepth = maxDepth(root.right);
  return Math.max(leftDepth, rightDepth) + 1;
};
