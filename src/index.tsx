/*
 * 要通过import导入，webpack才能建立依赖关系。如果采用全局变量的方式使用React，
 * 那么可以不用import，但是要修改webpack的配置文件，把React配置为external的。
 */
import * as ReactDOM from 'react-dom'
import * as React from 'react'

ReactDOM.render(
    <h1>Hello, world!</h1>, document.getElementById('main')
)

//----------------组件----------------
//无状态，无属性。
const Hello = () => <div>Hello</div>
//无状态，无属性，带事件处理。
const HelloEv = () => <div onClick={() => alert("clicked")}>Hello, click me.</div>
//无状态，有属性。事件处理函数也可以通过属性传递进来。
const HelloSb = (props: { name: string }) => <div>Hello, {props.name}.</div>

//----通过类定义组件----
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
        this.setState({ open: !this.state.open })   //修改状态，必须通过setState修改
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

//列表组件。多了key属性，用以提高react效率的。每个item的key应该是唯一不变的。
function NumberList(props: { numbers: number[] }) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        <li key={number.toString()}>{number}</li>
    );
    return (
        <ul>{listItems}</ul>
    );
}
const numbers = [1, 2, 3, 4, 5];

//渲染Demo组件到目标div
ReactDOM.render(
    <div>
        <Hello />
        <HelloEv />
        <HelloSb name="all" />
        <SwitchButton open={false} />
        <NumberList numbers={numbers} />
    </div>, document.getElementById('component')
)