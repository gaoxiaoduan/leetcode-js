/*
 * @lc app=leetcode.cn id=889 lang=javascript
 *
 * [889] 根据前序和后序遍历构造二叉树
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
 * @param {number[]} preorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
// [ 1, 2, 4, 5, 3, 6, 7] ==> preorder
//   ^  ^     ^
//   ｜ ｜     |
//   根 左---左结束

// [ 4, 5, 2, 6, 7, 3, 1] ==> postorder
//   ^     ^           ^
//   | len |           |
// 左结束---左          根
var constructFromPrePost = function (preorder, postorder) {
    const build = (preorder, preStr, preEnd, postorder, postStr, postEnd) => {
        if (preStr > preEnd) return null;// 边界判断
        if (preStr === preEnd) return new TreeNode(preorder[preStr]); // [1]
        // 根结点
        let root = new TreeNode(preorder[preStr]);
        let leftIndex = postorder.indexOf(preorder[preStr + 1]);
        let leftSize = leftIndex - postStr + 1;
        root.left = build(preorder, preStr + 1, preStr + leftSize, postorder, postStr, leftIndex);
        root.right = build(preorder, preStr + leftSize + 1, preEnd, postorder, leftIndex + 1, postEnd - 1);
        return root;
    }
    return build(preorder, 0, preorder.length - 1, postorder, 0, preorder.length - 1);
};
// @lc code=end

