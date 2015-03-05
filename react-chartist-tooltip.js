import React from 'react';
import Chartist from 'chartist';

export default class Chart extends React.Component {
  componentDidMount() {
    this.updateChart(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.updateChart(newProps);
  }

  render() {
    return <div className = "ct-chart"></div>;
  }

  updateChart(configs) {
    const {type, data, options = {}, responsiveOptions = []} = configs;

    data.series && new Chartist[type](React.findDOMNode(this), data, options, responsiveOptions);
  }
}
