import React, { Component, Fragment } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import i18n from 'd2-i18n';

import ChartOptions from './ChartOptions';

class ChartOptionsManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    onClose = event => {
        this.toggleChartOptionsDialog();
    };

    toggleChartOptionsDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        return (
            <Fragment>
                <Button onClick={this.toggleChartOptionsDialog}>
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

export default ChartOptionsManager;
