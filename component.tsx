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

    componentDidMount() {
        this.setState()
    }
}

ReactDOM.render(<SwitchButton open={false} />, document.getElementById("hello"))

