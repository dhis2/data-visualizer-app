import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import i18n from '@dhis2/d2-i18n';

import { sGetUi } from '../../reducers/ui';
import * as fromActions from '../../actions';
import styles from './styles/UpdateButton.style';

const onClickWrapper = props => () => {
    props.onUpdate(props.ui);
    props.onClick();
};

const UpdateButton = props => (
    <Button
        onClick={onClickWrapper(props)}
        style={styles}
        size="small"
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

UpdateButton.propTypes = {
    ui: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onClick: PropTypes.func,
};

UpdateButton.defaultProps = {
    onClick: Function.prototype,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateButton);
