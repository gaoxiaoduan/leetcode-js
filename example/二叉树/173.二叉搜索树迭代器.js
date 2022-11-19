/*
 * @lc app=leetcode.cn id=173 lang=javascript
 *
 * [173] 二叉搜索树迭代器
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
// 思路：使用栈模拟中序遍历的递归过程
/**
 * @param {TreeNode} root
 */
var BSTIterator = function (root) {
  this.traverseLeft(root);
};

BSTIterator.prototype.stack = [];
BSTIterator.prototype.traverseLeft = function (node) {
  while (node !== null) {
    this.stack.push(node);
    node = node.left;
  }
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  let curNode = this.stack.pop();
  this.traverseLeft(curNode.right);
  return curNode.val;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.stack.length !== 0;
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
// @lc code=end
