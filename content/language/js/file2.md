---
title: "数组方法汇总"
---


每次操作数组、字符串时，记忆力偶尔会抽风。清晰的归类方便查阅，也让记忆更加顺畅，毕竟大脑喜欢有规律的事务**👊**

## 一、数组遍历

### map
**不改变原数组**：遍历数组中每一个值， 根据所需定义返回值
````javaScript
[1, 1].map((item) => { return '自定义' }) // ['自定义', '自定义']
````

### forEach
**不改变原数组**：遍历数组中每一个值，没有返回值
````javaScript
[1].forEach((item) => { console.log(item) }) // 1
````

### filter
**不改变原数组**： 返回满足条件的数据项（数组)
````javaScript
[{num: 2}].filter((item) => { return item.num > 1 }) // 找到：[{num: 2}]   |   未找到: []
````

### find
**不改变原数组**：返回满足条件的第一个元素的值（对象）

**记忆补充**: 总把filter与find返回值记混，filter既是过滤，可存在多个满足条件，一定是数组。而find是找满足条件第一个值，故对象非它莫属。
````javaScript
[{num: 2}].find((item) => { return item.num > 1 }) // 找到：{num: 2} | 未找到: undefined
````

### findIndex
**不改变原数组**：返回满足条件的第一个元素的索引位置，如果不存在，则返回-1
````javaScript
[{num: 2}].findIndex((item) => { return item.num > 1 }) // 找到：0  |  未找到:  -1
````

### indexOf
**不改变原数组**：返回数组/字符串中指定元素首次出现的位置，如果不存在，则返回-1

**数组/字符串通用**：粗看indexOf与findIndex类似，都是寻找索引位置。但实际对比来看，findIndex拓展性更好，更适合数组。而indexOf相比适合简单的查询~
````javaScript
// 数组
['hello', 'world'].indexOf('world') // 1

// 字符串
'hello'.indexOf('e') // 1
````

### some
**不改变原数组**：存在一项为true，则返回true 
````javaScript
[2, 3].some((item) => { return item > 2 }) // true
````

### every
**不改变原数组**：每一项为true，则返回true  
````javaScript
[2, 3].every((item) => { return item > 1 }) // true
````

### reduce
**不改变原数组**：返回累计处理的结果，常用于求和等
````javascript
let purchases = [
    { item: "Widget", price: 10 },
    { item: "Gadget", price: 5 },
    { item: "Doodad", price: 5 }
];

let totalPrice = purchases.reduce((accumulator, currentPurchase) => {
    return accumulator + currentPurchase.price;
}, 0); // 20
````

<br/>

## 二、数组操作

### push
**改变原数组**：将元素添加到数组的末尾，并返回该数组的新长度
````javaScript
let arr = [1, 2, 3]
let length = arr.push(4)
console.log(arr)  // [1, 2, 3, 4]
console.log(length)   // 4
````

### pop
**改变原数组**：删除数组最后一个元素，并返回该元素的值；数组为空时，返回undefined
````javaScript
let arr = [1, 2, 3]
let value = arr.pop()
console.log(arr)  // [1, 2]
console.log(value)  // 3
````

### unshift
**改变原数组**：将元素添加到数组的头部，并返回该数组的新长度
````javaScript
let arr = [1, 2, 3]
let length = arr.unshift(0)
console.log(arr)  // [0, 1, 2, 3]
console.log(length)  // 4
````

### shift
**改变原数组**：删除数组中第一个元素，并返回该元素的值；数组为空时，返回undefined 
````javaScript
let arr = [1, 2, 3]
let value = arr.shift()
console.log(arr)  // [2, 3]
console.log(value)  // 1
````

### splice
**改变原数组**：用于添加或删除数组中的元素。（从0开始）

**数组/字符串通用**：**👊**
````javaScript
array.splice(index, howmany, item1）（从何处添加/删除元素、应该删除多少元素、要添加的元素）

// 添加元素
let fruits = ["A", "B", "E"]
fruits.splice(2,0,"C","D")  //  fruits输出：["A", "B", "C", "D", "E"]

// 删除元素
let fruits = ["A", "B", "C", "D"]
fruits.splice(2,2) //  fruits输出：["A", "B"]

// 替换元素
let fruits = ["A", "D", "C"]
fruits.splice(1,1,'B') //  fruits输出：["A", "B", “C”]
````

### slice
**不改变原数组**：返回选定的元素（从0开始）。

**数组/字符串通用**：**👊**
````javaScript
array.splice(start, end）// start：开始位置（包括该元素), end：结束位置（不包括该元素）

// 数组
['hello', 'world'].slice(1, 2) // world

// 字符串
'hello'.slice(1,2) // 'e'
````

### concat
**不改变原数组**：合并两个或两个以上数组，返回一个新数组
````javaScript
let arr1 = [1, 2]
let arr2 = [3, 4]
let arr3 = [5]
let arr = arr1.concat(arr2, arr3)
console.log(arr) // [1, 2, 3, 4, 5]
````

### join
**不改变原数组**：把数组中所有元素转换为一个字符串，可设置参数指定数组元素之间的分隔符
````javaScript
let arr = [1, 2, 3]
let value = arr.join('a')
console.log(value) // '1a2a3a'
````

### includes
**不改变原数组**：检测数组元素中是否含有指定元素 
````javaScript
[1, 2, 3].includes(2)   // true
````

<br/>

## 总结

### 基于以上有如下归类：
**改变原数组的方法**: splice、push、pop、unshift、shift

**不改变原数组方法**: slice、map、forEach、filter、find、findIndex、indexOf、some、every、reduce、concat、join、includes