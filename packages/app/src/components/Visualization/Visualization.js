import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import i18n from '@dhis2/d2-i18n';
import debounce from 'lodash-es/debounce';

import styles from './styles/Visualization.style';
import ChartPlugin from '@dhis2/data-visualizer-plugin';

import { sGetVisualization } from '../../reducers/visualization';
import { sGetCurrent } from '../../reducers/current';
import {
    sGetUiRightSidebarOpen,
    sGetUiInterpretation,
} from '../../reducers/ui';
import { sGetLoadError } from '../../reducers/loader';

import { acAddMetadata } from '../../actions/metadata';
import { acSetChart } from '../../actions/chart';
import { acSetLoadError } from '../../actions/loader';

import BlankCanvas from './BlankCanvas';

export class Visualization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            renderId: null,
        };
    }

    onError = err => {
        const error =
            (err && err.message) ||
            i18n.t('Error generating chart, please try again');

        this.props.acSetLoadError(error);
    };

    onChartGenerated = svg => this.props.acSetChart(svg);

    onResponsesReceived = responses => {
        const forMetadata = {};

        responses.forEach(response =>
            Object.entries(response.metaData.items).forEach(([id, item]) => {
                forMetadata[id] = {
                    id,
                    name: item.name || item.displayName,
                    displayName: item.displayName,
                };
            })
        );

        this.props.acAddMetadata(forMetadata);
    };

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
        // open sidebar
        if (this.props.rightSidebarOpen !== prevProps.rightSidebarOpen) {
            this.getNewRenderId();
        }
    }

    render() {
        const { chartConfig, chartFilters, error } = this.props;
        const { renderId } = this.state;

        return Boolean(!chartConfig || error) ? (
            <BlankCanvas />
        ) : (
            <ChartPlugin
                id={renderId}
                d2={this.context.d2}
                config={chartConfig}
                filters={chartFilters}
                onChartGenerated={this.onChartGenerated}
                onResponsesReceived={this.onResponsesReceived}
                onError={this.onError}
                style={styles.chartCanvas}
            />
        );
    }
}

Visualization.contextTypes = {
    d2: PropTypes.object,
};

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
    }
)(Visualization);
