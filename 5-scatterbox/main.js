
const Component = React.Component;
const PropTypes = React.PropTypes;

class Axis extends Component {
  constructor() {
    super();

    this.axes = {'bottom': d3.axisBottom,
                 'left': d3.axisLeft,
                 'top': d3.axisTop,
                 'right': d3.axisRight}
  }

  componentDidMount() { this.renderAxis() }
  componentDidUpdate() { this.renderAxis() }

  renderAxis() {
    const axis = this.axes[this.props.type]()
                     .scale(this.props.scale);

    d3.select(this.refs.wrapper)
      .call(axis);
  }

  render() {
    const transform = `translate(${this.props.x}, ${this.props.y})`;
    return <g ref="wrapper" transform={transform}></g>
  }
}
Axis.defaultProps = { type: 'bottom' };

class Scatterplot extends Component {
  constructor(props) {
    super(props);

    this.xScale = d3.scaleLinear();
    this.yScale = d3.scaleLinear();

    this.updateD3(props);
  }

  componentWillReceiveProps(newProps) {
    this.updateD3(newProps);
  }

  updateD3(props) {
    this.xScale.domain(d3.extent(props.data, props.xValue))
               .range([20, props.width]);

    this.yScale.domain(d3.extent(props.data, props.yValue))
               .range([props.height-20, 0]);
  }

  render() {
    const circles = this.props.data.map(d => {
      const x = this.props.xValue(d),
            y = this.props.yValue(d);

      return <circle cx={this.xScale(x)} cy={this.yScale(y)} r={2} />
    });

    const transform = `translate(${this.props.x}, ${this.props.y})`;

    return (
      <g transform={transform}>
        {circles}
        <Axis scale={this.xScale} x={0} y={this.props.height-10} />
        <Axis scale={this.yScale} x={10} y={0} type="left" />
      </g>
    );
  }
}
Scatterplot.defaultProps = { x: 0, y: 0 };
Scatterplot.propTypes = { width: PropTypes.number.isRequired,
                          height: PropTypes.number.isRequired,
                          data: PropTypes.array.isRequired };

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    }
  }

  componentWillMount() {
    d3.tsv('http://swizec.com/reactd3js/datasets/earth.dat')
      .row(row => ({year: Number(row.year),
                    magnitude: Number(row.magnitude),
                    deaths: Number(row.deaths)}))
      .get((err, data) => {
      this.setState({ data: data });
    })
  }

  render() {
    return (
      <svg width="100%" height="500">
        <Scatterplot data={this.state.data}
                     xValue={d => d.magnitude}
                     yValue={d => d.deaths}
                     x={100}
                     y={10}
                     width={500}
                     height={300} />
      </svg>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
