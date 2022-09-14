/*
 * @lc app=leetcode.cn id=872 lang=javascript
 *
 * [872] 叶子相似的树
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
  const nums1 = [];
  const nums2 = [];
  traverse(root1, nums1);
  traverse(root2, nums2);
  let res = true;
  let len = nums1.length > nums2.length ? nums1.length : nums2.length;
  for (let i = 0; i < len; i++) {
    if (nums1[i] !== nums2[i]) {
      return (res = false);
    }
  }
  return res;
  // 也可以使用字符串比较
  // return nums1.join("-") === nums2.join("-");
};

const traverse = (root, nums) => {
  if (root === null) return;
  if (root.left === null && root.right === null) nums.push(root.val);
  traverse(root.left, nums);
  traverse(root.right, nums);
};
// @lc code=end
