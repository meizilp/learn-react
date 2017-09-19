function Hello(props: { name: string }) {
    return <h1>Hello, {props.name}!</h1>
}

class Welcome extends React.Component {
    render() {
        return <h1>Welcom to React!</h1>
    }
}

ReactDOM.render(Hello({ name: "react boy" }), document.getElementById("hello"))
ReactDOM.render(<Hello name="react baby"/>, document.getElementById("hello"))
ReactDOM.render(<Welcome />, document.getElementById("welcome"))