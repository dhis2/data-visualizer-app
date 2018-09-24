import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createChart } from 'd2-charts-api';
import { sGetCurrent } from '../../reducers/current';
import { BlankCanvas } from './BlankCanvas';
import { getOptionsForRequest } from '../../options';

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

        const req = new d2.analytics.request()
            .fromModel(current)
            .withParameters(optionsForRequest);

        const rawResponse = await d2.analytics.aggregate.get(req);

        const res = new d2.analytics.response(rawResponse);

        createChart(res, current, 'visualization-container');
    };

    render() {
        return <BlankCanvas />;
    }
}

const mapStateToProps = state => ({
    current: sGetCurrent(state),
});

export default connect(mapStateToProps)(Visualization);
