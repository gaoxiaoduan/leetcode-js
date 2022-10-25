// 剑指 Offer 55 - II. 平衡二叉树: https://leetcode.cn/problems/ping-heng-er-cha-shu-lcof/
// 本题与主站 110 题相同：https://leetcode-cn.com/problems/balanced-binary-tree/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
//  时间复杂度 O(N)
//  空间复杂度 O(1)

//  思路
//  - 为了判断是否平衡，拍脑袋的想法是计算每个节点的最大高度，但是每个节点都算一遍最大深度，时间复杂度比较高
//  - 所以，最好过来想，只计算一次最大深度，在计算过程中判断二叉树是否平衡
//  - 对于每个节点，先算出来左右子树的最大深度，然后在后序遍历的位置，然后根据 左右子树的最大高度 判断平衡性
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
