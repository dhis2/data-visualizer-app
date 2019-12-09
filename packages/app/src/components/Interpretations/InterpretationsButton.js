import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import i18n from '@dhis2/d2-i18n'

import { sGetUiRightSidebarOpen } from '../../reducers/ui'
import { sGetCurrent } from '../../reducers/current'
import { acToggleUiRightSidebarOpen } from '../../actions/ui'

const styles = theme => ({
    icon: {
        marginRight: theme.spacing.unit,
        marginTop: 2,
    },
})
export const InterpretationsButton = props => (
    <Button
        className={props.className}
        size="small"
        disabled={!props.id}
        disableRipple={true}
        disableFocusRipple={true}
        onClick={props.onClick}
    >
        {props.rightSidebarOpen ? (
            <KeyboardArrowRightIcon className={props.classes.icon} />
        ) : (
            <KeyboardArrowLeftIcon className={props.classes.icon} />
        )}
        {i18n.t('Interpretations')}
    </Button>
)

InterpretationsButton.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    rightSiderbarOpen: PropTypes.bool,
    onClick: PropTypes.func,
}

const mapStateToProps = state => ({
    rightSidebarOpen: sGetUiRightSidebarOpen(state),
    id: (sGetCurrent(state) || {}).id,
})

const mapDispatchToProps = dispatch => ({
    onClick: () => dispatch(acToggleUiRightSidebarOpen()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(InterpretationsButton))
