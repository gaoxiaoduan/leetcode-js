## [剑指 Offer 55 - I. 二叉树的深度](https://leetcode.cn/problems/er-cha-shu-de-shen-du-lcof/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(N) 看似是O(1) 然而在函数递归调用的时候有函数调用栈的空间，所以最坏情况下是O(N)

- 思路(遍历解法对应 回溯解法)
- 遍历二叉树
- 遍历时，为每个节点标记层级
- 记录最大值并返回，可以 只比较叶子节点的层级，做优化提升
- 跟[104. 二叉树的最大深度](/js-logs/binary-tree#104二叉树的最大深度)相同

```js
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
    let res = 0;
    const dfs = (root, deep) => {
        if (root === null) return;
        deep++;
        if (root.left === null && root.right === null) {
            res = Math.max(res, deep)
        }
        dfs(root.left, deep);
        dfs(root.right, deep);
        deep--;
    }
    dfs(root, 0);

    return res;
};
```

「分解子问题」解法：对应动态规划解法

```js
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 定义函数返回节点的最大深度
var maxDepth = function (root) {
    if (root === null) return 0;
    let leftDepth = maxDepth(root.left);
    let rightDepth = maxDepth(root.right);
    return Math.max(leftDepth, rightDepth) + 1;
};
```
