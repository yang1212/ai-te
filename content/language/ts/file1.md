---
title: "知识点归纳"
---

🌞 TypeScript 在运行前需要先编译为 JavaScript，在编译阶段就会进行类型检查，所以 TypeScript 是静态类型。

<br/>

## 目录

* [【 Ts 】基础类型 ](https://github.com/yang1212/collection-about/issues/25)

* [【 Ts 】类 ](https://github.com/yang1212/collection-about/issues/10)

* [【 Ts 】接口 ](https://github.com/yang1212/collection-about/issues/26)

* [【 Ts 】泛型 ](https://github.com/yang1212/collection-about/issues/28)

* [【 Ts 】高级类型 ](https://github.com/yang1212/collection-about/issues/27)

* [【 Ts 】日常实践记录](https://github.com/yang1212/collection-about/issues/44)

<br/>

## 日常实践
1、Vue3：基于接口定义对象
````javaScript
interface UserForm {
  name: string
  age: string
}

const form = reactive<UserForm>({
  name: 'YF',
  age:  18
})
````

2、Vue3：服务端数据返回处理
````javaScript
<template>
  <p>{{baseInfo.name}}</p>
  <p>{{detail.info}}</p>
</template>

interface anyPropInterface {
  [propName: string]: any // 带有任意数量的其它属性
}
const state = reactive<anyPropInterface>({
   baseInfo: {},
   detail: {}
})

tempFn().then((res) => {
  state.baseInfo = res.baseInfo
  state.detail = res.detail
})
````
<br/>

## 常见报错

1、[不能将类型“HTMLElement | null”分配给类型“HTMLElement” 错误](https://www.cnblogs.com/wangyang0210/p/15693372.html)
````javaScript
// 因为food是我们定义,所以不存在获取不到的情况,因此!用来表示排除null和undefined
this.element = document.getElementById('food')!
or
this.element = document.getElementById('food') as HTMLElement
````

2、动态属性返回导致编译警告
````javaScript
interface anyPropInterface {
  [propName: string]: any // 带有任意数量的其它属性
}
let lineChart = reactive<anyPropInterface>({}) // {{ lineChart.name }}
````

3、[类型'string []'不能分配给类型'never []'](https://mlog.club/article/5637149)
````javaScript
xAxis.data = [{"name": "a"}] // error
xAxis: {
    type: 'category',
    data: [] // 更改为：[] as string[] 
}
````
