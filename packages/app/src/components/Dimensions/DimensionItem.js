import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { colors } from '../../colors';
import DimensionLabel from './DimensionLabel';
import DimensionOptions from './DimensionOptions';
import {
    DataIcon,
    PeriodIcon,
    OrgUnitIcon,
    GenericDimension,
    RecommendedIcon,
} from './icons';
import * as fromReducers from '../../reducers';

const style = {
    wrapper: {
        display: 'flex',
        position: 'static',
    },
    text: {
        fontSize: 16,
        color: colors.black,
        cursor: 'pointer',
        userSelect: 'none',
    },
    itemContainer: {
        display: 'flex',
        height: 24,
        marginTop: 6,
        marginBottom: 6,
    },
};
const fixedDimensionIcons = {
    dx: <DataIcon />,
    pe: <PeriodIcon />,
    ou: <OrgUnitIcon />,
};

export class DimensionItem extends Component {
    state = { mouseOver: false, optionButtonClicked: false };

    onMouseOver = () => {
        if (!this.state.optionButtonClicked) {
            this.setState({ mouseOver: true });
        }
    };

    onMouseExit = () => {
        if (!this.state.optionButtonClicked) {
            this.setState({ mouseOver: false });
        }
    };

    toggleHoverListener = () => {
        this.setState(
            { optionButtonClicked: !this.state.optionButtonClicked },
            () => this.onMouseExit()
        );
    };

    getDimensionIcon = () =>
        fixedDimensionIcons[this.props.id] || <GenericDimension />;

    onDragStart = e => {
        const data = {
            dimensionId: e.target.id,
            source: 'new',
        };

        e.dataTransfer.setData('text', JSON.stringify(data));
    };

    getDimensionType = () => {
        return (
            <span
                id={this.props.id}
                style={style.text}
                draggable="true"
                onDragStart={this.onDragStart}
            >
                {i18n.t(this.props.displayName)}
            </span>
        );
    };

    checkIfRecommended = () => {
        const { isRecommended, isSelected, id } = this.props;

        return isRecommended.includes(id) && !isSelected ? (
            <RecommendedIcon />
        ) : null;
    };

    renderOptionsOnHover = () => {
        return !this.props.isSelected && this.state.mouseOver ? (
            <DimensionOptions
                toggleHoverListener={this.toggleHoverListener}
                id={this.props.id}
            />
        ) : null;
    };

    render = () => {
        const Icon = this.getDimensionIcon();
        const Label = this.getDimensionType();
        const MoreOptions = this.renderOptionsOnHover();
        const RecommendedIcon = this.checkIfRecommended();

        return (
            <li
                key={this.props.id}
                style={style.itemContainer}
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseExit}
            >
                <DimensionLabel {...this.props}>
                    {Icon}
                    {Label}
                </DimensionLabel>
                {RecommendedIcon}
                {MoreOptions}
            </li>
        );
    };
}

DimensionItem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    displayName: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isRecommended: PropTypes.array.isRequired,
    toggleDialog: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isRecommended: fromReducers.fromRecommendedIds.sGetRecommendedIds(state),
});

export default connect(mapStateToProps)(DimensionItem);
