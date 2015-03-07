import React from 'react';
import Chartist from 'chartist';
import classnames from 'classnames';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataName: '',
      dataValue: ''
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
          <span>{this.state.dataName}</span>
          <span>{this.state.dataValue}</span>
        </div>
      </div>
    );
  }

  updateChart(props) {
    const {type, data, options = {}, responsiveOptions = []} = props;

    this.chartist ? this.chartist.update(data, options, true) :
    data.series ? this.chartist = new Chartist[type](React.findDOMNode(this.refs.chart), data, options, responsiveOptions) :
    null;
  }

  onMouseOver({target}) {
    const dataName = target.parentNode.attributes['ct:name'] ? target.parentNode.attributes['ct:name'].value : '',
          dataValue = target.attributes['ct:value'] ? target.attributes['ct:value'].value : '';

    this.setState({
      dataName,
      dataValue
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
  responsiveOptions: React.PropTypes.array
};
