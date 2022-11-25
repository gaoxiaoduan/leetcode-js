## [剑指 Offer 32 - I. 从上到下打印二叉树](https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/) <Badge type="warning">medium</Badge>

层序遍历

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder = function (root) {
    let res = [];
    const q = [];
    if (root !== null) {
        q.push(root);
    }
    while (q.length) {
        const current = q.shift();
        current.left && q.push(current.left);
        current.right && q.push(current.right);
        res.push(current.val);
    }
    return res;
};
```
