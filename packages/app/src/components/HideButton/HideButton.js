import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import i18n from '@dhis2/d2-i18n';

import { acSetUiActiveModalDialog } from '../../actions/ui';

const HideButton = ({ className, closeDialog }) => (
    <Button
        className={className}
        color="primary"
        onClick={() => closeDialog(null)}
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
