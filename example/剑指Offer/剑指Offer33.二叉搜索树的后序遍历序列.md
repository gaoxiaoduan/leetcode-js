## [剑指 Offer 33. 二叉搜索树的后序遍历序列](https://leetcode.cn/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/) <Badge type="warning">medium</Badge>

时间复杂度 O(N^2): 每轮遍历只减去一个节点，递归占用 O(N)，最坏情况下，二叉树退化为链表，每次减去一个节点，都需要遍历一遍树，时间复杂度 O(N)
空间复杂度 O(N) : 最坏情况下（链表）递归深度为 O(N)

- 思路（递归分治）
- 根据 BST 后序遍历的特性去递归判断：例如`[1,3,2,6,5]`
- 5 是根节点[1..2]是左节点[6]是右节点
- 根据特性区分左右子树，若左右子树也满足 BST 后序遍历的特性，那么就说明结果可靠
- 递归分析
  - 终止条件，当 i>=j,说明只有一个节点了，不用判断正确性，返回 true
  - 声明指针，寻找[i,j]中，第一个大于 j 的元素为 m，说明[i,m-1]是左子树，[m,j]是右子树
  - 然后判断左子树是否都小于根节点，右子树是否都大于根节点
  - 在区分左右子树的时候，其实已经判断了左子树都比根节点小了，只需要继续去判断右子树的有效性
  - 将指向 m 的指针 p 继续后移，判断条件是[m,j]的元素都是大于根节点，若确实如此，指针 p 最后会指向 j
  - 判断 j===p，可以判断当前数组是否符合特性
  - 若符合特性，递归进去，判断左右子树是否「都满足」
  - `return j===p && f[i,m-1] && f[m,j-1]`

```js
/**
 * @param {number[]} postorder
 * @return {boolean}
 */
var verifyPostorder = function (postorder) {
  return traverse(postorder, 0, postorder.length - 1);
};

var traverse = function (postorder, i, j) {
  // base case
  if (i >= j) return true;
  let p = i;
  while (postorder[p] < postorder[j]) p++;
  let m = p; // m用来区分左右子树[i,m-1] [m,j];
  while (postorder[p] > postorder[j]) p++; // 判断后面的元素，是否比根「j」大
  // 若p===j，说明是[i,j]满足后序遍历的特性
  // 继续判断左右子树是否满足特性
  return (
    p === j && traverse(postorder, i, m - 1) && traverse(postorder, m, j - 1)
  );
};
```
