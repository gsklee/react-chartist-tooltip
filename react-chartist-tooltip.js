import React from 'react';
import Chartist from 'chartist';

export default class Chart extends React.Component {
  componentDidMount() {
    const {type, data, options = {}, responsiveOptions = []} = this.props;

    this.chartist = new Chartist[type](React.findDOMNode(this), data, options, responsiveOptions);
  }

  componentWillReceiveProps(newProps) {
    const {data, options = {}} = newProps;

    this.chartist.update(data, options, true);
  }

  componentWillUnmount() {
    this.chartist.detach();
  }

  render() {
    return <div className = {['ct-chart', this.props.ratio].join(' ').trim()}></div>;
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
