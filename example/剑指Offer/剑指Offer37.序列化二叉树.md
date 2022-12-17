## [剑指 Offer 37. 序列化二叉树](https://leetcode.cn/problems/xu-lie-hua-er-cha-shu-lcof/) <Badge type="error">hard</Badge>

跟[297.二叉树的序列化与反序列化](/js-logs/binary-tree#297二叉树的序列化与反序列化)相同

```js
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
  const res = [];
  const traverse = (node) => {
    if (node === null) return res.push('Null');
    res.push(node.val);
    traverse(node.left);
    traverse(node.right);
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
  const nodes = data.split(',');

  const deTraverse = (nodes) => {
    if (nodes[0] === 'Null') {
      nodes.shift();
      return null;
    }
    const rootVal = nodes.shift();
    const root = new TreeNode(rootVal);

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
```
