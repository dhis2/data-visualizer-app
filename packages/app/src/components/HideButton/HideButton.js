import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import i18n from '@dhis2/d2-i18n';

import { acSetUiActiveModalDialog } from '../../actions/ui';
import styles from './styles/HideButton.style';

const HideButton = ({ closeDialog }) => (
    <Button
        onClick={() => closeDialog(null)}
        style={styles}
        size="small"
        disableRipple={true}
        disableFocusRipple={true}
    >
        {i18n.t('Hide')}
    </Button>
);

HideButton.propTypes = {
    closeDialog: PropTypes.func.isRequired,
};

export default connect(
    null,
    {
        closeDialog: acSetUiActiveModalDialog,
    }
)(HideButton);
