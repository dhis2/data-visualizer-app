import React from 'react';
import { connect } from 'react-redux';
import {
    LAYOUT_TYPE_DEFAULT,
    LAYOUT_TYPE_PIE,
    LAYOUT_TYPE_YEAR_OVER_YEAR,
    getLayoutTypeByVisType,
} from '@dhis2/analytics';

import DefaultLayout from './DefaultLayout/DefaultLayout';
import YearOverYearLayout from './YearOverYearLayout/YearOverYearLayout';
import PieLayout from './PieLayout/PieLayout';
import { sGetUiType } from '../../reducers/ui';

const componentMap = {
    [LAYOUT_TYPE_DEFAULT]: DefaultLayout,
    [LAYOUT_TYPE_PIE]: PieLayout,
    [LAYOUT_TYPE_YEAR_OVER_YEAR]: YearOverYearLayout,
};

const Layout = props => {
    const layoutType = getLayoutTypeByVisType(props.visType);

    const LayoutComponent = componentMap[layoutType];

    return <LayoutComponent {...props} />;
};

const mapStateToProps = state => ({
    visType: sGetUiType(state),
});

export default connect(mapStateToProps)(Layout);
