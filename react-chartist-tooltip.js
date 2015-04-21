'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var _Chartist = require('chartist');

var _Chartist2 = _interopRequireWildcard(_Chartist);

var _classnames = require('classnames');

var _classnames2 = _interopRequireWildcard(_classnames);

var identity = function identity(x) {
  return x;
};

var Chart = (function (_React$Component) {
  function Chart(props) {
    _classCallCheck(this, Chart);

    _React$Component.call(this, props);

    this.state = {
      datapoint: {
        name: '',
        value: '' },

      tooltip: {
        top: 0,
        left: 0
      }
    };
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  _inherits(Chart, _React$Component);

  Chart.prototype.componentDidMount = function componentDidMount() {
    this.updateChart(this.props);
  };

  Chart.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
    this.updateChart(newProps);
  };

  Chart.prototype.componentWillUnmount = function componentWillUnmount() {
    this.chartist.detach();
  };

  Chart.prototype.render = function render() {
    var props = this.props,
        state = this.state;

    return _React2['default'].createElement(
      'div',
      { style: {
          position: 'relative'
        } },
      _React2['default'].createElement('div', { ref: 'chart',
        className: _classnames2['default']('ct-chart', props.classnames),
        style: props.style,
        onMouseOver: this.onMouseOver }),
      _React2['default'].createElement(
        'div',
        { ref: 'tooltip',
          className: _classnames2['default']('ct-tooltip', state.tooltip.classname),
          style: {
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
          } },
        _React2['default'].createElement(
          'div',
          { className: 'ct-tooltip-name' },
          (props.tooltip.transform.name || identity)(state.datapoint.name)
        ),
        _React2['default'].createElement(
          'div',
          { className: 'ct-tooltip-value' },
          (props.tooltip.transform.value || identity)(state.datapoint.value)
        )
      )
    );
  };

  Chart.prototype.updateChart = function updateChart(props) {
    var _this = this;

    var type = props.type;
    var data = props.data;
    var options = props.options;
    var responsiveOptions = props.responsiveOptions;
    var callback = props.callback;
    var events = props.events;
    var create = function create() {
      _this.chartist = new _Chartist2['default'][type](_React2['default'].findDOMNode(_this.refs.chart), data, options, responsiveOptions);

      callback && callback.call(_this.chartist);

      Object.keys(events).forEach(function (x) {
        return _this.chartist.on(x, events[x].bind(_this.chartist));
      });
    };

    this.chartist ? this.chartist.update(data, options, true) : data.series ? create() : null;
  };

  Chart.prototype.onMouseOver = function onMouseOver(_ref) {
    var target = _ref.target;

    var $parent = target.parentNode;

    var targetRect = target.getBoundingClientRect(),
        chartRect = _React2['default'].findDOMNode(this.refs.chart).getBoundingClientRect(),
        tooltipRect = _React2['default'].findDOMNode(this.refs.tooltip).getBoundingClientRect(),
        name = $parent.attributes['ct:series-name'],
        value = target.attributes['ct:value'];

    value && this.setState({
      datapoint: {
        name: name ? name.value : '',
        value: value.value
      },
      tooltip: {
        classname: 'ct-tooltip-' + $parent.classList[1].substr(3),
        top: targetRect.top - chartRect.top - tooltipRect.height,
        left: targetRect.left - chartRect.left - 1
      }
    });
  };

  _createClass(Chart, [{
    key: 'state',
    value: undefined,
    enumerable: true
  }], [{
    key: 'defaultProps',
    value: {
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
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      type: _React2['default'].PropTypes.string.isRequired,
      classnames: _React2['default'].PropTypes.oneOfType([_React2['default'].PropTypes.string, _React2['default'].PropTypes.object]),
      style: _React2['default'].PropTypes.object,
      data: _React2['default'].PropTypes.shape({
        labels: _React2['default'].PropTypes.array,
        series: _React2['default'].PropTypes.array
      }),
      options: _React2['default'].PropTypes.object,
      responsiveOptions: _React2['default'].PropTypes.array,
      callback: _React2['default'].PropTypes.func,
      events: _React2['default'].PropTypes.object,
      tooltip: _React2['default'].PropTypes.shape({
        transform: _React2['default'].PropTypes.shape({
          name: _React2['default'].PropTypes.func,
          value: _React2['default'].PropTypes.func
        })
      })
    },
    enumerable: true
  }]);

  return Chart;
})(_React2['default'].Component);

exports['default'] = Chart;
module.exports = exports['default'];