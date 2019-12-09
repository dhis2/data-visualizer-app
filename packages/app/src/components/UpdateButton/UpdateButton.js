import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import i18n from '@dhis2/d2-i18n'

import styles from './styles/UpdateButton.style'

const UpdateButton = ({ classes, flat, onClick, ...props }) => {
    return (
        <Button
            data-test="update-button"
            {...props}
            className={
                flat ? `${classes.flat} ${props.className}` : props.className
            }
            variant="contained"
            color="primary"
            onClick={onClick}
            disableRipple={true}
            disableFocusRipple={true}
        >
            {i18n.t('Update')}
        </Button>
    )
}

UpdateButton.propTypes = {
    classes: PropTypes.object.isRequired,
    flat: PropTypes.bool,
    onClick: PropTypes.func,
}

UpdateButton.defaultProps = {
    flat: false,
    onClick: Function.prototype,
}

export default withStyles(styles)(UpdateButton)
