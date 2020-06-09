import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import {
    ButtonStrip,
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
} from '@dhis2/ui'

import UpdateButton from '../UpdateButton/UpdateButton'
import HideButton from '../HideButton/HideButton'
import UpdateVisualizationContainer from '../UpdateButton/UpdateVisualizationContainer'
import VisualizationOptions from './VisualizationOptions'
import MenuButton from '../MenuButton/MenuButton'

class VisualizationOptionsManager extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dialogIsOpen: false,
        }
    }

    onClose = () => {
        this.toggleVisualizationOptionsDialog()
    }

    toggleVisualizationOptionsDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen })
    }

    getPrimaryOnClick = handler => () => {
        handler()
        this.onClose()
    }

    render() {
        return (
            <Fragment>
                <MenuButton
                    className={this.props.className}
                    onClick={this.toggleVisualizationOptionsDialog}
                >
                    {i18n.t('Options')}
                </MenuButton>
                {this.state.dialogIsOpen && (
                    <Modal onClose={this.onClose} position="top" large>
                        <ModalTitle>{i18n.t('Options')}</ModalTitle>
                        <ModalContent>
                            <VisualizationOptions />
                        </ModalContent>
                        <ModalActions>
                            <ButtonStrip>
                                <HideButton onClick={this.onClose} />
                                <UpdateVisualizationContainer
                                    renderComponent={handler => (
                                        <UpdateButton
                                            onClick={this.getPrimaryOnClick(
                                                handler
                                            )}
                                        />
                                    )}
                                />
                            </ButtonStrip>
                        </ModalActions>
                    </Modal>
                )}
            </Fragment>
        )
    }
}

VisualizationOptionsManager.propTypes = {
    className: PropTypes.string,
}

export default VisualizationOptionsManager
