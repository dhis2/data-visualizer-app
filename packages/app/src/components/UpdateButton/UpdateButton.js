import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { Button } from '@dhis2/ui-core';

const UpdateButton = ({ onClick, ...props }) => {
    return (
        <Button data-test="update-button" {...props} onClick={onClick} primary>
            {i18n.t('Update')}
        </Button>
    )
}

UpdateButton.propTypes = {
    onClick: PropTypes.func,
}

UpdateButton.defaultProps = {
    onClick: Function.prototype,
}

export default UpdateButton;
