## [剑指 Offer 52. 两个链表的第一个公共节点](https://leetcode.cn/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(1)

- 思路
- 跟[160.相交链表](/js-logs/linked-list#160相交链表)相同

```js
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
// a1 a2 c1 c2 c3
// b1 b2 b3 c1 c2 c3
// 使长度相同,两个链表互相连接到尾部，这样尾部就说一样的，相遇的第一个节点就说第一个公共节点
// a1 a2 c1 c2 c3 b1 b2 b3 [c1] c2 c3
// b1 b2 b3 c1 c2 c3 a1 a2 [c1] c2 c3
var getIntersectionNode = function (headA, headB) {
    let p1 = headA, p2 = headB;
    while (p1 !== p2) {
        if (p1 === null) p1 = headB;
        else p1 = p1.next;

        if (p2 === null) p2 = headA;
        else p2 = p2.next;
    }

    return p1;
};
```
