import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import i18n from '@dhis2/d2-i18n';

import { sGetUi } from '../../reducers/ui';
import { colors } from '../../colors';
import * as fromActions from '../../actions';

const UpdateButton = props => (
    <Button
        onClick={() => props.onUpdate(props.ui)}
        style={{
            backgroundColor: colors.accentPrimaryDark,
            color: colors.white,
            fontSize: 13,
        }}
        disableRipple={true}
        disableFocusRipple={true}
    >
        {i18n.t('Update')}
    </Button>
);

const mapStateToProps = state => ({
    ui: sGetUi(state),
});

const mapDispatchToProps = dispatch => ({
    onUpdate: ui => dispatch(fromActions.fromCurrent.acSetCurrentFromUi(ui)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateButton);
