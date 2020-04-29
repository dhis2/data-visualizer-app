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
    onlyOneInUse: name => i18n.t("Only '{{name}}' in use", { name }),
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
        const { itemIds, activeItemIds, metadata } = this.props;

        let names = [];

        if (activeItemIds.length) {
            if (activeItemIds.length === 1) {
                const id = activeItemIds[0];
                names = [
                    labels.onlyOneInUse(metadata[id] ? metadata[id].name : id),
                ];
            } else {
                names = activeItemIds.map(id =>
                    metadata[id] ? metadata[id].name : id
                );
            }
        } else if (itemIds.length) {
            names = itemIds.map(id =>
                (metadata[id] ? metadata[id].name : id)
            );
        } else {
            names = [labels.noneSelected];
        }

        return names.length ? this.renderTooltip(names) : '';
    }
}

Tooltip.defaultProps = {
    activeItemIds: [],
};

Tooltip.propTypes = {
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.object.isRequired,
    dimensionId: PropTypes.string.isRequired,
    activeItemIds: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => ({
    itemIds: sGetUiItemsByDimension(state, ownProps.dimensionId) || emptyItems,
    metadata: sGetMetadata(state),
});

export default connect(mapStateToProps)(Tooltip);
