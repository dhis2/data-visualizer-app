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

const onClickWrapper = props => () => {
    props.clearLoadError();
    props.onUpdate(props.ui);

    const pathWithoutInterpretation = props.current
        ? `/${props.current.id}`
        : '';

    if (history.location.pathname !== pathWithoutInterpretation) {
        history.push(pathWithoutInterpretation);
    }

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
    current: sGetCurrent(state),
});

const mapDispatchToProps = {
    onUpdate: fromActions.fromCurrent.acSetCurrentFromUi,
    clearLoadError: fromActions.fromLoader.acClearLoadError,
};

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
