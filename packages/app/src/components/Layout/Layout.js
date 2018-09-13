import React from 'react';
import { connect } from 'react-redux';

import Chip from './Chip';
import { sGetUiLayout } from '../../reducers/ui';
import { acAddUiLayoutDimensions } from '../../actions/ui';
import { sGetDimensions } from '../../reducers/dimensions';
import { decodeDataTransfer } from '../../dnd';

const styles = {
    dropzone: {
        margin: '0 30 30',
        padding: 20,
        border: '1px dashed #ccc',
    },
    h4: {
        marginBottom: 5,
    },
};

class Layout extends React.Component {
    state = {
        dimensions: [],
    };

    onDragOver = e => {
        e.preventDefault();
    };

    getDropHandler = axisName => e => {
        const { dimensionId, source } = decodeDataTransfer(e);

        this.props.onAddDimension({
            [dimensionId]: axisName,
        });

        e.dataTransfer.clearData();
    };

    renderAxisDropzone = axisName => {
        const axis = this.props.layout[axisName];

        return (
            <div>
                <h4 style={styles.h4}>{axisName}</h4>
                <div
                    style={styles.dropzone}
                    onDragOver={this.onDragOver}
                    onDrop={this.getDropHandler(axisName)}
                >
                    {axis.map(dimensionId => (
                        <Chip
                            key={dimensionId}
                            dimensionId={dimensionId}
                            dimensions={this.props.dimensions}
                        />
                    ))}
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className="layout-container">
                {this.renderAxisDropzone('columns')}
                {this.renderAxisDropzone('rows')}
                {this.renderAxisDropzone('filters')}
            </div>
        );
    }
}

Layout.displayName = 'Layout';

const mapStateToProps = state => ({
    layout: sGetUiLayout(state),
    dimensions: sGetDimensions(state),
});

const mapDispatchToProps = dispatch => ({
    onAddDimension: map => dispatch(acAddUiLayoutDimensions(map)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);
