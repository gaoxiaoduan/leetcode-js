## [剑指 Offer 07. 重建二叉树](https://leetcode.cn/problems/zhong-jian-er-cha-shu-lcof/) <Badge type="warning">medium</Badge>

跟[105.从前序与中序遍历序列构造二叉树](/js-logs/binary-tree#105从前序与中序遍历序列构造二叉树)相同

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  /**
    preorder = [3,  9,  20,  15,  7]
                ⬆  |l|  |    r   |
                根

    inorder =  [9,  3,  15,  20,  7]
               |l|  ⬆   |    r   |
                    根
    定义：
    前序遍历数组为preorder[preStart,preEnd]
    中序遍历数组为inorder[inStart,inEnd]
    构造这个二叉树，并返回根节点
    */
  const build = (preStart, preEnd, inStart, inEnd) => {
    if (preStart > preEnd) return null;
    const rootVal = preorder[preStart]; // 前序遍历的第一个节点是根结点
    const index = inorder.indexOf(rootVal); // 在中序遍历中找到根节点的index，根节点左边是左子树，右边是右子树
    const leftSize = index - inStart; // 在中序遍历中 根节点 - 开始 = leftSize

    const root = new TreeNode(rootVal);
    // 左子树，前序索引 （preStart + 1，preStart + leftSize） 中序索引（inStart,rootIndex -1）
    root.left = build(preStart + 1, preStart + leftSize, inStart, index - 1);
    // 右子树 前序（preStart + leftSize + 1, preEnd） 中序(rootIndex+1,inEnd)
    root.right = build(preStart + leftSize + 1, preEnd, index + 1, inEnd);
    return root;
  };

  return build(0, preorder.length - 1, 0, inorder.length - 1);
};
```
