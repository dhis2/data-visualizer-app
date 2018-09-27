import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FileMenu from '@dhis2/d2-ui-file-menu';

import UpdateButton from './UpdateButton';
import VisualizationOptionsManager from '../VisualizationOptions/VisualizationOptionsManager';
import * as fromActions from '../../actions';
import { sGetCurrent } from '../../reducers/current';
import './MenuBar.css';
import history from '../../history';

const onOpen = id => history.push(`/${id}`);
const onNew = () => history.push('/');
const getOnSave = props => details => props.onSaveVisualization(details);

export const MenuBar = (props, context) => (
    <div className="menubar">
        <div>
            <UpdateButton />
        </div>
        <div>
            <FileMenu
                d2={context.d2}
                fileId={(props.visualization && props.visualization.id) || null}
                fileType={props.apiObjectName}
                onOpen={onOpen}
                onNew={onNew}
                onSave={getOnSave(props)}
                onSaveAs={getOnSave(props)}
                onTranslate={() => console.log('translate callback')}
                onError={() => console.log('error!')}
            />
        </div>
        <div>
            <VisualizationOptionsManager />
        </div>
        <div>Download</div>
        <div>Embed</div>
        <div className="spacefiller" />
        <div>Show interpretations</div>
    </div>
);

MenuBar.contextTypes = {
    d2: PropTypes.object,
};

const mapStateToProps = state => ({
    id: sGetCurrent(state).id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onLoadVisualizaton: id =>
        dispatch(fromActions.tDoLoadVisualization(ownProps.apiObjectName, id)),
    onSaveVisualization: details =>
        dispatch(
            fromActions.tDoSaveVisualization(ownProps.apiObjectName, details)
        ),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar);
