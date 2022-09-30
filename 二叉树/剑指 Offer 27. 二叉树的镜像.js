// 剑指 Offer 27. 二叉树的镜像: https://leetcode.cn/problems/er-cha-shu-de-jing-xiang-lcof/
// 与226题解法一样

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
/**
 * 时间复杂度 O(N)
 * 空间复杂度 O(H)  h是树的高度，最坏情况下是O(N)
 * 思路
 * - 我们发现只要把二叉树上的每一个节点的左右子节点进行交换，最后的结果就是完全翻转之后的二叉树
 */
// 定义函数：返回当前节点翻转过后的节点
var mirrorTree = function (root) {
  if (root === null) return null;

  let leftRoot = mirrorTree(root.left);
  let rightRoot = mirrorTree(root.right);
  root.left = rightRoot;
  root.right = leftRoot;
  return root;
};
