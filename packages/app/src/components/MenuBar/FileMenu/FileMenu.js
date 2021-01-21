import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';

import i18n from '@dhis2/d2-i18n';

import MenuButton from '../../MenuButton/MenuButton'
import NewMenuItem from './NewMenuItem';
import OpenMenuItem from './OpenMenuItem';
import SaveMenuItem from './SaveMenuItem';
import SaveAsMenuItem from './SaveAsMenuItem';
import RenameMenuItem from './RenameMenuItem';
import TranslateMenuItem from './TranslateMenuItem';
import ShareMenuItem from './ShareMenuItem';
import GetLinkMenuItem from './GetLinkMenuItem';
import DeleteMenuItem from './DeleteMenuItem';

import { supportedFileTypes } from './util';

export class FileMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuIsOpen: false,
            anchorEl: null,
            fileModel: null,
            refreshDialogData: false,
        };
    }

    getChildContext = () => ({
        d2: this.props.d2,
    });

    componentDidMount = () => {
        if (this.props.fileId) {
            this.setFileModel(this.props.fileId);
        }
    };

    componentDidUpdate = prevProps => {
        if (this.props.fileId && prevProps.fileId !== this.props.fileId) {
            this.setFileModel(this.props.fileId);
        }
    };

    onOpen = id => {
        this.setFileModel(id);
        this.setState({ refreshDialogData: false });

        this.closeMenu();

        this.props.onOpen(id);
    };

    onRename = (form, id) => {
        if (this.state.fileModel.id === id) {
            this.setFileModel(this.state.fileModel.id);
            this.setState({ refreshDialogData: true });

            this.closeMenu();

            this.props.onRename(form, id);
        }
    };

    onNew = () => {
        this.clearFileModel();

        this.closeMenu();

        this.props.onNew();
    };

    onDelete = id => {
        if (this.state.fileModel.id === id) {
            this.clearFileModel();
            this.setState({ refreshDialogData: true });

            this.closeMenu();

            this.props.onDelete(id);
        }
    };

    onAction = (callback, refreshDialogData) => args => {
        this.closeMenu();

        if (refreshDialogData) {
            this.setState({ refreshDialogData: true });
        }

        if (callback) {
            callback(args);
        }
    };

    setFileModel = async id => {
        const model = await this.props.d2.models[this.props.fileType].get(id);
        this.setState({ fileModel: model });
    };

    clearFileModel = () => {
        this.setState({ fileModel: null });
    };

    toggleMenu = event => {
        this.setState({
            menuIsOpen: !this.state.menuIsOpen,
            anchorEl: this.state.menuIsOpen ? null : event.currentTarget,
        });
    };

    closeMenu = () => {
        this.setState({
            menuIsOpen: false,
            anchorEl: null,
        });
    };

    render() {
        const {
            classes,
            fileType,
            onSave,
            onSaveAs,
            onTranslate,
            onShare,
            onError,
        } = this.props;

        return (
            <Fragment>
                <MenuButton onClick={this.toggleMenu}>
                    {i18n.t('File')}
                </MenuButton>
                <Menu
                    disableEnforceFocus
                    open={this.state.menuIsOpen}
                    onClose={this.closeMenu}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    getContentAnchorEl={null}
                >
                    <NewMenuItem enabled onNew={this.onNew} />
                    <Divider light />

                    <OpenMenuItem
                        enabled
                        fileType={fileType}
                        refreshDialogData={this.state.refreshDialogData}
                        onOpen={this.onOpen}
                        onClose={this.onAction()}
                        onRename={this.onRename}
                        onDelete={this.onDelete}
                    />

                    <Divider />
                    <SaveMenuItem
                        enabled={Boolean(
                            !this.state.fileModel ||
                                (this.state.fileModel &&
                                    this.state.fileModel.access.update)
                        )}
                        fileType={fileType}
                        fileModel={this.state.fileModel}
                        onSave={this.onAction(onSave, true)}
                        onSaveAs={this.onAction(onSaveAs, true)}
                        onClose={this.onAction()}
                    />
                    <SaveAsMenuItem
                        enabled={Boolean(this.state.fileModel)}
                        fileType={fileType}
                        fileModel={this.state.fileModel}
                        onSaveAs={this.onAction(onSaveAs, true)}
                        onClose={this.onAction()}
                    />
                    <Divider />
                    <RenameMenuItem
                        enabled={Boolean(
                            this.state.fileModel &&
                                this.state.fileModel.access.update
                        )}
                        fileType={fileType}
                        fileModel={this.state.fileModel}
                        onRename={this.onRename}
                        onRenameError={this.onAction(onError)}
                        onClose={this.onAction()}
                    />
                    <TranslateMenuItem
                        enabled={Boolean(
                            this.state.fileModel &&
                                this.state.fileModel.access.update
                        )}
                        fileModel={this.state.fileModel}
                        onTranslate={this.onAction(onTranslate)}
                        onTranslateError={this.onAction(onError)}
                        onClose={this.onAction()}
                    />
                    <Divider />
                    <ShareMenuItem
                        enabled={Boolean(
                            this.state.fileModel &&
                                this.state.fileModel.access.manage
                        )}
                        fileType={fileType}
                        fileModel={this.state.fileModel}
                        onShare={this.onAction(onShare)}
                        onClose={this.onAction()}
                    />
                    <GetLinkMenuItem
                        enabled={Boolean(this.state.fileModel)}
                        fileType={fileType}
                        fileModel={this.state.fileModel}
                        onClose={this.onAction()}
                    />
                    <Divider />
                    <DeleteMenuItem
                        enabled={Boolean(
                            this.state.fileModel &&
                                this.state.fileModel.access.delete
                        )}
                        fileType={fileType}
                        fileModel={this.state.fileModel}
                        onDelete={this.onDelete}
                        onDeleteError={this.onAction(onError)}
                        onClose={this.onAction()}
                    />
                </Menu>
            </Fragment>
        );
    }
}

FileMenu.childContextTypes = {
    d2: PropTypes.object,
};

FileMenu.defaultProps = {
    d2: null,
    fileType: 'chart',
    fileId: null,
    onNew: Function.prototype,
    onOpen: Function.prototype,
    onSave: Function.prototype,
    onSaveAs: Function.prototype,
    onRename: Function.prototype,
    onTranslate: Function.prototype,
    onShare: Function.prototype,
    onDelete: Function.prototype,
    onError: Function.prototype,
};

FileMenu.propTypes = {
    d2: PropTypes.object,
    fileType: PropTypes.oneOf(supportedFileTypes),
    fileId: PropTypes.string,
    onNew: PropTypes.func,
    onOpen: PropTypes.func,
    onSave: PropTypes.func,
    onSaveAs: PropTypes.func,
    onRename: PropTypes.func,
    onTranslate: PropTypes.func,
    onShare: PropTypes.func,
    onDelete: PropTypes.func,
    onError: PropTypes.func,
};

export default FileMenu
