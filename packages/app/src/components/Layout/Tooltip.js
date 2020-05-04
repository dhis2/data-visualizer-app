import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import i18n from '@dhis2/d2-i18n';

import { sGetUiItemsByDimension } from '../../reducers/ui';
import { sGetMetadata } from '../../reducers/metadata';
import { styles } from './styles/Tooltip.style';

const labels = {
    noneSelected: i18n.t('None selected'),
};

const emptyItems = [];

export class Tooltip extends React.Component {
    renderItems = itemDisplayNames => {
        const renderLimit = 5;

        const itemsToRender = itemDisplayNames
            .slice(0, renderLimit)
            .map(name => (
                <li key={`${this.props.dimensionId}-${name}`}>{name}</li>
            ));

        if (itemDisplayNames.length > renderLimit) {
            itemsToRender.push(
                <li key={`${this.props.dimensionId}-render-limit`}>
                    {itemDisplayNames.length - renderLimit === 1
                        ? i18n.t('And 1 other...')
                        : i18n.t('And {{numberOfItems}} others...', {
                              numberOfItems:
                                  itemDisplayNames.length - renderLimit,
                          })}
                </li>
            );
        }

        return itemsToRender;
    };

    renderTooltip = names => (
        <Popper
            anchorEl={this.props.anchorEl}
            open={this.props.open}
            placement="bottom-start"
        >
            <Paper style={styles.tooltip}>
                {<ul style={styles.list}>{this.renderItems(names)}</ul>}
            </Paper>
        </Popper>
    );

    render() {
        const { itemIds, metadata } = this.props;

        const names = itemIds.length
            ? itemIds.map(id => (metadata[id] ? metadata[id].name : id))
            : [labels.noneSelected];

        return names.length ? this.renderTooltip(names) : '';
    }
}

Tooltip.propTypes = {
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.object.isRequired,
    dimensionId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    itemIds: sGetUiItemsByDimension(state, ownProps.dimensionId) || emptyItems,
    metadata: sGetMetadata(state),
});

export default connect(mapStateToProps)(Tooltip);
