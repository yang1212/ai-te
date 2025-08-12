---
title: "函数组件 之 组合、自定义Hook"
---

## 函数组件

不支持像类组件那样的继承，但可通过其他方式来实现类似功能，如组合、自定义Hook等。

### 1、什么是组合
组合是指在React中将多个组件结合在一起来创建复杂的 UI 结构。（接地气一点就是我们平时UI、业务组件一样）

以下是一个简单的组合案例：

创建一个包含头部和内容的简单布局组件
```javaScript
// 头部组件
function Header() {
  return <header>This is the header</header>;
}

// 内容组件
function Content() {
  return <div>This is the content</div>;
}

// 布局组件，通过组合 Header 和 Content 组件来创建一个完整的布局
function Layout() {
  return (
    <div>
      <Header />
      <Content />
    </div>
  );
}

// 使用布局组件
function App() {
  return (
    <div>
      <h1>App Component</h1>
      <Layout />
    </div>
  );
}

export default App;

```


<br/>

### 2、什么是自定义Hook

一种用于复用 React 组件逻辑的方式

**1、自定义Hook规则：**

* 命名规则：自定义hook必须以“use”开头，当然是为了区分普通函数和自定义hook啦

* 只在函数组件或其他自定义 Hook 中使用：不能在普通的 JavaScript 函数中使用

* Hooks 的顺序和调用规则： 只能在顶层调用 Hook，不能在条件语句、循环或嵌套函数中调用

是不是对只能在顶层调用 Hook，不能在条件语句、循环或嵌套函数中调用这句话没啥感觉？

**上案例：**
```javaScript
import React, { useState } from 'react';

function Counter() {
  let count;
  if (someCondition) {
    // 违反规则：在条件语句中调用 useState Hook
    [count, setCount] = useState(0);
  } else {
    [count, setCount] = useState(10);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
}
```

**2、自定义一个Hook：**

最简单的案例，一看就会😌

```javaScript
import { useState } from 'react';

// 自定义 Hook，用于增加计数
function useIncrement(initialValue) {
  const [count, setCount] = useState(initialValue);

  // 增加计数
  function increment() {
    setCount(count + 1);
  }

  // 返回状态和操作函数
  return { count, increment };
}

// 使用自定义 Hook 的组件
function CounterComponent() {
  // 使用自定义 Hook 获取增加计数的方法
  const { count、increment }= useIncrement(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default CounterComponent;

```

<br/>

**以上内容皆服务于：** [今天只学一个知识点：hooks](https://github.com/yang1212/collection-about/issues/59) 
