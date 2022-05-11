/*
 * @lc app=leetcode.cn id=113 lang=javascript
 *
 * [113] 路径总和 II
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
 * @param {number} targetSum
 * @return {number[][]}
 */
// 112是求结果，这道题是求所有的路径结果
// 需要维护一个path，遍历时经过的路径
var pathSum = function (root, targetSum) {
  if (!root) return [];
  let res = [];
  let path = [];
  const traverse = (root, targetSum, path) => {
    if (root === null) return;

    let remain = targetSum - root.val;
    if (root.left === null && root.right === null) {
      if (remain === 0) {
        path.push(root.val);
        res.push([...path]);
        path.pop();
      }
      return;
    }

    path.push(root.val); //进入的时候给path添加值
    traverse(root.left, remain, path);
    path.pop(); // 退出的时候，删除path

    path.push(root.val);
    traverse(root.right, remain, path);
    path.pop();
  };

  traverse(root, targetSum, path);
  return res;
};
// @lc code=end
