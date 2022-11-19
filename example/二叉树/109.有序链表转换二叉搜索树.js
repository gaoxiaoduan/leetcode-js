/*
 * @lc app=leetcode.cn id=109 lang=javascript
 *
 * [109] 有序链表转换二叉搜索树
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function (head) {
  return build(head, null);
};

// [begin,end)内的链表，构建为BST
const build = (begin, end) => {
  if (begin === end) return null;

  const mid = getMid(begin, end);
  let root = new TreeNode(mid.val);
  root.left = build(begin, mid);
  root.right = build(mid.next, end);
  return root;
};

const getMid = (begin, end) => {
  let mid = begin,
    fast = begin;
  while (fast !== end && fast.next !== end) {
    mid = mid.next;
    fast = fast.next.next;
  }
  return mid;
};
// @lc code=end
