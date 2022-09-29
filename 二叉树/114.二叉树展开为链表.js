/*
 * @lc app=leetcode.cn id=114 lang=javascript
 *
 * [114] 二叉树展开为链表
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
/**
 * 时间复杂度 O(N)
 * 空间复杂度 O(1)
 * 思路
 * - 分解子问题解法
 * - 将 root 的左子树和右子树拉平
 * - 将 root 的左子树替换成root的右子树，然后把原来的右子树，接到现在右子树的尾部
 */
var flatten = function (root) {
  if (root === null) return;
  flatten(root.left);
  flatten(root.right);
  // 后序遍历位置
  let left = root.left;
  let right = root.right;

  // 1.先将左子树清空
  root.left = null;
  // 2.将原来左子树，替换到原来右子树的位置
  root.right = left;

  // 3.将原来的右子树接到现在右子树的后面
  let p = root;
  while (p.right !== null) {
    p = p.right;
  }
  p.right = right;
};
// @lc code=end
