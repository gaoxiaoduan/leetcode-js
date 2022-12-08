## [剑指 Offer 68 - II. 二叉树的最近公共祖先](https://leetcode.cn/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/) <Badge type="success">easy</Badge>

时间复杂度 O(N) N 为二叉树节点个数，最坏情况下， 要遍历所有节点
空间复杂度 O(N) 最坏情况下递归深度为 N

- 思路
- 明确 base
- 定义函数
- 分情况讨论
- 三种情况
  - 情况 1: p、q 中正好有一个是 root，返回 root
  - 情况 2: p 和 q 分别在不同的子树中，返回 root
  - 情况 3:p 和 q 在同一侧，找 p 和 q 都在的那一侧树的 lca 返回
  - 情况 4:若 leftLCA，rightLCA 都是 null，说明没有找到 lca，直接返 null 即可
  - 情况 4 也可以省略不写，这种情况包含在情况 3 的三元判断中了

跟[236.二叉树的最近公共祖先](/js-logs/binary-tree#236-二叉树的最近公共祖先)相同

```js
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  // base case
  if (root === null) return null;
  // 情况1: p、q中正好有一个是root，返回root
  if (root === p || root === q) return root;

  // 递归得到左右子树的lca
  const leftLCA = lowestCommonAncestor(root.left, p, q);
  const rightLCA = lowestCommonAncestor(root.right, p, q);
  // 情况2: p和q分别在不同的子树中，返回root
  // leftLCA，rightLCA都有值，说明root就是lca
  if (leftLCA !== null && rightLCA !== null) {
    return root;
  }
  // 情况4:若leftLCA，rightLCA都是null，说明没有找到lca，直接返null即可
  // 也可以省略不写，这种情况包含在情况3的三元判断中了
  if (leftLCA === null && rightLCA === null) return null;

  // 情况3:p和q在同一侧，找 p和q都在的那一侧树的lca返回
  return leftLCA === null ? rightLCA : leftLCA;
};
```
