import React from 'react';
import { connect } from 'react-redux';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';

import { colors } from '../../colors';
import { sGetUiItems } from '../../reducers/ui';
import { sGetMetadata } from '../../reducers/metadata';

class Tooltip extends React.Component {
    onMouseOverHandler = () =>
        this.setState({
            anchorEl: document.getElementById(this.id),
        });

    onMouseOutHandler = () =>
        this.setState({
            anchorEl: null,
        });

    renderPopper = objects => (
        <Popper anchorEl={this.props.anchorEl} open={this.props.open}>
            <Paper
                style={{
                    padding: '8px',
                    fontSize: '12px',
                    color: colors.white,
                    backgroundColor: '#4a4a4a',
                    boxShadow: 'none',
                    borderRadius: '3px',
                }}
            >
                {
                    <ul
                        style={{
                            listStyleType: 'none',
                            margin: 0,
                            padding: 0,
                        }}
                    >
                        {objects.map(obj => (
                            <li key={obj.name}>{obj.name}</li>
                        ))}
                    </ul>
                }
            </Paper>
        </Popper>
    );

    render() {
        const { items, metadata } = this.props;

        const objects = items.reduce(
            (acc, id) => [
                ...acc,
                ...[metadata[id]].filter(item => Boolean(item)),
            ],
            []
        );

        return objects.length ? this.renderPopper(objects) : '';
    }
}

const mapStateToProps = (state, ownProps) => ({
    items: sGetUiItems(state)[ownProps.dimensionId],
    metadata: sGetMetadata(state),
});

export default connect(mapStateToProps)(Tooltip);
