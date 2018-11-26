import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MUISnackbar from '@material-ui/core/Snackbar';
import MUISnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';

import InfoIcon from '@material-ui/icons/InfoOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { sGetSnackbar } from '../../reducers/snackbar';
import { tDoCloseSnackbar } from '../../actions';
import styles from './styles/Snackbar.style';

export const Snackbar = ({
    classes,
    variant,
    open,
    message,
    duration,
    onClose,
}) => (
    <MUISnackbar open={open} autoHideDuration={duration} onClose={onClose}>
        <MUISnackbarContent
            className={classes[variant]}
            message={
                <span className={classes.container}>
                    {variant === 'error' ? (
                        <InfoIcon className={classes.icon} />
                    ) : null}
                    {message}
                    {variant === 'warning' ? (
                        <CloseIcon
                            className={classes.closeIcon}
                            onClick={onClose}
                        />
                    ) : null}
                </span>
            }
        />
    </MUISnackbar>
);

Snackbar.propTypes = {
    classes: PropTypes.object.isRequired,
    variant: PropTypes.oneOf(['information', 'warning', 'error']).isRequired,
    open: PropTypes.bool,
    message: PropTypes.string,
    duration: PropTypes.number,
    onClose: PropTypes.func,
};

const mapStateToProps = state => {
    const { variant, message, duration, open } = sGetSnackbar(state);

    return {
        variant,
        open,
        message,
        duration,
    };
};

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(tDoCloseSnackbar()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Snackbar));
