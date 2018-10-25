import React from 'react';
import { connect } from 'react-redux';

import DefaultLayout from './DefaultLayout/DefaultLayout';
import YearOnYearLayout from './YearOnYearLayout/YearOnYearLayout';
import {
    COLUMN,
    STACKED_COLUMN,
    BAR,
    STACKED_BAR,
    LINE,
    AREA,
    PIE,
    RADAR,
    GAUGE,
    YEAR_ON_YEAR,
} from '../../chartTypes';
import { sGetUiType } from '../../reducers/ui';

const layoutMap = {
    [COLUMN]: DefaultLayout,
    [STACKED_COLUMN]: DefaultLayout,
    [BAR]: DefaultLayout,
    [STACKED_BAR]: DefaultLayout,
    [LINE]: DefaultLayout,
    [AREA]: DefaultLayout,
    [PIE]: DefaultLayout,
    [RADAR]: DefaultLayout,
    [GAUGE]: DefaultLayout,
    [YEAR_ON_YEAR]: YearOnYearLayout,
};

const getLayoutByType = (type, props) => {
    const Layout = layoutMap[type];
    return <Layout {...props} />;
};

const Layout = props => getLayoutByType(props.type);

const mapStateToProps = state => ({
    type: sGetUiType(state),
});

export default connect(mapStateToProps)(Layout);
