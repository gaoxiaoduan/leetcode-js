## [剑指 Offer 68 - II. 二叉树的最近公共祖先](https://leetcode.cn/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/) <Badge type="success">easy</Badge>

时间复杂度 O(N) N 为二叉树节点个数，最坏情况下， 要遍历所有节点
空间复杂度 O(N) 最坏情况下递归深度为 N

- 思路
- 首先明确 base，当递归到 底部节点，返回`null`
- 定义递归函数，返回一个树中 找到的 `p或q节点` （在前序位置找）
- 分情况讨论
- 三种情况（在后序位置判断）
  - 情况 1: p 和 q 分别在不同的子树中，left 和 right 都有值，说明 root 就是 ans
  - 情况 2:p 和 q 在树中没有被找到，说明没有公共祖先，返回 null
  - 情况 3:p 和 q 在同一颗树下，那么这个时候 left 和 right 肯定有一侧是找不到，返回 null 的，那么返回另一侧最先找到的节点即可
  - 情况 2 也可以省略不写，这种情况包含在情况 3 的三元判断中了

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
  // 前序遍历位置
  // 在向下递归的过程中（分叉），若发现p或q，那么就返回找到的节点
  if (root === q || root === p) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // 后序遍历
  // 1.发现left和right都有值，那么说明root是ans
  if (left !== null && right !== null) return root;

  // 2.发现left和right都没有值，那么说明没有ans，返回null
  // 包含在了最下面的元判断中，可以省略
  // if (left === null && right === null) return null;

  // 3.若只有一边有值，说明在同一边，返回另一边最近找到的作为ans
  return left === null ? right : left;
};
```
