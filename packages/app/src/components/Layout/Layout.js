import React from 'react';
import { connect } from 'react-redux';
import { sGetUiLayout } from '../../reducers/ui';
import { acAddUiLayoutDimension } from '../../actions/ui';

const styles = {
    dropzone: {
        margin: '0 30 30',
        padding: 30,
        border: '1px solid #ddd',
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

    getDropHandler = axisId => e => {
        const dimensionId = e.dataTransfer.getData('text');

        // this.setState({
        //     dimensions: [...this.state.dimensions, id],
        // });

        this.props.onAddDimension(axisId, dimensionId);
        e.dataTransfer.clearData();
    };

    renderAxisDropzone = axisId => {
        return (
            <div>
                <h4 style={styles.h4}>{axisId}</h4>
                <div
                    id={`dropzone-${axisId}`}
                    style={styles.dropzone}
                    onDragOver={this.onDragOver}
                    onDrop={this.getDropHandler(axisId)}
                >
                    {this.props.layout[axisId].map(dim => (
                        <div key={dim}>{dim}</div>
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
});

const mapDispatchToProps = dispatch => ({
    onAddDimension: (axisId, dimensionId) =>
        dispatch(acAddUiLayoutDimension(axisId, dimensionId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);
