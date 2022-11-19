// 链接：https://leetcode.cn/problems/successor-lcci
// 2562.面试题 04.06. 后继者
// 难度：中等
// 设计一个算法，找出二叉搜索树中指定节点的“下一个”节点（也即中序后继）。

// 如果指定节点没有对应的“下一个”节点，则返回null。

// 示例 1:

// 输入: root = [2,1,3], p = 1

//   2
//  / \
// 1   3

// 输出: 2
// 示例 2:

// 输入: root = [5,3,6,2,4,null,null,1], p = 6

//       5
//      / \
//     3   6
//    / \
//   2   4
//  /
// 1

// 输出: null

/*
 * @lc app=leetcode.cn id=2562 lang=javascript
 *
 * [2562] 面试题 04.06. 后继者
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
var inorderSuccessor = function (root, p) {
  let prev = null;
  let cur = root;
  let stack = [];
  while (stack.length || cur) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }

    cur = stack.pop();
    if (prev === p) {
      // 若prve是p，则返回cur
      return cur;
    }
    prev = cur;
    cur = cur.right;
  }
  return null;
};
// @lc code=end
