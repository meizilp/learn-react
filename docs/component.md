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
1. 要点
    * 组件不会被实例化，性能提升。
    * 因为不会被实例化，所以不能访问this对象。
    * 没有生命周期。
    * 同样的props会得到同样的渲染结果。
    * 代码简练。

## 有状态组件

1. 定义
    ```jsx
    //属性类型
    interface BtnPropsType {
        open: boolean
    }

    //状态类型
    interface BtnStateType {
        open: boolean
    }

    /*
    * 从React.Component继承类。第一个泛型是属性类型；第二个泛型是状态类型。
    * 如果不需要状态，第二个类型可以省略；如果属性也不要，那么两个都可以省略。
    */
    class SwitchButton extends React.Component<BtnPropsType, BtnStateType> {
        constructor(props: BtnPropsType) {  //属性初始化
            super(props)        //基类
            this.state = {      //状态一定要指向一个对象，否则为null
                open: this.props.open
            }

            //要把本类的函数和本类绑定，否则因为js的特性会导致运行时函数无法访问this。
            //只绑定要使用this的函数就可以，如果是使用this，可以不绑定。
            this.handleClick = this.handleClick.bind(this)
        }

        handleClick(event: React.MouseEvent<HTMLElement>) { //处理事件的函数
            this.setState({ open: !this.state.open })   //修改状态，必须通过函数修改
            //如果要阻止事件的默认行为，那么要调用 e.preventDefault()
        }

        //事件指定句柄，事件名称是驼峰命名，事件函数用花括号包围；通过state访问状态。
        render() {
            return (
                <label>it's {String(this.state.open)}
                    <input type="checkbox" checked={this.state.open} onClick={this.handleClick} />
                </label>
            )
        }
    }
    ```
1. 要点
    * 通过类定义。
    * 可以有属性、状态。
    * 如果要访问this，那么函数需要在构造函数中绑定。
    * 状态对象需要在构造函数中实例化。
    * 有生命周期。
    * 属性可以是高阶组件的状态，属性不能被本组件内修改不意味着属性值在组件创建后不变化了（可以在组件外修改）
1. 状态要注意的点
    * 不要直接修改状态，要通过`setState`函数修改。
    * 状态对象中的字段**只包含`render`函数中用的字段或者会传递给子组件作为属性的字段**，其他的字段直接定义在类中。(经验证，如果子组件的属性用到的高阶组件的字段，高阶组件不通过`setState`去修改的话，子组件是无法察觉值的变更的，看上去就是不响应变化了。)
    * 状态更新可以被合并，也就是状态对象中的不同字段可以分次设置值，会被合并到一个状态中。
    * 状态设置是异步的，设置后马上去读有可能读到的仍然是旧状态对象中保存的值。如果不怕值覆盖用直接赋值的方法还好，如果有依赖那么就要注意使用第二种方式来设置状态。
    ```jsx
    //假设this.state.count为0，此句执行完仍然为0。此时实际上{count:1}在队列里面存着。
    this.setState({ count: this.state.count + 1 })  
    //此句执行完仍然为0。队列里面又增加了一个{count:1}
    this.setState({ count: this.state.count + 1 })  
    //此句执行完仍然为0。当React真正更新后，三次的{count:1}最终count等于1。
    this.setState({ count: this.state.count + 1 })  

    //此句回调函数不会马上执行，当React真正要更新的时候才回调。
    //执行之后preState中的值会立即生效，所以此时变为2。
    this.setState( (preState, props) => ({ count: preState.count + 1 }) )

    //这句被回调的时候，此时值变为3。
    this.setState( (preState, props) => ({ count: preState.count + 1 }) )
    ```

## 渲染组件

组件通过`ReactDOM.render()`和页面中的元素关联；在创建组件时，可以传入属性值。  
多个组件可以放到一个数组中，然后在JSX中通过大括号引用，就可以一次渲染多个组件，多用于渲染列表中的元素。

```jsx
ReactDOM.render(<Welcome />, document.getElementById("welcome"))
ReactDOM.render(<Hello n="react baby"/>, document.getElementById("baby"))       //传递属性值
ReactDOM.render(<div>{multi_coms}</div>, document.getElementById('component')   //多组件渲染
)
```

