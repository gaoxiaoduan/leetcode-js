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
var flatten = function (root) {
  if (root === null) return;

  flatten(root.left);
  flatten(root.right);
  // 后序遍历，将左右子树展开为一个链表
  let left = root.left;
  let right = root.right;

  // 将左子树放到右子树的位置
  root.left = null;
  root.right = left;

  // 将原来右子树接到现在右子树的后面
  let p = root;
  while (p && p.right !== null) {
    p = p.right;
  }
  p.right = right;
};
// @lc code=end
