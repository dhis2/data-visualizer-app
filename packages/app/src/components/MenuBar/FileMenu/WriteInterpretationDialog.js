import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import i18n from '@dhis2/d2-i18n';

import { supportedFileTypes } from './util';

class WriteInterpretationDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            interpretationText: '',
        };
    }

    onRequestClose = () => {
        // reset form so when the dialog is reopened is consistent
        // with the actual favorite
        this.setState({ interpretationText: '' });

        this.props.onRequestClose();
    };

    handleChange = field => event => {
        event.preventDefault();

        this.setState({
            [field]: event.target.value,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        const {
            fileType,
            fileModel,
            onRequestWriteInterpretation,
            onRequestWriteInterpretationError,
        } = this.props;

        if (fileModel) {
            const form = this.state;
            const url = `/interpretations/${fileType}/${fileModel.id}`;
            const headers = { 'Content-Type': 'text/plain' };

            try {
                await this.context.d2.Api.getApi().post(
                    url,
                    form.interpretationText,
                    { headers }
                );

                if (onRequestWriteInterpretation) {
                    onRequestWriteInterpretation();
                }
            } catch (err) {
                onRequestWriteInterpretationError(err);
            }
        }
    };

    render() {
        const { open } = this.props;

        return (
            <Dialog open={open} onClose={this.onRequestClose} maxWidth="md">
                <form onSubmit={this.handleSubmit}>
                    <DialogTitle>{i18n.t('Write interpretation')}</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth>
                            <TextField
                                value={this.state.interpretationText}
                                required
                                margin="normal"
                                multiline
                                rowsMax={4}
                                onChange={this.handleChange(
                                    'interpretationText'
                                )}
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onRequestClose} color="primary">
                            {i18n.t('Cancel')}
                        </Button>
                        <Button
                            type="submit"
                            onClick={this.handleSubmit}
                            color="primary"
                        >
                            {i18n.t('Post')}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

WriteInterpretationDialog.contextTypes = {
    d2: PropTypes.object,
};

WriteInterpretationDialog.defaultProps = {
    open: false,
    fileType: null,
    fileModel: null,
    onRequestClose: null,
    onRequestWriteInterpretation: null,
    onRequestWriteInterpretationError: null,
};

WriteInterpretationDialog.propTypes = {
    open: PropTypes.bool,
    fileType: PropTypes.oneOf(supportedFileTypes),
    fileModel: PropTypes.object,
    onRequestClose: PropTypes.func,
    onRequestWriteInterpretation: PropTypes.func,
    onRequestWriteInterpretationError: PropTypes.func,
};

export default WriteInterpretationDialog;
