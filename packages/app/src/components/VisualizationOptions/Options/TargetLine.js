import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import i18n from '@dhis2/d2-i18n';
import { Checkbox } from '@dhis2/ui-core';

import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';
import TargetLineValue from './TargetLineValue';
import TargetLineLabel from './TargetLineLabel';

export const TargetLine = ({ enabled, onChange }) => (
    <Fragment>
        <Checkbox
            checked={enabled}
            label={i18n.t('Target line')}
            onChange={event => onChange(event.target.checked)}
            dense
        />
        {enabled ? (
            <Fragment>
                <TargetLineValue />
                <TargetLineLabel />
            </Fragment>
        ) : null}
    </Fragment>
);

TargetLine.propTypes = {
    enabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    enabled: sGetUiOptions(state).targetLine,
})

const mapDispatchToProps = dispatch => ({
    onChange: enabled => dispatch(acSetUiOptions({ targetLine: enabled })),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TargetLine);
