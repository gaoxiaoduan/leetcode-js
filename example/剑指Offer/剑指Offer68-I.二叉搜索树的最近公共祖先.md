## [剑指 Offer 68 - I. 二叉搜索树的最近公共祖先](https://leetcode.cn/problems/er-cha-sou-suo-shu-de-zui-jin-gong-gong-zu-xian-lcof/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(N) 递归：函数调用堆栈

- 思路
- 运用二叉搜索树，`左小 右大`的特性
- 如果 p，q 都小于 root，说明 lca 在左子树
- 如果 p，q 都大于 root，说明 lca 在右子树
- 如果 p <= root，q >= root，说明 root 就是 lca
- 跟[235.二叉搜索树的最近公共祖先](/js-logs/binary-tree#235-二叉搜索树的最近公共祖先)相同

```js
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (root === null) return null;
  if (p.val > q.val) {
    // 保证 p <= q
    return lowestCommonAncestor(root, q, p);
  }
  if (p.val <= root.val && root.val <= q.val) {
    // p <= root <= q
    // 说明p、q分布在root两侧，root就是最近的祖先
    return root;
  }
  if (root.val > q.val) {
    // 说明p、q都在root的左子树
    return lowestCommonAncestor(root.left, p, q);
  } else {
    // 说明p、q都在root的右子树
    return lowestCommonAncestor(root.right, p, q);
  }
};
```
