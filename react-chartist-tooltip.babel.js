import React from 'react';
import Chartist from 'chartist';
import classnames from 'classnames';

const identity = x => x;

export default class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.onMouseOver = this.onMouseOver.bind(this);
  }

  static defaultProps = {
    style: {},
    options: {},
    responsiveOptions: [],
    events: {},
    tooltip: {
      transform: {
        name: identity,
        value: identity
      }
    }
  };

  static propTypes = {
    type: React.PropTypes.string.isRequired,
    classnames: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    style: React.PropTypes.object,
    data: React.PropTypes.shape({
      labels: React.PropTypes.array,
      series: React.PropTypes.array
    }),
    options: React.PropTypes.object,
    responsiveOptions: React.PropTypes.array,
    callback: React.PropTypes.func,
    events: React.PropTypes.object,
    tooltip: React.PropTypes.shape({
      transform: React.PropTypes.shape({
        name: React.PropTypes.func,
        value: React.PropTypes.func
      })
    })
  };

  state = {
    datapoint: {
      name: '',
      value: '',
    },

    tooltip: {
      top: 0,
      left: 0
    }
  };

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
    let props = this.props,
        state = this.state;

    return (
      <div style = {{
             position: 'relative'
           }}>
        <div ref = "chart"
             className = {classnames('ct-chart', props.classnames)}
             style = {props.style}
             onMouseOver = {this.onMouseOver}></div>
        <div ref = "tooltip"
             className = {classnames('ct-tooltip', state.tooltip.classname)}
             style = {{
               position: 'absolute',
               top: state.tooltip.top,
               left: state.tooltip.left,
               padding: '0.25rem 1rem',
               border: '1px #fff solid',
               textAlign: 'center',
               fontSize: 12,
               lineHeight: 1.4,
               color: '#fff',
               opacity: 0.75
             }}>
          <div className = "ct-tooltip-name">{(props.tooltip.transform.name || identity)(state.datapoint.name)}</div>
          <div className = "ct-tooltip-value">{(props.tooltip.transform.value || identity)(state.datapoint.value)}</div>
        </div>
      </div>
    );
  }

  updateChart(props) {
    const {type, data, options, responsiveOptions, callback, events} = props,
          create = () => {
            this.chartist = new Chartist[type](React.findDOMNode(this.refs.chart), data, options, responsiveOptions);

            callback && callback.call(this.chartist);

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
