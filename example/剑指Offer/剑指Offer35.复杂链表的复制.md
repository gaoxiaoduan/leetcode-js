## [剑指 Offer 35. 复杂链表的复制](https://leetcode.cn/problems/fu-za-lian-biao-de-fu-zhi-lcof/) <Badge type="warning">medium</Badge>

时间复杂度 O(n)
空间复杂度 O(n)

- 思路（回溯+map）
- 因为链表里有 random，所以不能使用遍历+创建新节点的方式进行拷贝
- 我们用回溯递归的特性，在回溯返回的位置，单独对节点进行拷贝，并存储到 map 中
- 若 map 中已经存有改节点的 copy 节点，直接返回即可，减少重复拷贝

```js
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head, map = new Map()) {
  if (head === null) return null;
  if (!map.has(head)) {
    map.set(head, {
      val: head.val,
      // next: copyRandomList(head.next, map),
      // random: copyRandomList(head.random, map)
    });
    Object.assign(map.get(head), {
      next: copyRandomList(head.next, map),
      random: copyRandomList(head.random, map),
    });
  }

  return map.get(head);
};
```
