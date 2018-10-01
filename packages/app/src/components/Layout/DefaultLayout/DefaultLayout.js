import React from 'react';

import Axis from './Axis';
import * as defaultLayoutStyle from './defaultStyle';

const styles = {
    ct: {
        display: 'flex',
    },
    axisGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    axisGroup1: {
        flexBasis: defaultLayoutStyle.DIMENSION_AXIS_WIDTH,
    },
    axisGroup2: {
        flexBasis: defaultLayoutStyle.FILTER_AXIS_WIDTH,
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

const Layout = () => (
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

Layout.displayName = 'Layout';

export default Layout;
