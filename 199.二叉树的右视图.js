/*
 * @lc app=leetcode.cn id=199 lang=javascript
 *
 * [199] 二叉树的右视图
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
 * @return {number[]}
 */
// 层序遍历时，每层的最后一个节点就是右视图的节点
// 为了提高效率，从右向左层序遍历，每层第一个节点就是右视图的节点
var rightSideView = function (root) {
  const res = [];
  if (root === null) return res;
  const q = [root];

  while (q.length) {
    const rightView = q[0];
    for (let i = 0, len = q.length; i < len; i++) {
      let curNode = q.shift();
      curNode.right && q.push(curNode.right);
      curNode.left && q.push(curNode.left);
    }
    res.push(rightView.val);
  }
  return res;
};
// @lc code=end
