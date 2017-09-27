//无状态，无属性。
const Hello = () => <div>Hello</div>
//无状态，无属性，带事件处理。
const HelloEv = () => <div onClick={() => alert("clicked")}>Hello, click me.</div>
//无状态，有属性。事件处理函数也可以通过属性传递进来。
const HelloSb = (props: { name: string }) => <div>Hello, {props.name}</div>


//属性类型
interface BtnPropsType {
    open: boolean
}

//状态类型
interface BtnStateType {
    open: boolean
    count: number
}

/*
 * 从React.Component继承类。第一个泛型是属性类型；第二个泛型是状态类型。
 * 如果不需要状态，第二个类型可以省略；如果属性也不要，那么两个都可以省略。
 */
class SwitchButton extends React.Component<BtnPropsType, BtnStateType> {
    constructor(props: BtnPropsType) {  //属性初始化
        super(props)        //基类
        this.state = {      //状态一定要指向一个对象，否则为null
            open: this.props.open,
            count: 0
        }

        //要把本类的函数和本类绑定，否则因为js的特性会导致运行时函数无法访问this。
        //只绑定要使用this的函数就可以，如果是使用this，可以不绑定。
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event: React.MouseEvent<HTMLElement>) { //处理事件的函数
        this.setState({ open: !this.state.open })   //修改状态，必须通过函数修改

        /* 验证setState的异步操作
        //假设this.state.count为0，此句执行完仍然为0。此时实际上{count:1}在队列里面存着。
        this.setState({ count: this.state.count + 1 })  
        //此句执行完仍然为0。队列里面又增加了一个{count:1}
        this.setState({ count: this.state.count + 1 })  
        //此句执行完仍然为0。当React真正更新后，三次的{count:1}最终count等于1。
        this.setState({ count: this.state.count + 1 })  

        //此句回调函数不会马上执行，当React真正要更新的时候才回调。
        //执行之后preState中的值会立即生效，所以此时变为2。
        this.setState(      
            (preState, props) => (
                { count: preState.count + 1 }
            )
        )

        //这句被回调的时候，此时值变为3。
        this.setState(
            (preState, props) => (
                { count: preState.count + 1 }
            )
        )
        */

        this.setState(
            (preState, props) => (
                { count: preState.count + 1 }
            )
        )
    }

    //事件指定句柄；通过state访问状态。onClick放在input上，如果放在label上，
    //点击label会触发两次click（一次label，一次label发给关联的input，input不处理又冒泡给label）。
    render() {
        console.log("Render")
        return (
            <label>it's {String(this.state.open)}
                <input onClick={this.handleClick} type="checkbox" checked={this.state.open} />
            </label>
        )
    }

    componentWillMount() {
        console.log("WillMount")
    }

    componentDidMount() {
        console.log("DidMount")
    }

    componentWillReceiveProps(nextProps: BtnPropsType) {
        console.log("WillReceiveProps")
    }

    shouldComponentUpdate(nextProps: BtnPropsType, nextState: BtnStateType) {
        console.log("ShouldUpdate")
        return true
    }

    componentWillUpdate(nextProps: BtnPropsType, nextState: BtnStateType) {
        console.log("WillUpdate")
    }

    componentDidUpdate(prevProps: BtnPropsType, prevState: BtnStateType) {
        console.log("DidUpdate")
    }

    componentWillUnmount() {
        console.log("WillUnmount")
    }

}

ReactDOM.render(<SwitchButton open={false} />, document.getElementById("hello"))

