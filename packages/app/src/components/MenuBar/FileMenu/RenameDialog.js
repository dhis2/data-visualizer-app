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
import { supportedFileTypes, getFileTypeLabel } from './util';

class RenameDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newName: '',
            newDescription: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        // reset form to initial value when reopening the save as dialog
        if (nextProps.open === true && !this.state.newName) {
            this.setState({
                newName: nextProps.fileModel.displayName || '',
                newDescription: nextProps.fileModel.displayDescription || '',
            });
        }
    }

    onRequestClose = () => {
        // reset form so when the dialog is reopened is consistent
        // with the actual file
        this.setState({ newName: '', newDescription: '' });

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

        const { fileModel, onRequestRename, onRequestRenameError } = this.props;

        if (fileModel) {
            const form = this.state;

            try {
                const payload = {
                    description: form.newDescription,
                };

                if (form.newName) {
                    payload.name = form.newName;
                }

                if (payload.name) {
                    const response = await this.context.d2.Api.getApi().patch(
                        fileModel.href,
                        payload
                    );

                    if (response.status === 'ERROR') {
                        throw new Error(response);
                    } else {
                        onRequestRename(payload, fileModel.id);
                    }
                }
            } catch (err) {
                onRequestRenameError(err);
            }
        }
    };

    render() {
        const { open, fileType } = this.props;

        return (
            <Dialog open={open} onClose={this.onRequestClose} maxWidth="md">
                <form onSubmit={this.handleSubmit}>
                    <DialogTitle>
                        {i18n.t('Rename {{what}}', {
                            what: getFileTypeLabel(fileType),
                        })}
                    </DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth>
                            <TextField
                                label={i18n.t('Name')}
                                value={this.state.newName}
                                required
                                margin="normal"
                                onChange={this.handleChange('newName')}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                label={i18n.t('Description')}
                                value={this.state.newDescription}
                                margin="normal"
                                multiline
                                rowsMax={4}
                                onChange={this.handleChange('newDescription')}
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
                            {i18n.t('Rename')}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

RenameDialog.contextTypes = {
    d2: PropTypes.object,
};

RenameDialog.defaultProps = {
    open: false,
    fileType: null,
    fileModel: null,
    onRequestClose: Function.prototype,
    onRequestRename: Function.prototype,
    onRequestRenameError: Function.prototype,
};

RenameDialog.propTypes = {
    open: PropTypes.bool,
    fileType: PropTypes.oneOf(supportedFileTypes),
    fileModel: PropTypes.object,
    onRequestClose: PropTypes.func,
    onRequestRename: PropTypes.func,
    onRequestRenameError: PropTypes.func,
};

export default RenameDialog;
