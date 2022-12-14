## [剑指 Offer 31. 栈的压入、弹出序列](https://leetcode.cn/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/) <Badge type="warning">medium</Badge>

时间复杂度 O(N)
空间复杂度 O(N)

- 思路（模拟栈的出栈）
- 先声明一个 stack 进行入栈，每次入栈都对栈顶元素进行判断
- 判断栈顶和 popped 元素是否相同，若找到了就进行出栈，同时 popped 对应的指针后移，指向第二个出栈元素与栈顶是否相等，若相等继续出栈，指针也后移
- 最后判断，stack 是否为空，若全部一一对应上，说明 popped 的出栈顺序是正确的
- 跟[946.验证栈序列](/js-logs/stack#946验证栈序列)相同

```js
/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function (pushed, popped) {
  const stack = [];
  for (let i = 0, j = 0; i < pushed.length; i++) {
    stack.push(pushed[i]);
    while (stack.length && stack[stack.length - 1] === popped[j]) {
      stack.pop();
      j++;
    }
  }
  return stack.length === 0;
};
```
