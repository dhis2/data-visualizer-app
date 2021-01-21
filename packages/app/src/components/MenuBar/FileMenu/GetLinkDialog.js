import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import i18n from '@dhis2/d2-i18n';

import { supportedFileTypes } from './util';

const getAppUrl = (fileType, fileId, context) => {
    const baseUrl = context.d2.Api.getApi().baseUrl.split('/api', 1)[0];

    let appName;
    let appUrl;

    switch (fileType) {
        case 'chart':
        case 'visualization':
            appName = 'dhis-web-data-visualizer';
            appUrl = `dhis-web-data-visualizer/#/${fileId}`;
            break;
        case 'reportTable':
            appName = 'dhis-web-pivot';
            break;
        case 'eventReport':
            appName = 'dhis-web-event-reports';
            break;
        case 'eventChart':
            appName = 'dhis-web-event-visualizer';
            break;
        case 'map':
            appName = 'dhis-web-maps';
            break;
        default:
            appName = '';
    }

    // DHIS2-4253: force URL to be absolute
    const url = new URL(
        appUrl
            ? `${baseUrl}/${appUrl}`
            : `${baseUrl}/${appName}/index.html?id=${fileId}`,
        `${window.location.origin}${window.location.pathname}`
    );

    return url.href;
};

const GetLinkDialog = (props, context) => {
    const { open, fileType, fileModel, onRequestClose } = props;

    return (
        <Dialog open={open} onClose={onRequestClose} maxWidth="md">
            <DialogContent>
                <DialogContentText>
                    {i18n.t('Open in this app')}
                    <br />
                    <a href={getAppUrl(fileType, fileModel.id, context)}>
                        {getAppUrl(fileType, fileModel.id, context)}
                    </a>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onRequestClose} color="primary">
                    {i18n.t('Close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

GetLinkDialog.contextTypes = {
    d2: PropTypes.object,
};

GetLinkDialog.defaultProps = {
    open: false,
    fileModel: null,
    fileType: null,
    onRequestClose: null,
};

GetLinkDialog.propTypes = {
    open: PropTypes.bool,
    fileType: PropTypes.oneOf(supportedFileTypes),
    fileModel: PropTypes.object,
    onRequestClose: PropTypes.func,
};

export default GetLinkDialog;
