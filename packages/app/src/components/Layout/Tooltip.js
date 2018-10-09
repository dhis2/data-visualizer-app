import React from 'react';
import { connect } from 'react-redux';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import i18n from '@dhis2/d2-i18n';

import { colors } from '../../colors';
import { sGetUiItems } from '../../reducers/ui';
import { sGetMetadata } from '../../reducers/metadata';

const labels = {
    noneSelected: i18n.t('None selected'),
};

class Tooltip extends React.Component {
    onMouseOverHandler = () =>
        this.setState({
            anchorEl: document.getElementById(this.id),
        });

    onMouseOutHandler = () =>
        this.setState({
            anchorEl: null,
        });

    getNamesFromMetadata = () => {
        const { itemIds, metadata } = this.props;

        return itemIds.reduce(
            (acc, id) => [
                ...acc,
                ...[metadata[id]]
                    .filter(item => Boolean(item))
                    .map(item => item.name),
            ],
            []
        );
    };

    renderTooltip = names => (
        <Popper
            anchorEl={this.props.anchorEl}
            open={this.props.open}
            placement="bottom-end"
        >
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
                        {names.map(name => (
                            <li key={`${this.props.dimensionId}-${name}`}>
                                {name}
                            </li>
                        ))}
                    </ul>
                }
            </Paper>
        </Popper>
    );

    render() {
        const { itemIds } = this.props;

        const displayNames = itemIds.length
            ? this.getNamesFromMetadata()
            : [labels.none_selected];

        return displayNames.length ? this.renderTooltip(displayNames) : '';
    }
}

const mapStateToProps = (state, ownProps) => ({
    itemIds: sGetUiItems(state)[ownProps.dimensionId],
    metadata: sGetMetadata(state),
});

export default connect(mapStateToProps)(Tooltip);
