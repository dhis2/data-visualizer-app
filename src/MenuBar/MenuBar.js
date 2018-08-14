import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FileMenu from '@dhis2/d2-ui-file-menu';

import VisualizationOptionsManager from '../VisualizationOptions/VisualizationOptionsManager';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import './MenuBar.css';

export const MenuBar = (props, context) => {
    const onOpen = id => {
        // TODO get type somehow!
        // from props, when choosing visualization type set type in the store,
        // for now it's only chart...
        return props.onSetVisualization('chart', id);
    };

    return (
        <div className="menubar">
            <div>
                <button type="button">Update</button>
            </div>
            <div>
                <FileMenu
                    d2={context.d2}
                    // TODO get type somehow!
                    // from props, when choosing visualization type set type in the store,
                    // for now it's only chart...
                    fileType="chart"
                    onOpen={onOpen}
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
});

export default connect(
    mapStateToProps,
    {
        onSetVisualization: fromActions.fromVisualization.tSetVisualization,
    }
)(MenuBar);
