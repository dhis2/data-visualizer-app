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

class SaveAsDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        // reset form to initial value when reopening the save as dialog
        if (
            nextProps.open === true &&
            nextProps.fileModel &&
            !this.state.name
        ) {
            this.setState({
                name: nextProps.fileModel.displayName || '',
                description: nextProps.fileModel.displayDescription || '',
            });
        }
    }

    onRequestClose = () => {
        // reset form so when the dialog is reopened is consistent
        // with the actual favorite
        this.setState({ name: '', description: '' });

        this.props.onRequestClose();
    };

    handleChange = field => event => {
        event.preventDefault();

        this.setState({
            [field]: event.target.value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        if (this.props.onRequestSaveAs) {
            this.props.onRequestSaveAs(this.state);
        }
    };

    render() {
        const { open, fileType } = this.props;

        return (
            <Dialog open={open} onClose={this.onRequestClose} maxWidth="md">
                <DialogTitle>
                    {i18n.t('Save {{what}} as', {
                        what: getFileTypeLabel(fileType),
                    })}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={this.handleSubmit}>
                        <FormControl fullWidth>
                            <TextField
                                label={i18n.t('Name')}
                                value={this.state.name}
                                required
                                margin="normal"
                                onChange={this.handleChange('name')}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                label={i18n.t('Description')}
                                value={this.state.description}
                                margin="normal"
                                multiline
                                rowsMax={4}
                                onChange={this.handleChange('description')}
                            />
                        </FormControl>
                    </form>
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
                        {i18n.t('Save')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

SaveAsDialog.contextTypes = {
    d2: PropTypes.object,
};

SaveAsDialog.defaultProps = {
    open: false,
    fileType: null,
    fileModel: null,
    onRequestClose: null,
    onRequestSaveAs: null,
};

SaveAsDialog.propTypes = {
    open: PropTypes.bool,
    fileType: PropTypes.oneOf(supportedFileTypes),
    fileModel: PropTypes.object,
    onRequestClose: PropTypes.func,
    onRequestSaveAs: PropTypes.func,
};

export default SaveAsDialog;
