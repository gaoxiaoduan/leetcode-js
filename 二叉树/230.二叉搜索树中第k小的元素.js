/*
 * @lc app=leetcode.cn id=230 lang=javascript
 *
 * [230] 二叉搜索树中第K小的元素
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
 * @param {number} k
 * @return {number}
 */
// 利用二叉搜索树中序遍历有序的特性
var kthSmallest = function (root, k) {
  // const res = [];
  let kVal,
    n = 0;
  const traverse = (root) => {
    if (root === null) return;
    traverse(root.left);
    // res.push(root.val);
    n++;
    if (n === k) {
      kVal = root.val;
      return;
    }
    traverse(root.right);
  };
  traverse(root);
  // return res[k - 1];
  return kVal;
};
// @lc code=end
