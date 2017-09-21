function Hello(props: { n: string }) {
    return <h1>Hello, {props.n}!</h1>
}

class Welcome extends React.Component {
    render() {
        return <h1>Welcom to React!</h1>
    }
}

ReactDOM.render(Hello({ n: "react boy" }), document.getElementById("hello"))
ReactDOM.render(<Welcome />, document.getElementById("welcome"))
ReactDOM.render(<Hello n="react baby"/>, document.getElementById("baby"))