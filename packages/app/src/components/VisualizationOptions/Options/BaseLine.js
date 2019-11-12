import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import i18n from '@dhis2/d2-i18n';
import { Checkbox } from '@dhis2/ui-core';

import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';
import BaseLineValue from './BaseLineValue';
import BaseLineLabel from './BaseLineLabel';

export const BaseLine = ({ enabled, onChange }) => (
    <Fragment>
        <Checkbox
            checked={enabled}
            label={i18n.t('Base line')}
            name="baseLine-toggle"
            onChange={event => onChange(event.target.checked)}
            dense
        />
        {enabled ? (
            <Fragment>
                <BaseLineValue />
                <BaseLineLabel />
            </Fragment>
        ) : null}
    </Fragment>
);

BaseLine.propTypes = {
    enabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    enabled: sGetUiOptions(state).baseLine,
})

const mapDispatchToProps = dispatch => ({
    onChange: enabled => dispatch(acSetUiOptions({ baseLine: enabled })),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BaseLine);
