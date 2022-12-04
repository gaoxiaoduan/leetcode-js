## [剑指 Offer 36. 二叉搜索树与双向链表](https://leetcode.cn/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/) <Badge type="warning">medium</Badge>

时间复杂度O(N) N为节点个数
空间复杂度O(N) N为递归栈的深度

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202212041222174.png" style="max-width:100%" />
  <div align=center>图解</div>
</div>

- 思路
- 此题只允许原地修改，且结果有序，所以优先想到中序遍历的方法
- 要购构造双向链表，就要对两个节点进行互相引用
- 所以遍历过程中需要使用`pre`保存前一个节点，然后更改left和right，保持pre和当前节点互相引用
- 结果需要双向链表的head和tail也相互引用，所以，遍历过程中要保存head节点
- tail节点在遍历结束时，pre就是tail节点
- 最后更改头尾节点的left和right，互相引用，返回head即可
- 跟[426题](https://leetcode-cn.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list/)相似

```js
/**
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyList = function (root) {
    if (root === null) return null;
    let head = null, pre = null;
    const dfs = (root) => {
        if (root === null) return;
        // --前序位置--
        dfs(root.left);
        // --中序位置--
        if (pre === null) {
            // 如果pre在中序遍历为null，说明，走到了最左边
            // 也就是走到了头
            head = root;
        } else {
            // 回退时
            // pre为1节点
            // root为2节点
            // 1.right 指向2
            // 2.left 指向1
            // 构建双向链表
            pre.right = root;
            root.left = pre;
        }
        pre = root;
        // --后序位置--
        dfs(root.right);
    }

    dfs(root);
    // 头尾互指，构成一个更大的双向脸部
    head.left = pre;
    pre.right = head;

    return head;
};
```
