import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FileMenu from '@dhis2/d2-ui-file-menu';
import { withStyles } from '@material-ui/core/styles';

import UpdateButton from '../UpdateButton/UpdateButton';
import DownloadMenu from '../DownloadMenu/DownloadMenu';
import InterpretationsButton from '../Interpretations/InterpretationsButton';
import VisualizationOptionsManager from '../VisualizationOptions/VisualizationOptionsManager';
import * as fromActions from '../../actions';
import { sGetCurrent } from '../../reducers/current';
import history from '../../modules/history';
import styles from './styles/MenuBar.style';

const onOpen = id => {
    const path = `/${id}`;
    if (history.location.pathname === path) {
        history.replace(path);
    } else {
        history.push(path);
    }
};
const onNew = () => history.push('/');
const getOnRename = props => details =>
    props.onRenameVisualization(details, false);
const getOnSave = props => details => props.onSaveVisualization(details, false);
const getOnSaveAs = props => details =>
    props.onSaveVisualization(details, true);
const getOnDelete = props => () => props.onDeleteVisualization();

export const MenuBar = ({ classes, ...props }, context) => (
    <div className={classes.menuBar}>
        <UpdateButton flat size="small" className={classes.updateButton} />
        <FileMenu
            d2={context.d2}
            fileId={props.id || null}
            fileType={props.apiObjectName}
            onOpen={onOpen}
            onNew={onNew}
            onRename={getOnRename(props)}
            onSave={getOnSave(props)}
            onSaveAs={getOnSaveAs(props)}
            onDelete={getOnDelete(props)}
            onTranslate={() => console.log('translate callback')}
            onError={() => console.log('error!')}
        />
        <VisualizationOptionsManager className={classes.label} />
        <DownloadMenu className={classes.label} />
        <div className={classes.grow} />
        <InterpretationsButton className={classes.label} />
    </div>
);

MenuBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

MenuBar.contextTypes = {
    d2: PropTypes.object,
};

const mapStateToProps = state => ({
    id: (sGetCurrent(state) || {}).id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onRenameVisualization: details =>
        dispatch(
            fromActions.tDoRenameVisualization(ownProps.apiObjectName, details)
        ),
    onSaveVisualization: (details, copy) =>
        dispatch(
            fromActions.tDoSaveVisualization(
                ownProps.apiObjectName,
                details,
                copy
            )
        ),
    onDeleteVisualization: () => dispatch(fromActions.tDoDeleteVisualization()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MenuBar));
