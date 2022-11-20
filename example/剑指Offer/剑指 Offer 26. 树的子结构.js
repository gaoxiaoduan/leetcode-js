// 剑指 Offer 26. 树的子结构: https://leetcode.cn/problems/shu-de-zi-jie-gou-lcof/
// tag:medium

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
 var isSubStructure = function (A, B) {
  if (A === null || B === null) return false;

  //  对比rootA，rootB子结构是否可以匹配上
  const compareTree = (rootA, rootB) => {
      // base case
      // 当递归左右子树相比的时候，发现rootB已经走到null了，说明rootA,rootB子结构相同
      if (rootB === null) return true;

      // 当rootB不为null，但rootA已经是null，说明不是同样的子结构
      if (rootB !== null && rootA === null) return false;
      if (rootA.val !== rootB.val) return false;

      return compareTree(rootA.left, rootB.left) && compareTree(rootA.right, rootB.right);
  };

  // 如果A,B的val相等且 A，B也有相等子结构，那么就返回true
  if (A.val === B.val && compareTree(A, B)) return true;

  // 递归判断A.left || A.right,只要有一个是B的subTree，也可以返回true
  return isSubStructure(A.left, B) || isSubStructure(A.right, B);
};
