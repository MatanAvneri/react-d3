// use for small components which are self contained
// lose react capabillites
const Component = React.Component;

class Axis extends Component {
  // render an axis whenever component updates
  renderAxis() {
    //everything
    let axis = d3.axisBottom(this.props.scale);

    d3.select(this.refs.wrapper).call(axis);
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  render() {
    const transform = `translate(${this.props.x}, ${this.props.y})`;
    return <g ref="wrapper" transform={transform}></g>
  }
}

class App extends Component {
  render() {
    let xScale = d3.scaleLinear().domain([0, 1]).range([0, 300]);

    return (
      <svg width="100%" height="200">
        <Axis x={10} y={50} scale={xScale}/>
      </svg>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
