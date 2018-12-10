import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createChart } from 'd2-charts-api';
import i18n from '@dhis2/d2-i18n';
import debounce from 'lodash-es/debounce';

import { sGetVisualization } from '../../reducers/visualization';
import { sGetCurrent } from '../../reducers/current';
import {
    sGetUiRightSidebarOpen,
    sGetUiInterpretation,
} from '../../reducers/ui';

import { acAddMetadata } from '../../actions/metadata';
import { acSetChart } from '../../actions/chart';
import {
    acSetLoadError,
    acSetLoading,
    acClearLoadError,
} from '../../actions/loader';

import { computeGenericPeriodNames } from '../../modules/analytics';
import { isYearOverYear } from '../../modules/chartTypes';
import { validateLayout } from '../../modules/layout';
import { getOptionsForRequest } from '../../modules/options';
import { BASE_FIELD_YEARLY_SERIES } from '../../modules/fields/baseFields';

import {
    apiFetchAnalytics,
    apiFetchAnalyticsForYearOverYear,
} from '../../api/analytics';

import BlankCanvas, { visContainerId } from './BlankCanvas';

export class Visualization extends Component {
    recreateChart = Function.prototype;

    renderId = null;

    getNewRenderId = () =>
        (this.renderId =
            typeof this.renderId === 'number' ? this.renderId + 1 : 1);

    isRenderIdDirty = id => id !== this.renderId;

    addResizeHandler = () => {
        window.addEventListener(
            'resize',
            debounce(() => {
                this.recreateChart();
            }, 300)
        );
    };

    getOptions = (vis, interpretation) => {
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

        if (interpretation && interpretation.created) {
            options.relativePeriodDate = interpretation.created;
        }
        return options;
    };

    componentDidMount() {
        this.addResizeHandler();

        if (this.props.current) {
            this.renderVisualization(this.props.current);
        }
    }

    componentDidUpdate(prevProps) {
        // new chart
        if (this.props.current !== prevProps.current) {
            this.renderVisualization(this.props.current, this.getNewRenderId());
            return;
        }

        // avoid redrawing the chart if the interpretation content remains the same
        // this is the case when the panel is toggled but the selected interpretation is not changed
        if (
            !prevProps.interpretation ||
            (this.props.interpretation &&
                this.props.interpretation.id !== prevProps.interpretation.id)
        ) {
            const vis = this.props.interpretation.id
                ? this.props.visualization
                : this.props.current;

            this.renderVisualization(vis, this.getNewRenderId());
            return;
        }

        // open sidebar
        if (this.props.rightSidebarOpen !== prevProps.rightSidebarOpen) {
            this.recreateChart();
            return;
        }
    }

    renderVisualization = async (vis, renderId = null) => {
        const { interpretation } = this.props;

        const options = this.getOptions(vis, interpretation);

        try {
            // Validate layout
            validateLayout(vis);

            // Cancel due to a new request being initiated
            if (this.isRenderIdDirty(renderId)) {
                return;
            }

            this.props.acClearLoadError();
            this.props.acSetLoading(true);

            const extraOptions = {};
            let responses = [];

            if (isYearOverYear(vis.type)) {
                let yearlySeriesLabels = [];

                ({
                    responses,
                    yearlySeriesLabels,
                } = await apiFetchAnalyticsForYearOverYear(vis, options));

                extraOptions[BASE_FIELD_YEARLY_SERIES] = yearlySeriesLabels;

                extraOptions.xAxisLabels = computeGenericPeriodNames(responses);
            } else {
                responses = await apiFetchAnalytics(vis, options);
            }

            responses.forEach(res => {
                this.props.acAddMetadata(res.metaData.items);
            });

            // Cancel due to a new request being initiated
            if (this.isRenderIdDirty(renderId)) {
                this.props.acSetLoading(false);
                return;
            }

            const chartConfig = createChart(
                responses,
                vis,
                visContainerId,
                extraOptions
            );

            this.recreateChart = () => {
                createChart(responses, vis, visContainerId, {
                    ...extraOptions,
                    animation: 0,
                });
            };

            this.props.acSetChart(
                chartConfig.chart.getSVGForExport({
                    sourceHeight: 768,
                    sourceWidth: 1024,
                })
            );

            this.props.acSetLoading(false);
        } catch (error) {
            this.props.acSetLoading(false);

            // Do not show messages that are no longer relevant
            if (this.isRenderIdDirty(renderId)) {
                return;
            }

            const errorMessage =
                (error && error.message) ||
                i18n('Error generating chart, please try again');
            this.props.acSetLoadError(errorMessage);
        }
    };

    render() {
        return <BlankCanvas />;
    }
}

const mapStateToProps = state => ({
    current: sGetCurrent(state),
    visualization: sGetVisualization(state),
    interpretation: sGetUiInterpretation(state),
    rightSidebarOpen: sGetUiRightSidebarOpen(state),
});

export default connect(
    mapStateToProps,
    {
        acAddMetadata,
        acSetChart,
        acSetLoadError,
        acSetLoading,
        acClearLoadError,
    }
)(Visualization);
