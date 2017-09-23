# 组件

* 组件用于将UI分为一个个独立、可复用的小部件。  
* 组件可以有属性（约定赋值后在组件内不可修改）和状态（约定可以在组件内部修改）。  
* 组件的名称首字母要大写（约定）。

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
        }

        //事件指定句柄；通过state访问状态。
        render() {
            return (
                <label onClick={this.handleClick}>it's {String(this.state.open)}
                    <input type="checkbox" checked={this.state.open} />
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

## 渲染组件

组件通过`ReactDOM.render()`和页面中的元素关联；在创建组件时，可以传入属性值。
    ```jsx
    ReactDOM.render(<Welcome />, document.getElementById("welcome"))
    ReactDOM.render(<Hello n="react baby"/>, document.getElementById("baby"))       //传递属性值
    ```

## 生命周期

1. 装载(Mounting)
    componentWillMount() --> render() --> componentDidMount()

1. 更新(Updating)
1. 卸载(Unmounting)

