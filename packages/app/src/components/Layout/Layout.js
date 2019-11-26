import React from 'react';
import { connect } from 'react-redux';
import {
    VIS_TYPE_COLUMN,
    VIS_TYPE_STACKED_COLUMN,
    VIS_TYPE_BAR,
    VIS_TYPE_STACKED_BAR,
    VIS_TYPE_LINE,
    VIS_TYPE_AREA,
    VIS_TYPE_PIE,
    VIS_TYPE_RADAR,
    VIS_TYPE_GAUGE,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_PIVOT_TABLE,
} from '@dhis2/analytics';

import DefaultLayout from './DefaultLayout/DefaultLayout';
import YearOverYearLayout from './YearOverYearLayout/YearOverYearLayout';
import PieLayout from './PieLayout/PieLayout';
import { sGetUiType } from '../../reducers/ui';

const layoutMap = {
    [VIS_TYPE_COLUMN]: DefaultLayout,
    [VIS_TYPE_STACKED_COLUMN]: DefaultLayout,
    [VIS_TYPE_BAR]: DefaultLayout,
    [VIS_TYPE_STACKED_BAR]: DefaultLayout,
    [VIS_TYPE_LINE]: DefaultLayout,
    [VIS_TYPE_AREA]: DefaultLayout,
    [VIS_TYPE_PIE]: PieLayout,
    [VIS_TYPE_RADAR]: DefaultLayout,
    [VIS_TYPE_GAUGE]: PieLayout,
    [VIS_TYPE_YEAR_OVER_YEAR_LINE]: YearOverYearLayout,
    [VIS_TYPE_YEAR_OVER_YEAR_COLUMN]: YearOverYearLayout,
    [VIS_TYPE_SINGLE_VALUE]: PieLayout,
    [VIS_TYPE_PIVOT_TABLE]: DefaultLayout,
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
