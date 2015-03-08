import React from 'react';
import Chartist from 'chartist';
import classnames from 'classnames';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      datapoint: {
        name: '',
        value: '',
      }
    };

    this.onMouseOver = this.onMouseOver.bind(this);
  }

  componentDidMount() {
    this.updateChart(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.updateChart(newProps);
  }

  componentWillUnmount() {
    this.chartist.detach();
  }

  render() {
    return (
      <div>
        <div ref = "chart"
             className = {classnames('ct-chart', this.props.classnames)}
             onMouseOver = {this.onMouseOver}></div>
        <div className = "ct-tooltip">
          <span className = "ct-tooltip-name">{this.state.datapoint.name}</span>
          <span className = "ct-tooltip-value">{this.state.datapoint.value}</span>
        </div>
      </div>
    );
  }

  updateChart(props) {
    const {type, data, options = {}, responsiveOptions = [], events = {}} = props,
          create = () => {
            this.chartist = new Chartist[type](React.findDOMNode(this.refs.chart), data, options, responsiveOptions);

            Object.keys(events).forEach(x => this.chartist.on(x, events[x].bind(this.chartist)));
          };

    this.chartist ? this.chartist.update(data, options, true) :
    data.series ? create() :
    null;
  }

  onMouseOver({target}) {
    let $parent = target.parentNode;

    this.setState({
      datapoint: {
        name: $parent.attributes['ct:name'] ? $parent.attributes['ct:name'].value : '',
        value: target.attributes['ct:value'] ? target.attributes['ct:value'].value : ''
      }
    });
  }
}

Chart.propTypes = {
  type: React.PropTypes.string.isRequired,
  classnames: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
  ]),
  data: React.PropTypes.shape({
    labels: React.PropTypes.array,
    series: React.PropTypes.array
  }),
  options: React.PropTypes.object,
  responsiveOptions: React.PropTypes.array,
  events: React.PropTypes.object
};
