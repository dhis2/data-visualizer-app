import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createChart } from 'd2-charts-api';
import { sGetCurrent } from '../../reducers/current';
import { sGetVisualization } from '../../reducers/visualization';
import { sGetUi } from '../../reducers/ui';

export class Visualization extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.current !== prevProps.current) {
            this.renderVisualization();
        }
    }

    renderVisualization = async () => {
        const { d2, current } = this.props;

        if (current) {
            const req = new d2.analytics.request().fromModel(current);

            const rawResponse = await d2.analytics.aggregate.get(req);

            const res = new d2.analytics.response(rawResponse);

            createChart(res, current, 'visualization-container');
        }
    };

    render() {
        return (
            <section className="canvas">
                <div id="visualization-container">Visualization Canvas</div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    visualization: sGetVisualization(state),
    current: sGetCurrent(state),
    ui: sGetUi(state),
});

export default connect(mapStateToProps)(Visualization);
