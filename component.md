# 组件

* 组件用于将UI分为一个个独立、可复用的小部件。  
* 组件可以有属性（约定赋值后在组件内不可修改）和状态（约定可以在组件内部修改）。  
* 组件的名称首字母要大写（约定）。
* 组件只能有一个根元素。

## 无状态组件

1. 定义
    ```jsx
    //无状态，无属性。
    const Hello = () => <div>Hello</div>
    //无状态，无属性，带事件处理。
    const HelloEv = () => <div onClick={() => alert("clicked")}>Hello, click me.</div>  
    //无状态，有属性。事件处理函数也可以通过属性传递进来。
    const HelloSb = (props: { name: string }) => <div>Hello, {props.name}</div>
    ```
1. 特性
    * 组件不会被实例化，性能提升。
    * 因为不会被实例化，所以不能访问this对象。
    * 没有生命周期。
    * 同样的props会得到同样的渲染结果。
    * 代码简练。

## 有状态组件

## 渲染组件

```jsx
ReactDOM.render(<Welcome />, document.getElementById("welcome"))
ReactDOM.render(<Hello n="react baby"/>, document.getElementById("baby"))       //传递属性值
```

```jsx
/组件的泛型指明了props、state的类型结构
class Clock extends React.Component<{ name: string }, { date: Date }> {
    constructor(props: { name: string }) {
        super(props)                        //属性传递上去
        this.state = { date: new Date }     //状态一定要新建一个对象来保存
    }

    render() {
        return (
            <div>
                <h1>Clock:{this.props.name}</h1>    //使用属性值
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>  //使用状态值
            </div>
        )
    }
}
```

## 事件处理

## 生命周期
