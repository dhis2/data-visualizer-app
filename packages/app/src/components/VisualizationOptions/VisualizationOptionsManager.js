import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import i18n from '@dhis2/d2-i18n';

import UpdateButton from '../UpdateButton/UpdateButton';
import VisualizationOptions from './VisualizationOptions';

class VisualizationOptionsManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    onClose = event => {
        this.toggleVisualizationOptionsDialog();
    };

    toggleVisualizationOptionsDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        return (
            <Fragment>
                <Button
                    className={this.props.className}
                    onClick={this.toggleVisualizationOptionsDialog}
                >
                    {i18n.t('Options')}
                </Button>
                <Dialog
                    open={this.state.dialogIsOpen}
                    onClose={this.onClose}
                    maxWidth="md"
                >
                    <DialogTitle>{i18n.t('Chart options')}</DialogTitle>
                    <DialogContent>
                        <VisualizationOptions />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.onClose}>
                            {i18n.t('Hide')}
                        </Button>
                        <UpdateButton onClick={this.onClose} />
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

VisualizationOptionsManager.propTypes = {
    className: PropTypes.string,
};

export default VisualizationOptionsManager;
