import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import i18n from '@dhis2/d2-i18n';

import { sGetUi } from '../../reducers/ui';
import { sGetCurrent } from '../../reducers/current';
import * as fromActions from '../../actions';
import history from '../../modules/history';
import styles from './styles/UpdateButton.style';
import { CURRENT_AO_KEY } from '../../api/userDataStore';

const UpdateButton = ({
    classes,
    clearLoadError,
    onUpdate,
    ui,
    current,
    onClick,
    flat,
    ...props
}) => {
    const wrappedOnClick = () => {
        clearLoadError();

        // validate layout
        console.log('update button', current, ui);

        onUpdate(ui);

        const urlContainsCurrentAOKey =
            history.location.pathname === '/' + CURRENT_AO_KEY;

        const pathWithoutInterpretation =
            current && current.id ? `/${current.id}` : '/';

        if (
            !urlContainsCurrentAOKey &&
            history.location.pathname !== pathWithoutInterpretation
        ) {
            history.push(pathWithoutInterpretation);
        }

        onClick();
    };

    return (
        <Button
            data-test="update-button"
            {...props}
            className={
                flat ? `${classes.flat} ${props.className}` : props.className
            }
            variant="contained"
            color="primary"
            onClick={wrappedOnClick}
            disableRipple={true}
            disableFocusRipple={true}
        >
            {i18n.t('Update')}
        </Button>
    );
};

const mapStateToProps = state => ({
    ui: sGetUi(state),
    current: sGetCurrent(state),
});

const mapDispatchToProps = {
    onUpdate: fromActions.fromCurrent.acSetCurrentFromUi,
    clearLoadError: fromActions.fromLoader.acClearLoadError,
};

UpdateButton.propTypes = {
    classes: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    flat: PropTypes.bool,
};

UpdateButton.defaultProps = {
    onClick: Function.prototype,
    flat: false,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(UpdateButton));
