import React, { Component, Fragment } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import i18n from '@dhis2/d2-i18n';

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
                <Button onClick={this.toggleVisualizationOptionsDialog}>
                    {i18n.t('Options')}
                </Button>
                <Dialog
                    open={this.state.dialogIsOpen}
                    onClose={this.onClose}
                    fullWidth={true}
                >
                    <DialogTitle>{i18n.t('Chart options')}</DialogTitle>
                    <DialogContent>
                        <VisualizationOptions />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onClose}>{i18n.t('Hide')}</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

export default VisualizationOptionsManager;
