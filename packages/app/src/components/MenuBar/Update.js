import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { sGetUi } from '../../reducers/ui';
import { colors } from '../../colors';
import * as fromActions from '../../actions';

const Update = props => (
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
        Update
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
)(Update);
