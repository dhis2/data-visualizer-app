import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import DataTab from './DataTab';
import TabsBar from './TabsBar';
import StyleTab from './StyleTab';
import AxesAndLegendsTab from './AxesAndLegendsTab';

export class ChartOptions extends Component {
    state = {
        activeTab: 0,
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
            aggregation: '',
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

    render = () => {
        let showCurrentTab = [
            <DataTab
                onChange={this.handleChange}
                tabContent={this.state.optionsValues}
            />,
            <AxesAndLegendsTab
                onChange={this.handleChange}
                tabContent={this.state.optionsValues}
            />,
            <StyleTab
                onChange={this.handleChange}
                tabContent={this.state.optionsValues}
            />,
        ];

        return (
            <Fragment>
                <TabsBar
                    activeTab={this.state.activeTab}
                    onChange={this.handleChange}
                />
                {showCurrentTab[this.state.activeTab]}
            </Fragment>
        );
    };
}

ChartOptions.propTypes = {
    activeTab: PropTypes.number,
};

ChartOptions.defaultProps = {
    activeTab: 0,
};

export default ChartOptions;
