import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import i18n from '@dhis2/d2-i18n';

import { sGetUi } from '../../reducers/ui';
import { sGetCurrent } from '../../reducers/current';
import * as fromActions from '../../actions';
import history from '../../modules/history';
import styles from './styles/UpdateButton.style';

const UpdateButton = ({ onUpdate, ui, current, onClick, ...props }) => {
    const wrappedOnClick = () => {
        onUpdate(ui);
        if (current && current.id) {
            history.push(`/${current.id}`);
        }
        onClick();
    }

    return (
        <Button
            {...props}
            variant="contained"
            color="primary"
            onClick={wrappedOnClick}
            disableRipple={true}
            disableFocusRipple={true}
        >
            {i18n.t('Update')}
        </Button>
    )
}

const mapStateToProps = state => ({
    ui: sGetUi(state),
    current: sGetCurrent(state),
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
