---
title: "常见前端设计模式"
---

## 什么是设计模式？

是软件开发中常见问题的通用解决方案。

简单来说：设计模式就像做饭的“菜谱”，它不是具体的菜，而是一种做菜的方法，帮助你更快、更好地完成任务。


## 单例模式

📌 场景：全局状态管理（Vuex、Pinia）、缓存管理、请求实例化。

💡 单例模式的作用：确保**某个类只有一个实例**，并提供一个访问它的全局入口。

 ###  ✅  实际案例：Vuex / Pinia 
```javascript

class Store {
  constructor() {
    if (!Store.instance) {
      this.state = {};
      Store.instance = this;
    }
    return Store.instance;
  }
}

const store1 = new Store();
const store2 = new Store();

console.log(store1 === store2); // ✅ true，保证全局唯一

```
 “Vuex/Pinia 本质上就是一个单例模式的应用，**保证全局状态只有一个实例，避免数据不一致。**”

<br/>

## 观察者模式

📌 场景：Event Bus（Vue 事件总线）、Vue 2 响应式原理

💡 观察者模式的作用：一对多的依赖管理，当一个对象（发布者）发生变化时，所有监听它的对象（订阅者）都会收到通知。

### ✅ 实际案例：Event Bus（Vue 事件总线）

在 Vue 2 里，我们有时需要让没有直接关系的组件进行通信（比如兄弟组件），

这时可以用 Event Bus 作为一个“中间人”，订阅事件（on） 和 触发事件（emit）。

```javascript
// EventBus.js
class EventBus {
  constructor() {
    this.events = {};
  }
  on(event, callback) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
  }
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }
}

const bus = new EventBus();
export default bus;

// A：发送事件
<template>
  <button @click="sendMessage">发送消息</button>
</template>

<script>
import bus from "@/utils/EventBus";

export default {
  methods: {
    sendMessage() {
      bus.emit("hello", "来自 A.vue 的问候 👋");
    }
  }
};
</script>


// B: 监听接收
<template>
  <div>消息：{{ message }}</div>
</template>

<script>
import bus from "@/utils/EventBus";

export default {
  data() {
    return {
      message: ""
    };
  },
  created() {
    bus.on("hello", this.receiveMessage);
  },
  beforeDestroy() {
    bus.off("hello", this.receiveMessage); // 卸载时解绑
  },
  methods: {
    receiveMessage(data) {
      this.message = data;
    }
  }
};
</script>


```

**补充：**

Event Bus： 本质是一个 Vue 实例，利用 Vue 内部的 事件机制（$emit / $on） 来实现跨组件通信，符合观察者模式，
因为多个组件可以订阅同一个事件。

Vue 3 ：移除了 Vue 实例上的 $on 和 $emit，所以不能直接用 new Vue() 作为 Event Bus。

<br/>

## 工厂模式

📌 场景：组件动态创建、封装 API 请求、创建 Vue 组件实例。

💡 工厂模式的作用：提供一个通用的接口，根据不同条件创建不同的实例，而不是直接 new。

 ✅ 实际案例：封装 API 请求

```javascript

class AxiosFactory {
  static createInstance(baseURL) {
    return axios.create({
      baseURL,
      timeout: 5000, // 统一设置超时时间
    });
  }
}

// 这样就可以随时创建不同 `baseURL` 的实例
const apiClient1 = AxiosFactory.createInstance("https://api.example.com");
const apiClient2 = AxiosFactory.createInstance("https://api.another.com");

// 直接调用，不用关心 axios 实例的创建细节
apiClient1.get("/users").then(console.log);
apiClient2.get("/products").then(console.log);

```
使用工厂模式封装 axios，可以根据不同的 baseURL 轻松创建不同的请求实例。

**补充static：**

static: 定义“类本身的方法”，而不是实例的方法。
```javascript
class Person {
  static sayHi() {
    console.log("Hi，我是类本身的方法！");
  }

  sayHello() {
    console.log("Hello，我是实例的方法！");
  }
}

// 调用方式
Person.sayHi();       // ✅ 不用 new，直接调用
const p = new Person();
p.sayHello();         // ✅ 要先 new 出一个对象，才能调用
```

<br/>

## 代理模式

📌 场景：Vue 3 响应式、图片懒加载、权限管理

💡 代理模式的作用：创建一个“代理”对象，来控制对目标对象的访问。

 ✅ 实际案例：Vue 3 响应式

 ```javascript
  const data = { name: "Alice", age: 25 };
  
  const reactiveData = new Proxy(data, {
    get(target, prop) {
      console.log(`获取属性: ${prop}`);
      return target[prop];
    },
    set(target, prop, value) {
      console.log(`修改属性: ${prop} = ${value}`);
      target[prop] = value;
      return true;
    }
  });
  
  console.log(1, reactiveData.name);  // ✅ 输出：获取属性: name
  reactiveData.age = 30; // ✅ 输出：修改属性: age = 30
 ```
 Proxy 创建了一个“代理对象” reactiveData， 它能监听对象的 get 和 set 操作，实现响应式更新。

<br/>

 ## 策略模式

📌 场景：表单校验、算法切换、权限控制

💡 策略模式的作用：把不同的逻辑（策略）封装成独立模块，然后根据不同情况动态切换，而不是 if-else 一大堆。

  ✅ 实际案例：表单校验

   ```javascript
   const strategies = {
     isNotEmpty: value => value.trim() !== "" || "不能为空",
     isEmail: value => /\S+@\S+\.\S+/.test(value) || "邮箱格式不正确",
     minLength: (value, length) => value.length >= length || `至少 ${length} 个字符`
   };
 
  function validate(value, type, param) {
    return strategies[type](value, param);
  }
 
   console.log(validate("", "isNotEmpty")); //  "不能为空"
   console.log(validate("test@example.com", "isEmail")); //  true
   console.log(validate("123", "minLength", 5)); // "至少 5 个字符"
   ``` 

   在表单校验中，使用策略模式，把不同的校验规则封装到对象里，避免了 if-else 过多导致的代码混乱。

   <br/>




