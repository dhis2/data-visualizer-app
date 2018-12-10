import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { apiFetchVisualization } from './api/visualization';
import {
    apiFetchAnalytics,
    apiFetchAnalyticsForYearOverYear,
} from './api/analytics';
import { isYearOverYear } from './modules/chartTypes';
import { getOptionsForRequest } from './modules/options';
import { computeGenericPeriodNames } from './modules/analytics';
import { createChart } from 'd2-charts-api';

class ChartPlugin extends Component {
    isActive = false;

    componentDidMount() {
        this.isActive = true;

        this.renderChart();
    }

    componentWillUnmount() {
        this.isActive = false;
    }

    getOptions = vis => {
        const options = getOptionsForRequest().reduce(
            (map, [option, props]) => {
                // only add parameter if value !== default
                if (vis[option] !== props.defaultValue) {
                    map[option] = vis[option];
                }

                return map;
            },
            {}
        );
    };

    getConfigById = async id => {
        const config = await apiFetchVisualization('chart', id);

        return config;
    };

    renderChart = async () => {
        if (!this.isActive) return;

        const { id, config, containerId } = this.props;

        const vis = id ? this.getConfigById(id) : config;

        const options = this.getOptions(vis);

        const extraOptions = {};
        let responses = [];

        if (isYearOverYear(vis.type)) {
            let yearlySeriesLabels = [];

            ({
                responses,
                yearlySeriesLabels,
            } = await apiFetchAnalyticsForYearOverYear(vis, options));

            extraOptions.yearlySeries = yearlySeriesLabels;
            extraOptions.xAxisLabels = computeGenericPeriodNames(responses);
        } else {
            responses = await apiFetchAnalytics(vis, options);
        }

        createChart(responses, vis, containerId, extraOptions);
    };

    render() {
        // TODO add loading
        return <div id={this.props.containerId} />;
    }
}

ChartPlugin.propTypes = {
    d2: PropTypes.object,
    containerId: PropTypes.string,
    id: PropTypes.string,
    config: PropTypes.object,
};

export default ChartPlugin;
