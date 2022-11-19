/*
 * @lc app=leetcode.cn id=222 lang=javascript
 *
 * [222] 完全二叉树的节点个数
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
 * @return {number}
 */
// 利用完全二叉树的节点是 2^树高度 - 1
// 时间复杂度O(logN*logN)
// 每次都有一个hl===hr的情况，必有一边的时间复杂度是LogN
// 另一边while循环的时间复杂度是LogN
var countNodes = function (root) {
  if (root === null) return 0;
  let l = root,
    r = root;
  let hr = 0,
    hl = 0;
  while (l !== null) {
    l = l.left;
    hl++;
  }
  while (r !== null) {
    r = r.right;
    hr++;
  }
  if (hl === hr) {
    return Math.pow(2, hl) - 1;
  } else {
    return 1 + countNodes(root.left) + countNodes(root.right);
  }
};
// @lc code=end
