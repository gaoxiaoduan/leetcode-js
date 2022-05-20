/*
 * @lc app=leetcode.cn id=865 lang=javascript
 *
 * [865] 具有所有最深节点的最小子树
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
class Result {
  constructor(node, depth) {
    this.node = node;
    this.depth = depth;
  }
}
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var subtreeWithAllDeepest = function (root) {
  const traverse = (root) => {
    if (root === null) return new Result(null, 0);
    const left = traverse(root.left);
    const right = traverse(root.right);
    if (left.depth > right.depth) return new Result(left.node, left.depth + 1);
    if (left.depth < right.depth) return new Result(right.node, right.depth + 1);
    return new Result(root, left.depth + 1);
  };
  return traverse(root).node;
};
// @lc code=end
