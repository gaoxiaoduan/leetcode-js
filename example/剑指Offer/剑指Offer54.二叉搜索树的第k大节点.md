## [剑指 Offer 54. 二叉搜索树的第k大节点](https://leetcode.cn/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/) <Badge type="success">easy</Badge>

时间复杂度O(N)
空间复杂度O(1)

- 思路
- 跟[230.二叉搜索树中第K小的元素](/js-logs/binary-tree#230二叉搜索树中第k小的元素)类似
- 不过230是利用中序遍历有序的特点，求第k小，这里求第k大
- 可以在中序位置改变中序的结果为倒序
- 先遍历right，再遍历left就可以了
- 然后使用rank记录当前排名，当rank到k时，返回res即可

```js
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargest = function (root, k) {
    let res = 0;// 记录结果
    let rank = 0; // 记录排名

    const traverse = (root) => {
        if (root === null) return;
        // 先遍历right，使中序结果倒序
        traverse(root.right);
        rank++;
        if (rank === k) {
            res = root.val;
            return;
        }
        traverse(root.left);
    }
    traverse(root);

    return res;
};
```
