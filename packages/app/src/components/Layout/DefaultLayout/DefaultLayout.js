import React from 'react';
import { connect } from 'react-redux';

import Axis from './Axis';
import { sGetUiLayout } from '../../../reducers/ui';
import { sGetDimensions } from '../../../reducers/dimensions';

const styles = {
    ct: {
        display: 'flex',
    },
    axisGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    axisGroup1: {
        flexBasis: '33%',
    },
    axisGroup2: {
        flexBasis: '67%',
    },
    columns: {
        flexBasis: '50%',
    },
    rows: {
        flexBasis: '50%',
    },
    filters: {
        flexBasis: '100%',
    },
};

class Layout extends React.Component {
    state = {
        dimensions: [],
    };

    render() {
        return (
            <div id="layout-ct" style={styles.ct}>
                <div
                    id="axis-group-1"
                    style={{ ...styles.axisGroup, ...styles.axisGroup1 }}
                >
                    <Axis axisName="columns" style={styles.columns} />
                    <Axis axisName="rows" style={styles.rows} />
                </div>
                <div
                    id="axis-group-2"
                    style={{ ...styles.axisGroup, ...styles.axisGroup2 }}
                >
                    <Axis axisName="filters" style={styles.filters} />
                </div>
            </div>
        );
    }
}

Layout.displayName = 'Layout';

const mapStateToProps = state => ({
    layout: sGetUiLayout(state),
    dimensions: sGetDimensions(state),
});

export default connect(mapStateToProps)(Layout);
