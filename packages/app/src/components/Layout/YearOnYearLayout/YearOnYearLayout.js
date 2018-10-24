import React from 'react';

import DefaultAxis from '../DefaultLayout/DefaultAxis';
import defaultLayoutStyles from '../DefaultLayout/styles/DefaultLayout.style';
import YearOnYearAxis from './YearOnYearAxis';

const Layout = () => (
    <div id="layout-ct" style={defaultLayoutStyles.ct}>
        <div
            id="axis-group-1"
            style={{
                ...defaultLayoutStyles.axisGroup,
                ...defaultLayoutStyles.axisGroupLeft,
            }}
        >
            <YearOnYearAxis
                axisName="yearOnYearSeries"
                style={defaultLayoutStyles.columns}
            />
            <YearOnYearAxis
                axisName="yearOnYearCategory"
                style={defaultLayoutStyles.rows}
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
                axisName="filters"
                style={defaultLayoutStyles.filters}
            />
        </div>
    </div>
);

Layout.displayName = 'Layout';

export default Layout;
