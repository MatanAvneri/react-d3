
const Component = React.Component;

class Line extends Component {
  constructor(props) {
    super(props);

    // Set up scales and a line generator
    this.yScale = d3.scaleLinear();
    this.xScale = d3.scaleLinear();

    this.line = d3.line()
      .x((d) => this.xScale(d[0]))
      .y((d) => this.yScale(d[1]));

    this.updateD3(props);
  }

  componentWillReceiveProps(newProps) {
    this.updateD3(newProps);
  }

  updateD3(props) {
    const { start, end } = props;

    // update scales
    this.xScale.domain([start[0], end[0]])
        .range([10, 200]);
    this.yScale.domain([start[1], end[1]])
        .range([10, 200]);
  }

  render() {
    const { start, end } = this.props;

    // use the line generator for the `d` attribute
    const D = this.line([start, end]); //we can add more points as well
    return (
      <path d={D}/>
    )
  }
}

class App extends Component {
  render() {
    return (
      <svg width="100%" height="200%">
        <Line start={[1, 1]} end={[2, 3]} />
        <Line start={[1, 10]} end={[2, 10]} />
      </svg>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