## 生命周期

### 装载(Mounting) -- 组件初次加载到DOM中

组件**初次加载**只会执行这三个函数，别的函数不会执行。

```fc
componentWillMount() --> render() --> componentDidMount()
```

1. **componentWillMount()** 在此函数中，可以调用`setState`设置状态值，`render`会接收到新的状态值。
1. render() 返回组件，如果返回null，那么组件不会被渲染。
1. **componentDidMount()** 初始渲染后执行，子组件的优先于父组件的先执行。

### 更新(Updating) -- 属性或者状态发生改变

**属性和状态的改变**会触发更新。

```fc
componentWillReceiveProps() --> shouldComponentUpdate()
    --false-->[Over]  
    --true-->componentWillUpdate()-->render()-->componentDidUpdate()
```

1. **componentWillReceiveProps(nextProps)** **属性值**可能变化时调用，此时**可以基于属性更新状态，并且不会引发额外的渲染**。
1. shouldComponentUpdate(nextProps, nextState) 通过比对传入的属性、状态来判断是否需要更新组件，如果不需要返回false，以提高性能。装载以及`forceUpdate`时不会调用此函数。
1. componentWillUpdate(nextProps, nextState) 组件即将重新渲染。**不能**在此方法中调用`setState`。
1. componentDidUpdate(prevProps, prevState) 组件完成了更新。

### 卸载(Unmounting) -- 组件从DOM中卸载

组件从DOM中卸载时执行，用于回收资源（比如定时器清除、事件解绑）

```fc
componentWillUnmount()
```

## 列表

使用数组保存列表项，然后JSX中用大括号直接引用，就可以将所有列表项渲染出来。  
下面这个组件就是把数字映射成列表项，从而通过数组形成了一个列表项的数组。  
注意key属性，是为了提高react的效率，每个条目的key都应该是本级元素唯一且稳定不变的。key不一定是跟着列表项一起生成的，是在数组中才有效，简单的记法是在map的回调中写。

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
```

## 表单

HTML表单元素本身是有状态的，React中通过受控组件技术提供了更便捷的操作。  
在受控组件中，React组件的状态对象保存表单元素的值(供Submit时获取)；并通过事件句柄处理表单的事件，更新状态对象中保存的值。
如果外界修改状态对象的值，那么通过受控组件的value属性，可以把新值设置到受控组件上面去。

```tsx
class NameForm extends React.Component<any, { value: string }> {
    constructor(props: any) {
        super(props);
        this.state = { value: '' }; //状态对象保存input的值

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRefreshValue = this.handleRefreshValue.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ value: event.target.value });   //input元素接收到新的输入时，把新的值保存到状态对象中
        //通过断点调试，只要input输入新值，就会触发这个回调
        //并且紧接着触发判断是否更新，然后再触发render函数。虽然新值和input中显示的已经一样了，render仍然还是会触发。
        //至于React是不是还会重新触发整整的HTML渲染就没深究了。
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        alert('A name was submitted: ' + this.state.value); //当submit时获取状态对象中保存的值
        event.preventDefault();
    }

    handleRefreshValue(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState({ value: Date.now().toString() });    //直接修改状态中保存的值
    }

    shouldComponentUpdate(np: any, ns: { value: string }) {
        return true //判断是否需要更新组件。只要调用了setState，就会触发
        //change触发时，旧的值尚未更新，和新的值不一样，确实需要update。
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        /* 如果没有value属性，不影响获取input输入的值。但是想通过外界修改input的值或设置input默认值就无法实现了 */
                        Name: <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <button onClick={this.handleRefreshValue}>set input value</button>
            </div>
        );
    }
}

ReactDOM.render(<NameForm />, document.getElementById('form'))
```

textarea经过React封装后和input类似。  
select标签也类似，不过select标签的value只能是其选项标签(option标签)的value值。  

一个表单中包含多个输入元素时，每个元素增加一个name属性，根据name来决定如何处理，或者用不同的句柄来处理change事件。