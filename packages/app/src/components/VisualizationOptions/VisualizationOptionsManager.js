import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { default as MuiButton } from '@material-ui/core/Button';

import i18n from '@dhis2/d2-i18n';
import {
    ButtonStrip,
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
} from '@dhis2/ui-core';

import UpdateButton from '../UpdateButton/UpdateButton';
import HideButton from '../HideButton/HideButton';
import UpdateVisualizationContainer from '../UpdateButton/UpdateVisualizationContainer'
import VisualizationOptions from './VisualizationOptions';

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
        handler();
        this.onClose();
    }

    render() {
        return (
            <Fragment>
                <MuiButton
                    className={this.props.className}
                    onClick={this.toggleVisualizationOptionsDialog}
                >
                    {i18n.t('Options')}
                </MuiButton>
                {this.state.dialogIsOpen && (
                    <Modal onClose={this.onClose} large>
                        <ModalTitle>{i18n.t('Options')}</ModalTitle>
                        <ModalContent>
                            <VisualizationOptions />
                        </ModalContent>
                        <ModalActions>
                            <ButtonStrip>
                                <HideButton
                                    onClick={this.onClose}
                                />
                                <UpdateVisualizationContainer
                                    renderComponent={handler =>
                                        <UpdateButton
                                            onClick={this.getPrimaryOnClick(handler)}
                                        />
                                    }
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

export default VisualizationOptionsManager;
