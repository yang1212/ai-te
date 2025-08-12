---
title: "常用Hooks"
---

## React Hooks
v16.8新增功能, 让你在不编写Class的情况下，使用state等React特性,作为辅助Function Component的工具。

### [1、useState](https://github.com/yang1212/collection-about/issues/65)
* 函数调用时保存变量,等效于 class 组件中的 setState


### [2、useEffect](https://zh-hans.reactjs.org/docs/hooks-effect.html)

与class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，
只是它被合并为同一个API

* 空数组 []
```javaScript
  useEffect(() => {
    console.log('组件挂载时执行');
    return () => {
      console.log('组件卸载时执行');
    };
  }, []);
```
* 传入依赖项
```javaScript
 useEffect(() => {
    console.log('count 变化时执行');
 }, [count]);
```

* 不传第二个参数（每次渲染后都执行的操作，所以用的很少）
````javaScript
 useEffect(() => {
    console.log('每次渲染后都执行');
    return () => {
      console.log('清理函数，组件卸载时执行');
    };
 });
````

### [3、useContext](https://github.com/yang1212/collection-about/issues/6)
* 跨越组件层级直接传递变量，实现共享

### 4、useMemo 
缓存计算结果: 避免重复计算
```
 // 通过 useMemo 缓存计算结果
  const memoizedValue = useMemo(() => {
    return count * 2;
  }, [count]); // 依赖项为 count
```
### 📍 补充容易混淆点：

**高阶组件：React.memo:** 

📌 缓存组件:  父组件重新渲染时，浅比较 props，如果 props 没变，不会重新渲染子组件。
📌 React.memo 是用来优化函数组件的，它不能用于类组件。
📌 浅比较:  指的是 只检查对象的第一层属性是否相等。

```javascript
const MyComponent = React.memo(({ count }) => {
  console.log("组件渲染了！");  
  return <div>Count: {count}</div>;
});
```

### [5、useCallback](https://github.com/yang1212/collection-about/issues/35)

<br/>

