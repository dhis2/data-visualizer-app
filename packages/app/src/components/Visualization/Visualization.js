import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import i18n from '@dhis2/d2-i18n';
import debounce from 'lodash-es/debounce';

import ChartPlugin from 'data-visualizer-plugin';

import { sGetVisualization } from '../../reducers/visualization';
import { sGetCurrent } from '../../reducers/current';
import {
    sGetUiRightSidebarOpen,
    sGetUiInterpretation,
} from '../../reducers/ui';
import { sGetLoadError } from '../../reducers/loader';

import { acAddMetadata } from '../../actions/metadata';
import { acSetChart } from '../../actions/chart';
import {
    acSetLoadError,
    acSetLoading,
    acClearLoadError,
} from '../../actions/loader';

import { validateLayout } from '../../modules/layoutValidation';

import BlankCanvas from './BlankCanvas';

export class Visualization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            renderId: null,
        };

        if (props.chartConfig) {
            this.validate(props.chartConfig);
        }
    }

    validate = visualization => {
        try {
            validateLayout(visualization);

            this.props.acClearLoadError();
        } catch (err) {
            this.onError(err);
        }
    };

    onError = err => {
        const error =
            (err && err.message) ||
            i18n('Error generating chart, please try again');

        this.props.acSetLoadError(error);
    };

    onChartGenerated = svg => this.props.acSetChart(svg);

    onResponsesReceived = responses =>
        responses.forEach(response =>
            this.props.acAddMetadata(response.metaData.items)
        );

    getNewRenderId = () =>
        this.setState({
            renderId:
                typeof this.state.renderId === 'number'
                    ? this.state.renderId + 1
                    : 1,
        });

    addResizeHandler = () => {
        window.addEventListener(
            'resize',
            debounce(() => {
                this.getNewRenderId();
            }, 300)
        );
    };

    componentDidMount() {
        this.addResizeHandler();
    }

    componentDidUpdate(prevProps) {
        if (this.props.chartConfig !== prevProps.chartConfig) {
            this.validate(this.props.chartConfig);
            return;
        }

        // open sidebar
        if (this.props.rightSidebarOpen !== prevProps.rightSidebarOpen) {
            this.getNewRenderId();
        }
    }

    render() {
        const { chartConfig, chartFilters, error } = this.props;
        const { renderId } = this.state;

        return error ? (
            <BlankCanvas />
        ) : (
            <ChartPlugin
                id={renderId}
                config={chartConfig}
                filters={chartFilters}
                onChartGenerated={this.onChartGenerated}
                onResponsesReceived={this.onResponsesReceived}
                onError={this.onError}
            />
        );
    }
}

export const chartConfigSelector = createSelector(
    [sGetCurrent, sGetVisualization, sGetUiInterpretation],
    (current, visualization, interpretation) =>
        interpretation.id ? visualization : current
);

export const chartFiltersSelector = createSelector(
    [sGetUiInterpretation],
    interpretation =>
        interpretation.created
            ? { relativePeriodDate: interpretation.created }
            : {}
);

const mapStateToProps = state => ({
    chartConfig: chartConfigSelector(state),
    chartFilters: chartFiltersSelector(state),
    rightSidebarOpen: sGetUiRightSidebarOpen(state),
    error: sGetLoadError(state),
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
