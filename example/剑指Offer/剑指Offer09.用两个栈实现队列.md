## [剑指 Offer 09. 用两个栈实现队列](https://leetcode.cn/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/) <Badge type="success">easy</Badge>

- 思路
- 根据栈`先进后出`的特性,使用两个栈表示队列`先进先出`的特性
- 此题目跟[232.用栈实现队列](/js-logs/stack#232用栈实现队列)相似

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202210251429165.png" style="max-width:100%" />
  <div align=center>图解</div>
</div>

```js
var CQueue = function () {
  this.stack1 = []; // |==
  this.stack2 = []; // |==
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.stack1.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  if (this.stack2.length === 0) {
    while (this.stack1.length > 0) {
      this.stack2.push(this.stack1.pop());
    }
  }

  const res = this.stack2.pop();
  return res === undefined ? -1 : res;
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
```
