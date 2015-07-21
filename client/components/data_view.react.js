var React           = require('react'),
    _               = require('lodash'),

    dvConst         = require('../constants/data_view'),

    dataViewActions = require('../actions/data_view_action_creator'),
    dataViewStore   = require('../stores/data_view_store'),


    dataViewChartActions = require('../actions/data_view_chart_action_creator'),
    dataViewChartStore   = require('../stores/data_view_chart_store'),


    DataViewChart   = require('./data_view_chart.react');


var DataView = React.createClass({

    getInitialState: function () {
        return dataViewStore.get();
    },

    /*
     * this is a top level item. this mount method should only be called
     * ONCE per page load
     */
    componentDidMount: function() {
        dataViewStore.addChangeListener(this._onChange);

        console.log('DataView: componentDidMount: ');
    },

    componentWillUnmount: function() {
        dataViewStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return (
            <div className="chart-wrapper">
              <div className="chart-title data-view-chart-title">

                {this.renderPositionButton()}
                {this.renderChartButton()}
                {this.renderTradeButton()}

                <div className="pull-right data-view-context">
                    {this.renderContext()}
                </div>

              </div>

              <div className="chart-stage">
                {this.renderContent()}
              </div>

              <div className="chart-notes">
                Notes about this chart
              </div>

            </div>
        );
    },

    renderContent: function () {
        switch(this.state.view) {
            case dvConst.views.POSITION:
                return this.renderPositionContent();
            break;

            case dvConst.views.TRADE:
                return this.renderTradeContent();
            break;

            default: // CHART
                return this.renderChartContent();

        }
    },

    renderPositionContent: function () {
        return (
            <div className="chart-wrapper">
              <div className="chart-title">
                POSITION
              </div>
              <div className="chart-stage">
                <img data-src="holder.js/100%x450/white-placeholder" />
              </div>
            </div>
        );
    },

    renderChartContent: function () {
        return (
            <DataViewChart
                key={dvConst.views.CHART}
                layoutType={this.state.chartContext.layoutType}
                layoutState={this.state.chartContext.layoutState} />
        );
    },

    renderTradeContent: function () {
        return (
            <div className="chart-wrapper">
              <div className="chart-title">
                TRADE
              </div>
              <div className="chart-stage">
                <img data-src="holder.js/100%x450/white-placeholder" />
              </div>
            </div>
        );
    },

    renderPositionButton: function () {

        var classStr = 'btn btn-default btn-data-view';

        if(this.state.view === dvConst.views.POSITION) {
            classStr += ' active';
        }

        return (
            <button
                className={classStr}
                onClick={this._onPositionClick}>Postition</button>
        );
    },

    renderChartButton: function () {
        var classStr = 'btn btn-default btn-data-view';

        if(this.state.view === dvConst.views.CHART) {
            classStr += ' active';
        }

        return (
            <button
                className={classStr}
                onClick={this._onChartClick}>Chart</button>
        );
    },

    renderTradeButton: function () {
        var classStr = 'btn btn-default btn-data-view';

        if(this.state.view === dvConst.views.TRADE) {
            classStr += ' active';
        }

        return (
            <button
                className={classStr}
                onClick={this._onTradeClick}>Trade</button>
        );
    },

    renderContext: function () {
        switch(this.state.view) {
            case dvConst.views.POSITION:
                return this.renderPositionContext();
            break;

            case dvConst.views.TRADE:
                return this.renderTradeContext();
            break;

            default: // CHART
                return this.renderChartContext();

        }
    },

    renderPositionContext: function () {
        return (
            <div className="data-view-context-postion"></div>
        );
    },

    renderChartContext: function () {
        var options = _.map(dvConst.chartGridContext, function (e) {
            return (<option key={e} value={e}>{e.split('_')[1]}</option>);
        });

        return (
            <div className="data-view-context-chart">
                <select
                    value={this.state.chartContext.layoutType}
                    onChange={this._onChartLayoutChange}>
                    {options}
                </select>
            </div>
        );
    },

    renderTradeContext: function () {
        return (
            <div className="data-view-context-trade"></div>
        );
    },

    _onChartLayoutChange: function (e) {
        dataViewActions.changeChartLayout(e.target.value);
    },

    _onPositionClick: function () {
        dataViewActions.changeDataView(
            dvConst.views.POSITION,
            {}
        );
    },

    _onChartClick: function () {
        dataViewActions.changeDataView(
            dvConst.views.CHART,
            {
                layoutType: this.state.chartContext.layoutType,
                layoutState: this.state.chartContext.layoutState
            }
        );
    },

    _onTradeClick: function () {
        dataViewActions.changeDataView(
            dvConst.views.TRADE,
            {}
        );
    },

    _onChange: function () {
        this.setState(dataViewStore.get());
    }

});

module.exports = DataView;
