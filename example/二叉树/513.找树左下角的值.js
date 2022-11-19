/*
 * @lc app=leetcode.cn id=513 lang=javascript
 *
 * [513] 找树左下角的值
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
// 有点像二叉树的最大深度那一道题
// 当第一次到达最大深度时候，那颗树就是左下角的树
var findBottomLeftValue = function (root) {
  let res = 0;
  let level = 0,
    maxLevel = 0;

  const traverse = (root) => {
    if (root === null) return;
    level++;
    if (level > maxLevel) {
      maxLevel = level;
      res = root.val;
    }
    traverse(root.left);
    traverse(root.right);
    level--;
  };
  traverse(root);
  return res;
};
// @lc code=end
