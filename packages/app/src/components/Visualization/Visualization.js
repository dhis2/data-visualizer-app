import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createChart } from 'd2-charts-api';
import { sGetCurrent } from '../../reducers/current';
import { getOptionsForRequest } from '../../options';

export class Visualization extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.current !== prevProps.current) {
            this.renderVisualization();
        }
    }

    renderVisualization = async () => {
        const { d2, current } = this.props;

        if (current) {
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
        }
    };

    render() {
        return (
            <section className="canvas">
                <div id="visualization-container">
                    <div style={{ margin: 50 }}>Visualization Canvas</div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    current: sGetCurrent(state),
});

export default connect(mapStateToProps)(Visualization);
