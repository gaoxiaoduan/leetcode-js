/*
 * @lc app=leetcode.cn id=331 lang=javascript
 *
 * [331] 验证二叉树的前序序列化
 */

// @lc code=start
/**
 * @param {string} preorder
 * @return {boolean}
 */
var isValidSerialization = function (preorder) {
  let edge = 1; // 一条指向根节点的虚拟边
  for (const i of preorder.split(",")) {
    if (i === "#") {
      edge--; // 空节点消耗一条边
      if (edge < 0) return false;
    } else {
      edge--; // 节点消耗一条边
      if (edge < 0) return false;
      edge += 2; // 生成两条边
    }
  }
  return edge === 0; // 最后不应该有空闲边
};

//--------------------------------
// 反序列化解法
var isValidSerialization1 = function (preorder) {
  const nodes = [];
  for (const i of preorder.split(",")) {
    nodes.push(i);
  }
  // 参考https://leetcode.cn/submissions/detail/252764742/ 反序列化过程
  const traverse = (nodes) => {
    if (nodes.length === 0) return false;
    // 前序遍历位置
    let firstNode = nodes.shift();
    if (firstNode === "#") return true;
    // 前序遍历位置结束
    return traverse(nodes) && traverse(nodes);
  };
  // nodes.length === 0保证遍历全部
  return traverse(nodes) && nodes.length === 0;
};
// @lc code=end
