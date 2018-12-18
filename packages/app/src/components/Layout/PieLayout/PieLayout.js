import React from 'react';
import { connect } from 'react-redux';

import DefaultAxis from '../DefaultLayout/DefaultAxis';
import defaultLayoutStyles from '../DefaultLayout/styles/DefaultLayout.style';
import { AXIS_NAME_ROWS, AXIS_NAME_FILTERS } from '../../../modules/layout';

const Layout = props => (
    <div id="layout-ct" style={defaultLayoutStyles.ct}>
        <div
            id="axis-group-1"
            style={{
                ...defaultLayoutStyles.axisGroup,
                ...defaultLayoutStyles.axisGroupLeft,
            }}
        >
            <DefaultAxis
                axisName={AXIS_NAME_ROWS}
                style={defaultLayoutStyles.filters}
            />
        </div>
        <div
            id="axis-group-2"
            style={{
                ...defaultLayoutStyles.axisGroup,
                ...defaultLayoutStyles.axisGroupRight,
            }}
        >
            <DefaultAxis
                axisName={AXIS_NAME_FILTERS}
                style={defaultLayoutStyles.filters}
            />
        </div>
    </div>
);

Layout.displayName = 'Layout';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onSeriesChange: event => {
        if (event.target.value.length) {
            // dispatch(acSetUiYearOverYearSeries(event.target.value));
        }
    },
    // onCategoryChange: event =>
    //     dispatch(acSetUiYearOverYearCategory(event.target.value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);
