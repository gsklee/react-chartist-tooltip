import React from 'react';
import Chartist from 'chartist';

export default class Chart extends React.Component {
  componentDidMount() {
    this.updateChart(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.updateChart(newProps);
  }

  componentWillUnmount() {
    this.chartist && this.chartist.detach();
  }

  render() {
    return <div className = {['ct-chart', this.props.ratio].join(' ').trim()}></div>;
  }

  updateChart(configs) {
    const {type, data, options = {}, responsiveOptions = []} = configs;

    data.series && (this.chartist = new Chartist[type](React.findDOMNode(this), data, options, responsiveOptions));
  }
}

Chart.propTypes = {
  type: React.PropTypes.string.isRequired,
  ratio: React.PropTypes.string,
  data: React.PropTypes.object.isRequired,
  options: React.PropTypes.object,
  responsiveOptions: React.PropTypes.array
};
