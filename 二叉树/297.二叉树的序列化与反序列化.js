/*
 * @lc app=leetcode.cn id=297 lang=javascript
 *
 * [297] 二叉树的序列化与反序列化
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
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  let res = [];
  const traverse = (root) => {
    if (root === null) return res.push("Null");
    res.push(root.val);
    traverse(root.left);
    traverse(root.right);
  };
  traverse(root);
  return res.toString();
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  const nodes = data.split(",");
  let p = 0;
  const deTraverse = (nodes) => {
    // if (nodes[0] === "Null") {
    //   nodes.shift();
    if (nodes[p] === "Null") {
      p++;
      return null;
    }
    // const root = new TreeNode(parseInt(nodes[0]));
    // nodes.shift();
    const root = new TreeNode(parseInt(nodes[p]));
    p++;

    root.left = deTraverse(nodes);
    root.right = deTraverse(nodes);
    return root;
  };

  return deTraverse(nodes);
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end
