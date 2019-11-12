import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { default as MuiButton } from '@material-ui/core/Button';

import i18n from '@dhis2/d2-i18n';
import {
    Button,
    ButtonStrip,
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
} from '@dhis2/ui-core';

import UpdateButton from '../UpdateButton/UpdateButton';
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

    render() {
        return (
            <Fragment>
                <MuiButton
                    className={this.props.className}
                    onClick={this.toggleVisualizationOptionsDialog}
                >
                    {i18n.t('Options')}
                </MuiButton>
                <Modal
                    open={this.state.dialogIsOpen}
                    onClose={this.onClose}
                    large
                >
                    <ModalTitle>{i18n.t('Options')}</ModalTitle>
                    <ModalContent>
                        <VisualizationOptions />
                    </ModalContent>
                    <ModalActions>
                        <ButtonStrip>
                            <Button
                                type="button"
                                secondary
                                onClick={this.onClose}
                            >
                                {i18n.t('Hide')}
                            </Button>
                            <UpdateButton onClick={this.onClose} />
                        </ButtonStrip>
                    </ModalActions>
                </Modal>
            </Fragment>
        )
    }
}

VisualizationOptionsManager.propTypes = {
    className: PropTypes.string,
    visualizationType: PropTypes.string,
}

export default VisualizationOptionsManager;
