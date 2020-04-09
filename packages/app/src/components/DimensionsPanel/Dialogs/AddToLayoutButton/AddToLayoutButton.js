import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    getAvailableAxes,
    getAxisNameByLayoutType,
    getLayoutTypeByVisType,
} from '@dhis2/analytics'
import { SplitButton, Menu, MenuItem, Button } from '@dhis2/ui-core'

import { sGetUiActiveModalDialog, sGetUiType } from '../../../../reducers/ui'
import { acAddUiLayoutDimensions } from '../../../../actions/ui'

import i18n from '@dhis2/d2-i18n'

export class AddToLayoutButton extends Component {
    constructor(props) {
        super(props)
        this.buttonRef = React.createRef()
    }

    onUpdate = axisId => {
        this.props.onAddDimension({
            [this.props.dialogId]: { axisId },
        })

        this.props.onClick()
    }

    renderMenuItems = () =>
        getAvailableAxes(this.props.visType)
            .slice(1)
            .map(axis => (
                <MenuItem
                    key={axis}
                    onClick={() => this.onUpdate(axis)}
                    label={i18n.t(`Add to {{axisName}}`, {
                        axisName: getAxisNameByLayoutType(
                            axis,
                            getLayoutTypeByVisType(this.props.visType)
                        ),
                    })}
                />
            ))

    render() {
        const availableAxes = getAvailableAxes(this.props.visType)
        const AddToLayoutButton =
            availableAxes.length > 1 ? SplitButton : Button

        return (
            <div ref={addToRef => (this.buttonRef = addToRef)}>
                <AddToLayoutButton
                    component={
                        availableAxes.length > 1 ? (
                            <Menu maxWidth="380px">
                                {this.renderMenuItems()}
                            </Menu>
                        ) : null
                    }
                    onClick={() => this.onUpdate(availableAxes[0])}
                    primary
                >
                    {i18n.t(`Add to {{axisName}}`, {
                        axisName: getAxisNameByLayoutType(
                            availableAxes[0],
                            getLayoutTypeByVisType(this.props.visType)
                        ),
                    })}
                </AddToLayoutButton>
            </div>
        )
    }
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
