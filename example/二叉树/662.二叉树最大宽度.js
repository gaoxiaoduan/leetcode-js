/*
 * @lc app=leetcode.cn id=662 lang=javascript
 *
 * [662] 二叉树最大宽度
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
/**
 * 根据完全二叉树特性，若根为x，左节点为2x，右节点为2x+1,
 * 然后根据标记的节点，获取节点，判断当前层节点与，当前层左节点的最大宽度
 */
var widthOfBinaryTree = function (root) {
  if (root === null) return 0;
  let leftArr = [];
  let maxWidth = 1;
  const traverse = (root, id, depth) => {
    if (root === null) return;
    if (leftArr.length === depth - 1) {
      leftArr.push(id);
    } else {
      maxWidth = Math.max(maxWidth, id - leftArr[depth - 1] + 1);
    }
    // (id * 2) % 100000000007 取模，为了防止溢出
    traverse(root.left, (id * 2) % 100000000007, depth + 1);
    traverse(root.right, ((id * 2) % 100000000007) + 1, depth + 1);
  };
  traverse(root, 1, 1);

  return maxWidth;
};
// @lc code=end
