
const Component = React.Component;

const Circle = ({ x, y }) => (
  <circle cx={x} cy={y} r={5} />
);

const maxX = 200;
const minX = 10;

class App extends Component {
  constructor() {
    super();

    this.state = {
      x: 10,
      vx: 1.5
    };
  }

  componentDidMount() {
    // keep changing state.x
    this.timer = d3.timer(() => {
      let { x, vx } = this.state;

      x = x + vx;

      if (x > maxX || x < minX ) {
        vx = -vx;
      }

      this.setState({ x: x, vx: vx })
    });

  }

  componentWillUnmount() {
    // clean up after yourself
    d3.timer.stop();
  }

  render() {

    return (
      <svg width="100%" height="200">
        <Circle x={this.state.x} y={50} />
      </svg>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
