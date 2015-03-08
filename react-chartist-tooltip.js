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
      },
      tooltip: {
        top: 0,
        left: 0
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
      <div style = {{
             position: 'relative'
           }}>
        <div ref = "chart"
             className = {classnames('ct-chart', this.props.classnames)}
             onMouseOver = {this.onMouseOver}></div>
        <div ref = "tooltip"
             className = {['ct-tooltip', this.state.tooltip.classname].join(' ').trim()}
             style = {{
               position: 'absolute',
               top: this.state.tooltip.top,
               left: this.state.tooltip.left,
               padding: '0.25rem 1rem',
               border: '1px #fff solid',
               textAlign: 'center',
               fontSize: 12,
               lineHeight: 1.4,
               color: '#fff',
               opacity: 0.75
             }}>
          <div className = "ct-tooltip-name">{this.state.datapoint.name}</div>
          <div className = "ct-tooltip-value">{this.state.datapoint.value}</div>
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

    const targetRect = target.getBoundingClientRect(),
          chartRect = React.findDOMNode(this.refs.chart).getBoundingClientRect(),
          tooltipRect = React.findDOMNode(this.refs.tooltip).getBoundingClientRect(),
          name = $parent.attributes['ct:series-name'],
          value = target.attributes['ct:value'];

    value && this.setState({
               datapoint: {
                 name: name ? name.value : '',
                 value: value.value
               },
               tooltip: {
                 classname: `ct-tooltip-${$parent.classList[1].substr(3)}`,
                 top: targetRect.top - chartRect.top - tooltipRect.height,
                 left: targetRect.left - chartRect.left - 1
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
