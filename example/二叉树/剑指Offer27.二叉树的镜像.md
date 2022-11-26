## [剑指 Offer 27. 二叉树的镜像](https://leetcode.cn/problems/er-cha-shu-de-jing-xiang-lcof/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(H)  h是树的高度，最坏情况下是O(N)
- 思路
- 我们发现只要把二叉树上的每一个节点的左右子节点进行交换，最后的结果就是完全翻转之后的二叉树
- 与[226题](/js-logs/binary-tree#226翻转二叉树)解法一样

```js
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
// 定义函数：返回当前节点翻转过后的节点
var mirrorTree = function (root) {
  if (root === null) return null;

  let leftRoot = mirrorTree(root.left);
  let rightRoot = mirrorTree(root.right);
  root.left = rightRoot;
  root.right = leftRoot;
  return root;
};
```
