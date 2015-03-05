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
    this.chartist.detach();
  }

  render() {
    return <div className = {['ct-chart', this.props.ratio].join(' ').trim()}></div>;
  }

  updateChart(props) {
    const {type, data, options = {}, responsiveOptions = []} = props;

    this.chartist ? this.chartist.update(data, options, true) :
    data.series ? this.chartist = new Chartist[type](React.findDOMNode(this), data, options, responsiveOptions) :
    null;
  }
}

Chart.propTypes = {
  type: React.PropTypes.string.isRequired,
  ratio: React.PropTypes.string,
  data: React.PropTypes.shape({
    labels: React.PropTypes.array.isRequired,
    series: React.PropTypes.array.isRequired
  }),
  options: React.PropTypes.object,
  responsiveOptions: React.PropTypes.array
};
