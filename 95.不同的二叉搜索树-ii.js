/*
 * @lc app=leetcode.cn id=95 lang=javascript
 *
 * [95] 不同的二叉搜索树 II
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
 * @param {number} n
 * @return {TreeNode[]}
 */
// 96题的基础上构建
// 1.穷举所有root节点
// 2.递归构建左右子树BST
// 3.将左右子树BST添加到root上
var generateTrees = function (n) {
  if (n === 0) return [];

  // 定义build返回[lo,hi]区间内，所有BST的集合
  const build = (lo, hi) => {
    let res = [];
    // base case
    if (lo > hi) {
      res.push(null);
      return res;
    }
    // 1.枚举可行的根节点
    for (let i = lo; i <= hi; i++) {
      // 2. 获取所有可行的左右子树集合
      let leftTreeArr = build(lo, i - 1);
      let rightTreeArr = build(i + 1, hi);
      // 3.分别从左右子树中选一课树，拼接到根结点上
      // 这里相当于 96题中的 左右子树集合相乘
      for (const left of leftTreeArr) {
        for (const right of rightTreeArr) {
          let root = new TreeNode(i);
          root.left = left;
          root.right = right;
          res.push(root);
        }
      }
    }

    return res;
  };

  return build(1, n);
};
// @lc code=end
