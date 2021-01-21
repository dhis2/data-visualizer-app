import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Translate from '@material-ui/icons/Translate';

import i18n from '@dhis2/d2-i18n';
import TranslationDialog from '@dhis2/d2-ui-translation-dialog';

class TranslateMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
        };
    }

    onClose = () => {
        this.toggleTranslationDialog();

        if (this.props.onClose) {
            this.props.onClose();
        }
    };

    onDialogReturn = success => (args) => {
        const { onTranslate, onTranslateError } = this.props;

        this.toggleTranslationDialog();

        if (success && onTranslate) {
            onTranslate(args);
        } else if (onTranslateError) {
            onTranslateError(args);
        }
    };

    toggleTranslationDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    render() {
        const { enabled, fileModel } = this.props;

        return (
            <Fragment>
                <MenuItem disabled={!enabled} onClick={this.toggleTranslationDialog}>
                    <ListItemIcon>
                        <Translate />
                    </ListItemIcon>
                    <ListItemText primary={i18n.t('Translate')} />
                </MenuItem>
                {fileModel ? (
                    <TranslationDialog
                        d2={this.context.d2}
                        open={this.state.dialogIsOpen}
                        onRequestClose={this.onClose}
                        objectToTranslate={fileModel}
                        fieldsToTranslate={['name', 'description']}
                        onTranslationSaved={this.onDialogReturn(true)}
                        onTranslationError={this.onDialogReturn(false)}
                    />
                ) : null}
            </Fragment>
        );
    }
}

TranslateMenuItem.contextTypes = {
    d2: PropTypes.object,
};

TranslateMenuItem.defaultProps = {
    enabled: false,
    fileModel: null,
    onTranslate: null,
    onTranslateError: null,
    onClose: null,
};

TranslateMenuItem.propTypes = {
    enabled: PropTypes.bool,
    fileModel: PropTypes.object,
    onTranslate: PropTypes.func,
    onTranslateError: PropTypes.func,
    onClose: PropTypes.func,
};

export default TranslateMenuItem;
