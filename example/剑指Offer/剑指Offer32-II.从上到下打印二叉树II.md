## [剑指 Offer 32 - II. 从上到下打印二叉树 II](https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/) <Badge type="success">easy</Badge>

- 思路(层序遍历)
- 在每次while循环开始之前，找出当前层级的size
- 然后使用for循环把当前层级的val存放在level的数组中，中间遇到下一层的节点要放入队列中
- 当for循环结束，表示当前层的值已经搜集到level中，push到res中即可
- 跟[102 题](/js-logs/binary-tree#102二叉树的层序遍历)相同

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
    while (q.length) {
        const size = q.length;
        let level = [];
        for (let i = 0; i < size; i++) {
            const current = q.shift();
            level.push(current.val);
            current.left && q.push(current.left);
            current.right && q.push(current.right);
        }
        res.push(level);
    }

    return res;
};
```
