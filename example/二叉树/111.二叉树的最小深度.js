/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
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
 * DFS会经过所有的节点
 * 而BFS求最小的深度，只需要找到离root节点最近的根结点
 * 返回该根节点所在的层数即可，所以无需遍历所有节点，时间复杂度低，但是空间复杂度高一点
 */
// BFS解法
var minDepth = function (root) {
  if (root === null) return 0;
  const q = [root];
  let deep = 1;
  while (q.length) {
    const len = q.length;
    for (let i = 0; i < len; i++) {
      const cur = q.shift();
      if (cur.left === null && cur.right === null) return deep;
      if (cur.left !== null) q.push(cur.left);
      if (cur.right !== null) q.push(cur.right);
    }
    deep++;
  }
  return deep;
};

// DFS解法
var minDepthDFS = function (root) {
  let res = Infinity;
  const traverse = (root, deep) => {
    if (root === null) return;
    if (root.left === null && root.right === null) {
      res = Math.min(deep, res);
    }
    traverse(root.left, deep + 1);
    traverse(root.right, deep + 1);
  };
  traverse(root, 1);
  return res === Infinity ? [] : res;
};
// @lc code=end
