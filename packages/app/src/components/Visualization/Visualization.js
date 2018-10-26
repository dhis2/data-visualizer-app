import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createChart } from 'd2-charts-api';
import { sGetCurrent } from '../../reducers/current';
import BlankCanvas, { visContainerId } from './BlankCanvas';
import { getOptionsForRequest } from '../../modules/options';
import { acAddMetadata } from '../../actions/metadata';
import { acSetChart } from '../../actions/chart';
import {
    apiFetchAnalytics,
    apiFetchAnalyticsForYearOnYear,
} from '../../api/analytics';
import { YEAR_ON_YEAR } from '../VisualizationTypeSelector/visualizationTypes';

export class Visualization extends Component {
    componentDidMount() {
        this.renderVisualization();
    }

    componentDidUpdate(prevProps) {
        if (this.props.current !== prevProps.current) {
            this.renderVisualization();
        }
    }

    renderVisualization = async () => {
        const { current } = this.props;

        const optionsForRequest = getOptionsForRequest().reduce(
            (map, [option, props]) => {
                // only add parameter if value !== default
                if (current[option] !== props.defaultValue) {
                    map[option] = current[option];
                }

                return map;
            },
            {}
        );

        const extraOptions = {};
        let responses = [];

        if (current.type === YEAR_ON_YEAR) {
            let yearlySeriesLabels = [];

            ({
                responses,
                yearlySeriesLabels,
            } = await apiFetchAnalyticsForYearOnYear(
                current,
                optionsForRequest
            ));
            console.log('res', responses, yearlySeriesLabels);
            extraOptions.yearlySeries = yearlySeriesLabels;
        } else {
            responses = await apiFetchAnalytics(current, optionsForRequest);
        }

        // TODO add a try/catch here
        responses.forEach(res => this.props.acAddMetadata(res.metaData.items));

        const chartConfig = createChart(
            responses,
            current,
            visContainerId,
            extraOptions
        );

        this.props.acSetChart(
            chartConfig.chart.getSVGForExport({
                sourceHeight: 768,
                sourceWidth: 1024,
            })
        );
    };

    render() {
        return <BlankCanvas />;
    }
}

const mapStateToProps = state => ({
    current: sGetCurrent(state),
});

export default connect(
    mapStateToProps,
    { acAddMetadata, acSetChart }
)(Visualization);
