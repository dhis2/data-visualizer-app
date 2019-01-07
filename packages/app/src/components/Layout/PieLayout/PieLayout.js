import React from 'react';

import DefaultAxis from '../DefaultLayout/DefaultAxis';
import defaultAxisStyles from '../DefaultLayout/styles/DefaultAxis.style';
import defaultLayoutStyles from '../DefaultLayout/styles/DefaultLayout.style';
import { AXIS_NAME_ROWS, AXIS_NAME_FILTERS } from '../../../modules/layout';

const Layout = () => (
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
                style={{
                    ...defaultLayoutStyles.filters,
                    ...defaultAxisStyles.axisContainerLeft,
                }}
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

export default Layout;
