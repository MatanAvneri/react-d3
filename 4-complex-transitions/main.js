
const Component = React.Component;

class Circle extends Component {
  constructor(props) {
    super(props);

    // copy x, y props to state
    this.state = {
      x: props.x,
      y: props.y
    }
  }

  componentWillReceiveProps(newProps) {
    // use d3 to change attributes with a transition
    d3.select(this.refs.circle)
    .transition()
    .duration(1500)
    .ease(d3.easeBackOut)
    .attr('cy', newProps.y)
    .on('end', () => this.setState({y: newProps.y}));
  }

  render() {
    return (
      // render circle from state
      <circle r="15" cx={this.state.x} cy={this.state.y} ref="circle" />
    )
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = { y: 10 };
  }
  componentDidMount() {
    setTimeout(() => this.setState({ y: 200 }),
               1000);
  }

  render() {

    return (
      <svg width="100%" height="800">
        <Circle x={40} y={this.state.y} />
      </svg>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
