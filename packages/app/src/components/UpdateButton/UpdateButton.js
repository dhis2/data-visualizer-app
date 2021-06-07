import i18n from '@dhis2/d2-i18n'
import { Button } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

const UpdateButton = ({ onClick, ...props }) => {
    return (
        <Button {...props} onClick={onClick} type="button" primary>
            {i18n.t('Update')}
        </Button>
    )
}

UpdateButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default UpdateButton
