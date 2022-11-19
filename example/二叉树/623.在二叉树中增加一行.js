/*
 * @lc app=leetcode.cn id=623 lang=javascript
 *
 * [623] 在二叉树中增加一行
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
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}
 */
var addOneRow = function (root, val, depth) {
  if (depth === 1) {
    let newTree = new TreeNode(val);
    newTree.left = root;
    return newTree;
  }

  let curLevel = 0;
  const traverse = (root) => {
    if (root === null) return;
    curLevel++;
    if (curLevel === depth - 1) {
      let leftTree = new TreeNode(val);
      let rightTree = new TreeNode(val);
      leftTree.left = root.left;
      rightTree.right = root.right;
      root.left = leftTree;
      root.right = rightTree;
    }
    traverse(root.left);
    traverse(root.right);
    curLevel--;
  };
  traverse(root);

  return root;
};
// @lc code=end
