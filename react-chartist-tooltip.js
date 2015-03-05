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
    return <div className = "ct-chart"></div>;
  }

  updateChart(configs) {
    const {type, data, options = {}, responsiveOptions = []} = configs;

    data.series && (this.chartist = new Chartist[type](React.findDOMNode(this), data, options, responsiveOptions));
  }
}
