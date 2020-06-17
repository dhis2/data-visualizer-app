import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash-es/isEqual';
import { createVisualization } from '@dhis2/analytics';

import { apiFetchVisualization } from './api/visualization';
import {
    apiFetchAnalytics,
    apiFetchAnalyticsForYearOverYear,
} from './api/analytics';
import { isYearOverYear, isSingleValue } from './modules/chartTypes';
import { getOptionsForRequest } from './modules/options';
import { computeGenericPeriodNames } from './modules/analytics';
import { BASE_FIELD_YEARLY_SERIES } from './modules/fields/baseFields';
import LoadingMask from './widgets/LoadingMask';

class ChartPlugin extends Component {
    constructor(props) {
        super(props);

        this.canvasRef = React.createRef();

        this.recreateVisualization = Function.prototype;

        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        this.renderChart();
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(this.props.config, prevProps.config)) {
            this.renderChart();
            return;
        }

        if (!isEqual(this.props.filters, prevProps.filters)) {
            this.renderChart();
            return;
        }

        // id set by DV app, style works in dashboards
        if (
            this.props.id !== prevProps.id ||
            !isEqual(this.props.style, prevProps.style)
        ) {
            this.recreateVisualization(0); // disable animation
            return;
        }
    }

    getRequestOptions = (visualization, filters) => {
        const options = getOptionsForRequest().reduce(
            (map, [option, props]) => {
                // only add parameter if value !== default
                if (
                    visualization[option] !== undefined &&
                    visualization[option] !== props.defaultValue
                ) {
                    map[option] = visualization[option];
                }

                return map;
            },
            {}
        );

        // interpretation filter
        if (filters.relativePeriodDate) {
            options.relativePeriodDate = filters.relativePeriodDate;
        }

        // global filters
        // userOrgUnit
        if (filters.userOrgUnit && filters.userOrgUnit.length) {
            const ouIds = filters.userOrgUnit.map(
                ouPath => ouPath.split('/').slice(-1)[0]
            );

            options.userOrgUnit = ouIds.join(';');
        }

        return options;
    };

    getConfigById = id => {
        return apiFetchVisualization(this.props.d2, 'chart', id);
    };

    renderChart = async () => {
        const {
            config,
            filters,
            forDashboard,
            onResponsesReceived,
            onChartGenerated,
            onError,
        } = this.props;

        try {
            const visualization =
                Object.keys(config).length === 1 && config.id
                    ? await this.getConfigById(config.id)
                    : config;

            const options = this.getRequestOptions(visualization, filters);

            const extraOptions = {
                dashboard: forDashboard,
            };

            let responses = [];

            if (isYearOverYear(visualization.type)) {
                let yearlySeriesLabels = [];

                ({
                    responses,
                    yearlySeriesLabels,
                } = await apiFetchAnalyticsForYearOverYear(
                    this.props.d2,
                    visualization,
                    options
                ));

                extraOptions[BASE_FIELD_YEARLY_SERIES] = yearlySeriesLabels;
                extraOptions.xAxisLabels = computeGenericPeriodNames(responses);
            } else {
                responses = await apiFetchAnalytics(
                    this.props.d2,
                    visualization,
                    options
                );
            }

            if (responses.length) {
                onResponsesReceived(responses);
            }

            this.recreateVisualization = animation => {
                const visualizationConfig = createVisualization(
                    responses,
                    visualization,
                    this.canvasRef.current,
                    {
                        ...extraOptions,
                        animation,
                    },
                    undefined,
                    undefined,
                    isSingleValue(visualization.type) ? 'dhis' : 'highcharts' // output format
                );

                if (isSingleValue(visualization.type)) {
                    onChartGenerated(visualizationConfig.visualization);
                } else {
                    onChartGenerated(
                        visualizationConfig.visualization.getSVGForExport({
                            sourceHeight: 768,
                            sourceWidth: 1024,
                        })
                    );
                }
            };

            this.recreateVisualization();

            this.setState({ isLoading: false });
        } catch (error) {
            onError(error);
        }
    };

    render() {
        return (
            <Fragment>
                {this.state.isLoading ? <LoadingMask /> : null}
                <div ref={this.canvasRef} style={this.props.style} />
            </Fragment>
        );
    }
}

ChartPlugin.defaultProps = {
    config: {},
    filters: {},
    forDashboard: false,
    style: {},
    animation: 200,
    onError: Function.prototype,
    onChartGenerated: Function.prototype,
    onResponsesReceived: Function.prototype,
};

ChartPlugin.propTypes = {
    id: PropTypes.number,
    d2: PropTypes.object.isRequired,
    animation: PropTypes.number,
    config: PropTypes.object.isRequired,
    filters: PropTypes.object,
    forDashboard: PropTypes.bool,
    style: PropTypes.object,
    onError: PropTypes.func.isRequired,
    onChartGenerated: PropTypes.func,
    onResponsesReceived: PropTypes.func,
};

export default ChartPlugin;
