/**
 * @param {number} n
 * @return {number[]}
 */
var printNumbers = function (n) {
  const res = [];
  // 生成 n位9 如：n=3 ==> 999
  let end = new Array(n).fill("9").join("");
  for (let i = 1; i <= Number(end); i++) {
    res.push(i);
  }
  return res;
};
