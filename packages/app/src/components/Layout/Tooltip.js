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
    onlyLimitedNumberInUse: number =>
        i18n.t("Only '{{number}}' in use", { number }),
};

const emptyItems = [];

export class Tooltip extends React.Component {
    renderTooltip = names => (
        <Popper
            anchorEl={this.props.anchorEl}
            open={this.props.open}
            placement="bottom-start"
        >
            <Paper style={styles.tooltip}>
                {
                    <ul style={styles.list}>
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
        const { itemIds, metadata, displayLimitedAmount } = this.props;

        let names = [];

        if (itemIds.length && displayLimitedAmount) {
            // There's a limit
            if (itemIds.length === 1) {
                // Limited 1 in use
                const id = itemIds[0];
                names = [
                    labels.onlyOneInUse(metadata[id] ? metadata[id].name : id),
                ];
            } else {
                // Limited X in use
                names = [labels.onlyLimitedNumberInUse(itemIds.length)];
            }
        } else if (itemIds.length) {
            // Output all
            names = itemIds.map(id => (metadata[id] ? metadata[id].name : id));
        } else {
            // None selected
            names = [labels.noneSelected];
        }

        return names.length ? this.renderTooltip(names) : '';
    }
}

Tooltip.propTypes = {
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.object.isRequired,
    dimensionId: PropTypes.string.isRequired,
    itemIds: PropTypes.array,
    displayLimitedAmount: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => ({
    metadata: sGetMetadata(state),
});

export default connect(mapStateToProps)(Tooltip);
