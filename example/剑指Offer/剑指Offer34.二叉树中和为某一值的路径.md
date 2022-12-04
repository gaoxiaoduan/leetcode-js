## [剑指 Offer 34. 二叉树中和为某一值的路径](https://leetcode.cn/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/) <Badge type="warning">medium</Badge>

- 典型的回溯
- 遍历一遍就出结果
- 遍历过程中记录走过的路径，同时记录remain
- 当走到叶子节点时递归结束，这个时候判断remain是否为0，若为0说明是一条路径，将path添加到res中
- 跟[113.路径总和-ii](/js-logs/binary-tree#113路径总和-ii)相同

```js
/**
 * @param {TreeNode} root
 * @param {number} target
 * @return {number[][]}
 */
var pathSum = function (root, target) {
    const res = [];

    const backTrack = (root, sum, track) => {
        if (root === null) return;
        const remain = sum - root.val;
        // 当走到叶子结点
        if (root.left === null && root.right === null) {
            // 判断remain是否为0,说明找到一条路径
            if (remain === 0) {
                track.push(root.val);
                res.push([...track]);
                track.pop();
            }
            return;
        }

        track.push(root.val);
        backTrack(root.left, remain, track);
        track.pop();

        track.push(root.val);
        backTrack(root.right, remain, track);
        track.pop();
    }

    backTrack(root, target, []);
    return res;
};
```
