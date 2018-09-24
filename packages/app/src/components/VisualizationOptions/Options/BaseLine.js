import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';

import i18n from '@dhis2/d2-i18n';
import { sGetUiOptions } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';
import BaseLineValue from './BaseLineValue';
import BaseLineLabel from './BaseLineLabel';

const BaseLine = ({ enabled, onChange }) => (
    <FormGroup row={true}>
        <FormControlLabel
            control={
                <Switch
                    checked={enabled}
                    onChange={event => onChange(event.target.checked)}
                />
            }
            label={i18n.t('Base line')}
        />
        {enabled ? (
            <Fragment>
                <BaseLineValue />
                <BaseLineLabel />
            </Fragment>
        ) : null}
    </FormGroup>
);

const mapStateToProps = state => ({
    enabled: sGetUiOptions(state).baseLine,
});

const mapDispatchToProps = dispatch => ({
    onChange: enabled => dispatch(acSetUiOptions({ baseLine: enabled })),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BaseLine);
