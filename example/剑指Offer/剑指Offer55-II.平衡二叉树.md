## [剑指 Offer 55 - II. 平衡二叉树](https://leetcode.cn/problems/ping-heng-er-cha-shu-lcof/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(1)

- 思路
- 为了判断是否平衡，拍脑袋的想法是计算每个节点的最大高度，但是每个节点都算一遍最大深度，时间复杂度比较高
- 所以，最好过来想，只计算一次最大深度，在计算过程中判断二叉树是否平衡
- 对于每个节点，先算出来左右子树的最大深度，然后在后序遍历的位置，然后根据 左右子树的最大高度 判断平衡性
- 跟[110.平衡二叉树](/js-logs/binary-tree#110平衡二叉树)相同
- 跟[剑指Offer55-I.二叉树的深度](/js-logs/sword-point-offer#剑指-offer-55---i-二叉树的深度)相似

```js
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
  let res = true;

  const traverse = (root) => {
    if (root === null) return 0;
    if (!res) return; // res 已经为false了，可以停止遍历了

    const leftMaxDepth = traverse(root.left);
    const rightMaxDepth = traverse(root.right);
    if (Math.abs(leftMaxDepth - rightMaxDepth) > 1) {
      res = false;
    }
    return Math.max(leftMaxDepth, rightMaxDepth) + 1;
  };

  traverse(root);
  return res;
};
```
