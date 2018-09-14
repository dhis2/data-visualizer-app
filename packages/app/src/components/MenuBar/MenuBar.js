import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FileMenu from '@dhis2/d2-ui-file-menu';
import Button from '@material-ui/core/Button';

import { colors } from '../../colors';
import VisualizationOptionsManager from '../VisualizationOptions/VisualizationOptionsManager';
import * as fromActions from '../../actions';
import './MenuBar.css';
import { sGetCurrent } from '../../reducers/current';
import { sGetVisualization } from '../../reducers/visualization';
import { sGetUi } from '../../reducers/ui';

const getOnOpen = props => {
    // TODO get type somehow!
    // from props, when choosing visualization type set type in the store?
    return id => props.onLoadVisualizaton(id);
};

export const MenuBar = (props, context) => (
    <div className="menubar">
        <div>
            <Button
                onClick={() => props.onUpdate(props.ui)}
                style={{
                    backgroundColor: colors.accentPrimaryDark,
                    color: colors.white,
                    fontSize: 13,
                }}
                disableRipple={true}
                disableFocusRipple={true}
            >
                Update
            </Button>
        </div>
        <div>
            <FileMenu
                d2={context.d2}
                fileType={props.apiObjectName}
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

MenuBar.contextTypes = {
    d2: PropTypes.object,
};

const mapStateToProps = state => ({
    visualization: sGetVisualization(state),
    current: sGetCurrent(state),
    ui: sGetUi(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onLoadVisualizaton: id =>
        dispatch(fromActions.tDoLoadVisualization(ownProps.apiObjectName, id)),
    onUpdate: ui => dispatch(fromActions.fromCurrent.acSetCurrentFromUi(ui)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar);
