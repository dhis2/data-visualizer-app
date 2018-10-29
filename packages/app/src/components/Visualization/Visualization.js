import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createChart } from 'd2-charts-api';
import i18n from '@dhis2/d2-i18n';
import { sGetCurrent } from '../../reducers/current';
import BlankCanvas, { visContainerId } from './BlankCanvas';
import { getOptionsForRequest } from '../../modules/options';
import { acAddMetadata } from '../../actions/metadata';
import { acSetLoadError } from '../../actions/loadError';
import { acSetChart } from '../../actions/chart';

export class Visualization extends Component {
    componentDidMount() {
        this.renderVisualization();
    }

    componentDidUpdate(prevProps) {
        if (this.props.current !== prevProps.current) {
            this.renderVisualization();
        }
    }

    componentWillUnmount() {}

    renderVisualization = async () => {
        const { d2, current } = this.props;

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

        try {
            const req = new d2.analytics.request()
                .fromModel(current)
                .withParameters(optionsForRequest);

            const rawResponse = await d2.analytics.aggregate.get(req);

            const res = new d2.analytics.response(rawResponse);

            this.props.acAddMetadata(res.metaData.items);

            const chartConfig = createChart(res, current, visContainerId);
            this.props.acSetChart(
                chartConfig.chart.getSVGForExport({
                    sourceHeight: 768,
                    sourceWidth: 1024,
                })
            );
        } catch (error) {
            this.props.acSetLoadError(i18n.t('Could not generate chart'));
        }
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
    { acAddMetadata, acSetChart, acSetLoadError }
)(Visualization);
