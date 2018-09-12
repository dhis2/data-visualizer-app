import React from 'react';
import { connect } from 'react-redux';

const styles = {
    dropzone: {
        margin: 30,
        padding: 30,
        border: '1px solid #ddd',
    },
};

export default class Layout extends React.Component {
    state = {
        dimensions: [],
    };

    onDragOver = e => {
        e.preventDefault();
    };

    onDrop = e => {
        this.setState({
            dimensions: [...this.state, e.dataTransfer.getData('text')],
        });

        e.dataTransfer.clearData();
    };

    render() {
        console.log('this.state', this.state);
        return (
            <div className="layout-container">
                <div
                    id="dropzone-columns"
                    style={styles.dropzone}
                    onDragOver={this.onDragOver}
                    onDrop={this.onDrop}
                >
                    {this.state.dimensions.map(dim => (
                        <div key={dim}>{dim}</div>
                    ))}
                </div>
            </div>
        );
    }
}

// const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch => ({
//     onDrop: e => dispatch({ type: ''})
// });

// export default connect(mapStateToProps)(Layout);
