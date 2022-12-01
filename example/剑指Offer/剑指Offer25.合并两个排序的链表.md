## [剑指 Offer 25. 合并两个排序的链表](https://leetcode.cn/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/) <Badge type="success">easy</Badge>

时间复杂度 O(M+N)
空间复杂度 O(1)

思路
- 两个链表值比较，取较小的值加入链表
- 重复第一步，然后将另一个剩下的链表直接指向要返回的链表即可
- 跟[21.合并两个有序链表](/js-logs/linked-list#21合并两个有序链表)相同

```js
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
    let newList = new ListNode(-1);
    let p = newList;
    let p1 = l1, p2 = l2;

    while (p1 !== null && p2 !== null) {
        if (p1.val < p2.val) {
            p.next = p1;
            p1 = p1.next;
        } else {
            p.next = p2;
            p2 = p2.next;
        }
        p = p.next;
    }

    if (p1 === null) {
        p.next = p2;
    }
    if (p2 === null) {
        p.next = p1;
    }

    return newList.next;
};
```
