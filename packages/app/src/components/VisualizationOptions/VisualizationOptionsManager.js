import i18n from '@dhis2/d2-i18n'
import {
    ButtonStrip,
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
} from '@dhis2/ui'
import React, { Component, Fragment } from 'react'
import HideButton from '../HideButton/HideButton'
import MenuButton from '../MenuButton/MenuButton'
import UpdateButton from '../UpdateButton/UpdateButton'
import UpdateVisualizationContainer from '../UpdateButton/UpdateVisualizationContainer'
import styles from './styles/VisualizationOptionsManager.module.css'
import VisualizationOptions from './VisualizationOptions'

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
                    onClick={this.toggleVisualizationOptionsDialog}
                    dataTest={'app-menubar-options-button'}
                >
                    {i18n.t('Options')}
                </MenuButton>
                {this.state.dialogIsOpen && (
                    <Modal
                        onClose={this.onClose}
                        position="top"
                        large
                        dataTest={'options-modal'}
                    >
                        <ModalTitle>{i18n.t('Options')}</ModalTitle>
                        <ModalContent
                            className={styles.modalContent}
                            dataTest={'options-modal-content'}
                        >
                            <VisualizationOptions />
                        </ModalContent>
                        <ModalActions dataTest={'options-modal-actions'}>
                            <ButtonStrip>
                                <HideButton
                                    onClick={this.onClose}
                                    dataTest={'options-modal-action-cancel'}
                                />
                                <UpdateVisualizationContainer
                                    renderComponent={handler => (
                                        <UpdateButton
                                            onClick={this.getPrimaryOnClick(
                                                handler
                                            )}
                                            dataTest={
                                                'options-modal-action-confirm'
                                            }
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

export default VisualizationOptionsManager
