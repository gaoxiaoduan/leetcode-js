## [剑指 Offer 11. 旋转数组的最小数字](https://leetcode.cn/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/) <Badge type="success">easy</Badge>

- 类似题目[154.寻找旋转排序数组中的最小值 II](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii/)
- [题解](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii/solution/154-find-minimum-in-rotated-sorted-array-ii-by-jyd/)

```js
// 二分法寻找最小值
var findMin = function (nums) {
    let n = nums.length;
    if (n === 1) return nums[0];
    // 原：[0,1,2,2,2,2,3,4,5,6]
    // 后：[2,3,4,5,6,0,1,2,2,2]
    // [2,3,4,5,6,0,1,2,2,2]
    //  l       m    >    r  ==> l=m+1;
    // [2,3,4,5,6,0,1,2,2,2]
    //            l   m = r  ==> r=r-1;
    // [2,3,4,5,6,0,1,2,2,2]
    //            l m < r  ==> r=m;
    // [2,3,4,5,6,0,1,2,2,2]
    //            l
    //            m<r  ==> r = m;
    // 最后l=r;停止寻找

    let left = 0, right = n - 1;
    while (left < right) {
        // let mid = Math.floor((left + right) / 2);
        let mid = left + right >> 1;
        console.log(left, mid, right)
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else if (nums[mid] < nums[right]) {
            right = mid;
        } else if (nums[mid] === nums[right]) {
            right = right - 1;
        }
    }

    return nums[right]
};
```
