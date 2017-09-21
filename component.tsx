function Hello(props: { n: string }) {
    return <h1>Hello, {props.n}!</h1>
}

class Welcome extends React.Component {
    constructor(props: {}) {
        super(props)
    }

    render() {
        return <h1>Welcom to React!</h1>
    }
}

ReactDOM.render(Hello({ n: "react boy" }), document.getElementById("hello"))
ReactDOM.render(<Welcome />, document.getElementById("welcome"))
ReactDOM.render(<Hello n="react baby" />, document.getElementById("baby"))

//组件的泛型指明了props、state的类型结构
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

ReactDOM.render(<Clock name="CCCC" />, document.getElementById("clock"))
