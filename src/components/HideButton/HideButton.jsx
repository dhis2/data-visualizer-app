import i18n from '@dhis2/d2-i18n'
import { Button } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

const HideButton = ({ onClick, ...props }) => (
    <Button {...props} type="button" secondary onClick={onClick}>
        {i18n.t('Hide')}
    </Button>
)

HideButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default HideButton
