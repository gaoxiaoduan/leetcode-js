## [剑指 Offer 32 - III.从上到下打印二叉树III](https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/) <Badge type="warning">medium</Badge>

- 思路
- 跟[剑指 Offer 32 - II. 从上到下打印二叉树 II](/js-logs/sword-point-offer#剑指-offer-32---ii-从上到下打印二叉树-ii)相似
- 在层序遍历的基础上，改变推入level的顺序即可
- 使用levelFlag变量，交替push和unshift的推入方式

```js
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    const q = [];
    if (root !== null) {
        q.push(root);
    }

    const res = [];
    let levelFlag = true;
    while (q.length) {
        const size = q.length;
        const level = [];
        for (let i = 0; i < size; i++) {
            const current = q.shift();
            if (levelFlag) {
                level.push(current.val);
            } else {
                level.unshift(current.val);
            }
            current.left && q.push(current.left);
            current.right && q.push(current.right);
        }
        levelFlag = !levelFlag;
        res.push(level);
    }

    return res;
};
```
