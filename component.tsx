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
 * 从React.Component继承类。第一个泛型是属性类型；第二个泛型是状态类型，可以根据需要填。
 */
class SwitchButton extends React.Component<BtnPropsType, BtnStateType> {
    constructor(props: BtnPropsType) {
        super(props)
        this.state = {
            open: this.props.open
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event: React.MouseEvent<HTMLElement>) {
        this.setState({ open: !this.state.open })
    }

    render() {
        let open = this.state.open

        return (
            <label onClick={this.handleClick}>it's {String(this.state.open)}
                <input type="checkbox" checked={open} />
            </label>
        )
    }
}

ReactDOM.render(<SwitchButton open={false} />, document.getElementById("hello"))
