import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import i18n from '@dhis2/d2-i18n';
import LockIcon from '@material-ui/icons/Lock';
import WarningIcon from '@material-ui/icons/Warning';

import { sGetMetadata } from '../../reducers/metadata';
import { styles } from './styles/Tooltip.style';

const labels = {
    noneSelected: i18n.t('None selected'),
    onlyOneInUse: name => i18n.t("Only '{{- name}}' in use", { name }),
    onlyLimitedNumberInUse: number =>
        i18n.t("Only '{{number}}' in use", { number }),
};
export class Tooltip extends React.Component {
    getWarningLabel = () => {
        const { itemIds, metadata, displayLimitedAmount } = this.props;
        const warningLabel =
            itemIds.length === 1
                ? labels.onlyOneInUse(
                      metadata[itemIds[0]]
                          ? metadata[itemIds[0]].name
                          : itemIds[0]
                  )
                : labels.onlyLimitedNumberInUse(itemIds.length);
        return displayLimitedAmount ? warningLabel : null;
    };

    getItemDisplayNames = () => {
        const { itemIds, metadata, displayLimitedAmount } = this.props;
        return itemIds.length && !displayLimitedAmount
            ? itemIds.map(id => (metadata[id] ? metadata[id].name : id))
            : [];
    };

    renderWarningLabel = warningLabel => (
        <li style={styles.item}>
            <div style={styles.iconWrapper}>
                <WarningIcon style={styles.icon} />
                <span>{warningLabel}</span>
            </div>
        </li>
    );

    renderItems = itemDisplayNames =>
        itemDisplayNames.map(name => (
            <li key={`${this.props.dimensionId}-${name}`} style={styles.item}>
                {name}
            </li>
        ));

    renderLockedLabel = () => (
        <li style={styles.item}>
            <div style={styles.iconWrapper}>
                <LockIcon style={styles.icon} />
                <span>{this.props.lockedLabel}</span>
            </div>
        </li>
    );

    renderNoItemsLabel = () => (
        <li
            key={`${this.props.dimensionId}-${labels.noneSelected}`}
            style={styles.item}
        >
            {labels.noneSelected}
        </li>
    );

    render() {
        const itemDisplayNames = this.getItemDisplayNames();
        const warningLabel = this.getWarningLabel();
        const hasNoItemsLabel = !itemDisplayNames.length && !warningLabel;

        return (
            <Popper
                anchorEl={this.props.anchorEl}
                open={this.props.open}
                placement="bottom-start"
            >
                <Paper style={styles.tooltip}>
                    {
                        <ul style={styles.list}>
                            {warningLabel &&
                                this.renderWarningLabel(warningLabel)}
                            {this.props.lockedLabel && this.renderLockedLabel()}
                            {itemDisplayNames &&
                                this.renderItems(itemDisplayNames)}
                            {hasNoItemsLabel && this.renderNoItemsLabel()}
                        </ul>
                    }
                </Paper>
            </Popper>
        );
    }
}

Tooltip.propTypes = {
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.object.isRequired,
    dimensionId: PropTypes.string.isRequired,
    lockedLabel: PropTypes.string,
    itemIds: PropTypes.array,
    displayLimitedAmount: PropTypes.bool,
};

const mapStateToProps = state => ({
    metadata: sGetMetadata(state),
});

export default connect(mapStateToProps)(Tooltip);
