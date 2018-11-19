import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import i18n from '@dhis2/d2-i18n';

import { sGetUiRightSidebarOpen } from '../../reducers/ui';
import { sGetCurrent } from '../../reducers/current';
import { acToggleUiRightSidebarOpen } from '../../actions/ui';
import styles from './styles/InterpretationsButton.style';

export const InterpretationsButton = props => (
    <Button
        size="small"
        disabled={!Boolean(props.id)}
        disableRipple={true}
        disableFocusRipple={true}
        style={{ ...styles, ...props.labelStyle }}
        onClick={props.onClick}
    >
        {props.rightSidebarOpen ? (
            <KeyboardArrowRightIcon />
        ) : (
            <KeyboardArrowLeftIcon />
        )}
        {i18n.t('Interpretations')}
    </Button>
);

InterpretationsButton.propTypes = {
    rightSiderbarOpen: PropTypes.bool,
    onClick: PropTypes.func,
    labelStyle: PropTypes.object,
};

const mapStateToProps = state => ({
    rightSidebarOpen: sGetUiRightSidebarOpen(state),
    id: (sGetCurrent(state) || {}).id,
});

const mapDispatchToProps = dispatch => ({
    onClick: () => {
        document.getElementById('visualization-container').innerHTML = '';
        dispatch(acToggleUiRightSidebarOpen());
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InterpretationsButton);
