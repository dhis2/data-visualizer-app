import React, { Component, Fragment } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import i18n from '@dhis2/d2-i18n';

import ChartOptions from './ChartOptions';

class OptionsManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    onClose = event => {
        this.toggleOptionsDialog();
    };

    toggleOptionsDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        return (
            <Fragment>
                <Button onClick={this.toggleOptionsDialog}>
                    {i18n.t('Options')}
                </Button>
                <Dialog open={this.state.dialogIsOpen} onClose={this.onClose}>
                    <DialogTitle>{i18n.t('Chart options')}</DialogTitle>
                    <DialogContent>
                        <ChartOptions />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onClose}>{i18n.t('Hide')}</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

export default OptionsManager;
