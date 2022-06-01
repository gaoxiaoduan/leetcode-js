/*
 * @lc app=leetcode.cn id=450 lang=javascript
 *
 * [450] 删除二叉搜索树中的节点
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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (root === null) return null;
  if (root.val === key) {
    // 1.root为叶子节点
    if (root.left === null && root.right === null) return null;
    // 2.root只有一个叶子节点
    if (root.left === null && root.right !== null) return root.right;
    if (root.right === null && root.left !== null) return root.left;
    // 3.root有两个叶子节点
    // 此时要找左子树中最大节点（右子树最小节点）来替换当前节点
    // if(root.right !== null && root.left !== null) {}
    let minNode = getMin(root.right);
    root.val = minNode.val; // 替换当前节点的val
    // 删除右子树中的最小节点
    root.right = deleteNode(root.right, minNode.val);
  } else if (root.val < key) {
    root.right = deleteNode(root.right, key);
  } else if (root.val > key) {
    root.left = deleteNode(root.left, key);
  }
  return root;
};

const getMin = (root) => {
  while (root.left !== null) {
    root = root.left;
  }
  return root;
};
// @lc code=end
