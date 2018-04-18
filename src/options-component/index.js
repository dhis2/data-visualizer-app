import React, { Component } from 'react';
import ChartOptions from './ChartOptions';

class ChartOptionsApp extends Component {
    state = {
        //temporary state container to in order to keep the component as "controlled components" and avoid warnings.
        optionsValues: {
            // DataTab
            showValues: false,
            useCumululative: false,
            useStacked: false,
            category: '',
            trendLine: '',
            targetLineValue: '',
            targetLineTitle: '',
            baseLineValue: '',
            baseLineTitle: '',
            sortOrder: '',
            // Axes&LegendTab
            axisMin: '',
            axisMax: '',
            tickSteps: '',
            decimals: '',
            rangeTitle: '',
            domainTitle: '',
            domainSubtitle: '',
            hideChartLegend: false,
            hideChartTitle: false,
            hideSubtitle: false,
            // StyleTab
            noSpace: false,
        },
    };

    handleChange = (content, value) => {
        console.log(content, value);
        content === 'activeTab'
            ? this.setState({ activeTab: value })
            : this.setState({
                  ...this.state,
                  optionsValues: {
                      ...this.state.optionsValues,
                      [content]: value,
                  },
              });
    };

    render = () => (
        <ChartOptions
            activeTab={this.state.activeTab}
            onChange={this.handleChange}
            optionsValues={this.state.optionsValues}
        />
    );
}

export default ChartOptionsApp;
