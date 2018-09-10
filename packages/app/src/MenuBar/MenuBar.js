import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FileMenu from '@dhis2/d2-ui-file-menu';

import VisualizationOptionsManager from '../VisualizationOptions/VisualizationOptionsManager';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import './MenuBar.css';
import { sGetCurrent } from '../reducers/current';

const getOnOpen = props => {
    // TODO get type somehow!
    // from props, when choosing visualization type set type in the store?
    return id => props.onSetVisualization('chart', id);
};

export const MenuBar = (props, context) => {
    console.log('columns', props.current.columns);
    return (
        <div className="menubar">
            <div>
                <button type="button" onClick={props.onLoadVisualizaton}>
                    Update
                </button>
            </div>
            <div>
                <FileMenu
                    d2={context.d2}
                    fileType="chart"
                    onOpen={getOnOpen(props)}
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
};

MenuBar.contextTypes = {
    d2: PropTypes.object,
};

const mapStateToProps = state => ({
    visualization: fromReducers.fromVisualization.visualization,
    current: sGetCurrent(state),
});

const mapDispatchToProps = dispatch => ({
    onSetVisualization: fromActions.fromVisualization.tSetVisualization,
    onLoadVisualizaton: () =>
        dispatch(fromActions.tDoLoadVisualization('chart', 'CNkMibmx1Zr')),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar);
