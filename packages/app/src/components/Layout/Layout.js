import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';

import { acSetLoadError, acClearLoadError } from '../../actions/loader';
import { validateLayout } from '../../modules/layoutValidation';

import { sGetCurrentFromUi } from '../../reducers/current';

import DefaultLayout from './DefaultLayout/DefaultLayout';
import YearOverYearLayout from './YearOverYearLayout/YearOverYearLayout';
import PieLayout from './PieLayout/PieLayout';
import SingleValueLayout from './SingleValueLayout/SingleValueLayout';
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
    [SINGLE_VALUE]: SingleValueLayout,
};

const getLayoutByType = (type, props) => {
    const Layout = layoutMap[type];
    return <Layout {...props} />;
};

class Layout extends Component {
    validate = visualization => {
        try {
            validateLayout(visualization);

            this.props.acClearLoadError();
        } catch (err) {
            this.onError(err);
        }
    };

    onError = err => {
        const error = (err && err.message) || i18n.t('Error validating layout');

        this.props.acSetLoadError(error);
    };

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type) {
            this.validate({
                ...this.props.currentFromUi,
                type: this.props.type,
            });
        }
    }

    render() {
        return getLayoutByType(this.props.type);
    }
}

const mapStateToProps = state => ({
    type: sGetUiType(state),
    currentFromUi: sGetCurrentFromUi(state),
});

export default connect(
    mapStateToProps,
    { acSetLoadError, acClearLoadError }
)(Layout);
