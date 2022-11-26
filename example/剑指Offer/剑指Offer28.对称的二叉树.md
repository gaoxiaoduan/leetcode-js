## [剑指 Offer 28. 对称的二叉树](https://leetcode.cn/problems/dui-cheng-de-er-cha-shu-lcof/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(H) 树的高度，递归深度

- 思路
- 主要是比较子树是否对称
- 深度优先过程中比较子树的对称性
- 跟[101. 对称二叉树](/js-logs/binary-tree#101-对称二叉树)相同
- 跟[100. 相同的树](/js-logs/binary-tree#100-相同的树)相似

```js
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
    if (root === null) return true;
    // 检查子树是否对称
    const check = (leftRoot, rightRoot) => {
        if (leftRoot === null || rightRoot === null) return leftRoot === rightRoot;
        if (leftRoot.val !== rightRoot.val) return false;

        // 走到这里说明leftRoot.val === rightRoot.val,然后判断对称子树是否相等
        return check(leftRoot.right, rightRoot.left) && check(leftRoot.left, rightRoot.right);
    }

    return check(root.left, root.right);
};
```
