// 115.最小栈: https://leetcode.cn/problems/min-stack/
// ![图解115.最小栈](https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202211211040878.png)

var MinStack = function () {
  this.stack = [];
  this.minStack = []; // 保存入栈元素的对应的最小值
};

/**
* @param {number} val
* @return {void}
*/
MinStack.prototype.push = function (val) {
  this.stack.push(val);
  // 维护minStack的栈顶元素最小
  if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
    this.minStack.push(val);
  } else {
    const minStackPeek = this.minStack[this.minStack.length - 1];
    this.minStack.push(minStackPeek);
  }
};

/**
* @return {void}
*/
MinStack.prototype.pop = function () {
  this.stack.pop();
  this.minStack.pop();
};

/**
* @return {number}
*/
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
* @return {number}
*/
MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};

/**
* Your MinStack object will be instantiated and called as such:
* var obj = new MinStack()
* obj.push(val)
* obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.getMin()
*/
