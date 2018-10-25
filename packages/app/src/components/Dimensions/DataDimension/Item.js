import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../../colors';
import { RemoveSelectedItemButton } from './buttons';

const styles = {
    unselected: {
        display: 'flex',
        padding: '2px 5px 2px 2px',
        borderRadius: 4,
    },
    selected: {
        display: 'flex',
        padding: '2px 5px 2px 2px',
        backgroundColor: colors.lightBlue,
        borderRadius: 4,
    },
    onHover: {
        backgroundColor: '#92C9F7',
    },
    highlighted: {
        backgroundColor: '#7EBFF5',
        borderRadius: 4,
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: 14,
        padding: '0px 2px 1px 2px',
    },
    unselectedIcon: {
        position: 'relative',
        top: '30%',
        left: '38%',
        backgroundColor: colors.grey,
        height: 6,
        width: 6,
    },
    selectedIcon: {
        position: 'relative',
        top: '39%',
        left: '40%',
        backgroundColor: colors.accentPrimary,
        height: 6,
        width: 6,
    },
    iconContainer: {
        minWidth: 20,
    },
};

export const UnselectedIcon = () => {
    return (
        <div style={styles.iconContainer}>
            <div style={styles.unselectedIcon} />
        </div>
    );
};

export const SelectedIcon = () => {
    return (
        <div style={styles.iconContainer}>
            <div style={styles.selectedIcon} />
        </div>
    );
};

export class Item extends Component {
    state = { mouseOver: false };

    handleMouseEnter = () => {
        this.setState({ mouseOver: true });
    };

    handleMouseLeave = () => {
        this.setState({ mouseOver: false });
    };

    getItemStyle = () => {
        let itemStyle = this.props.unselected
            ? styles.unselected
            : styles.selected;

        if (this.state.mouseOver)
            itemStyle = { ...itemStyle, ...styles.onHover };

        if (this.props.isHighlighted)
            itemStyle = { ...itemStyle, ...styles.highlighted };

        return itemStyle;
    };

    renderIcon = () => {
        return this.props.unselected ? <UnselectedIcon /> : <SelectedIcon />;
    };

    renderRemoveButton = () => {
        return !this.props.unselected ? (
            <RemoveSelectedItemButton
                action={() => this.props.onRemoveItem(this.props.id)}
            />
        ) : null;
    };

    render = () => {
        const { id, index, unselected, onItemClick, displayName } = this.props;

        const className = unselected ? 'unselected-label' : 'selected-label';
        const Icon = this.renderIcon();
        const RemoveButton = this.renderRemoveButton();

        return (
            <div
                style={this.getItemStyle()}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={event =>
                    onItemClick(event.metaKey, event.shiftKey, index, id)
                }
            >
                {Icon}
                <span className={className}>{displayName}</span>
                {RemoveButton}
            </div>
        );
    };
}

Item.propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired,
    isHighlighted: PropTypes.bool.isRequired,
    onItemClick: PropTypes.func.isRequired,
    unselected: PropTypes.bool,
};

Item.defaultProps = {
    unselected: true,
};
