import React from 'react';
import { connect } from 'react-redux';

import { sGetUiLayout } from '../../reducers/ui';
import { acAddUiLayoutDimension } from '../../actions/ui';
import { sGetDimensions } from '../../reducers/dimensions';

const styles = {
    dropzone: {
        margin: '0 30 30',
        padding: 20,
        border: '1px dashed #ccc',
    },
    h4: {
        marginBottom: 5,
    },
    chip: {
        padding: 5,
        backgroundColor: '#bbdefb',
        color: '#000',
        margin: 2,
    },
};

class Layout extends React.Component {
    state = {
        dimensions: [],
    };

    onDragOver = e => {
        e.preventDefault();
    };

    getDropHandler = axisId => e => {
        const dimensionId = e.dataTransfer.getData('text');
        this.props.onAddDimension(axisId, dimensionId);
        e.dataTransfer.clearData();
    };

    renderAxisDropzone = axisId => {
        return (
            <div>
                <h4 style={styles.h4}>{axisId}</h4>
                <div
                    style={styles.dropzone}
                    onDragOver={this.onDragOver}
                    onDrop={this.getDropHandler(axisId)}
                >
                    {this.props.layout[axisId].map(dimensionId => (
                        <div key={dimensionId} style={styles.chip}>
                            {this.props.dimensions[dimensionId].displayName}
                        </div>
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

const mapStateToProps = state => ({
    layout: sGetUiLayout(state),
    dimensions: sGetDimensions(state),
});

const mapDispatchToProps = dispatch => ({
    onAddDimension: (axisId, dimensionId) =>
        dispatch(acAddUiLayoutDimension(axisId, dimensionId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);
