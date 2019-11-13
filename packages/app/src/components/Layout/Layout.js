import React from 'react';
import { connect } from 'react-redux';

import DefaultLayout from './DefaultLayout/DefaultLayout';
import YearOverYearLayout from './YearOverYearLayout/YearOverYearLayout';
import PieLayout from './PieLayout/PieLayout';
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
    YEAR_OVER_YEAR_LINE,
    YEAR_OVER_YEAR_COLUMN,
    SINGLE_VALUE,
    PIVOT_TABLE,
} from '../../modules/chartTypes';
import { sGetUiType } from '../../reducers/ui';

const layoutMap = {
    [COLUMN]: DefaultLayout,
    [STACKED_COLUMN]: DefaultLayout,
    [BAR]: DefaultLayout,
    [STACKED_BAR]: DefaultLayout,
    [LINE]: DefaultLayout,
    [AREA]: DefaultLayout,
    [PIE]: PieLayout,
    [RADAR]: DefaultLayout,
    [GAUGE]: PieLayout,
    [YEAR_OVER_YEAR_LINE]: YearOverYearLayout,
    [YEAR_OVER_YEAR_COLUMN]: YearOverYearLayout,
    [SINGLE_VALUE]: PieLayout,
    [PIVOT_TABLE]: DefaultLayout,
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
