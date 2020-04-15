import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    getAvailableAxes,
    getAxisNameByLayoutType,
    getLayoutTypeByVisType,
} from '@dhis2/analytics'
import { SplitButton, Menu, MenuItem, Button } from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'

import { sGetUiActiveModalDialog, sGetUiType } from '../../../../reducers/ui'
import { acAddUiLayoutDimensions } from '../../../../actions/ui'
import styles from './styles/AddToLayoutButton.module.css'

export const AddToLayoutButton = ({
    dialogId,
    visType,
    onAddDimension,
    onClick,
}) => {
    const availableAxes = getAvailableAxes(visType)

    const AddToLayoutButton = availableAxes.length > 1 ? SplitButton : Button

    const clickHandler = axisId => {
        onAddDimension({
            [dialogId]: { axisId },
        })

        onClick()
    }

    const renderMenu = () => (
        <Menu maxWidth="380px">
            {getAvailableAxes(visType)
                .slice(1)
                .map(axis => (
                    <MenuItem
                        key={axis}
                        onClick={() => clickHandler(axis)}
                        label={i18n.t(`Add to {{axisName}}`, {
                            axisName: getAxisNameByLayoutType(
                                axis,
                                getLayoutTypeByVisType(visType)
                            ),
                        })}
                    />
                ))}
        </Menu>
    )

    return (
        <AddToLayoutButton
            component={availableAxes.length > 1 ? renderMenu() : null}
            onClick={() => clickHandler(availableAxes[0])}
            primary
            className={styles.button}
        >
            {i18n.t(`Add to {{axisName}}`, {
                axisName: getAxisNameByLayoutType(
                    availableAxes[0],
                    getLayoutTypeByVisType(visType)
                ),
            })}
        </AddToLayoutButton>
    )
}

AddToLayoutButton.propTypes = {
    dialogId: PropTypes.string.isRequired,
    visType: PropTypes.string.isRequired,
    onAddDimension: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    visType: sGetUiType(state),
    dialogId: sGetUiActiveModalDialog(state),
})

export default connect(mapStateToProps, {
    onAddDimension: acAddUiLayoutDimensions,
})(AddToLayoutButton)
