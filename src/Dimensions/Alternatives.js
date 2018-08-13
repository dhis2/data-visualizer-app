import React, { Component } from 'react';
import { Data, Period, OrgUnit, GenericDimension } from './icons';
import { SvgIcon } from '@dhis2/d2-ui-core';

const style = {
    alternatives: {
        maxHeight: 697,
        overflowY: 'scroll',
        position: 'relative',
    },
    list: {
        display: 'inline-block',
        margin: '4px 100% 4px 7px',
        padding: 0,
        minWidth: 'max-content',
        height: 24,
        borderRadius: 4,
    },
    selected: {
        backgroundColor: '#BBDEFB',
    },
    textStyle: {
        fontSize: 16,
        position: 'relative',
        top: 3,
        display: 'inline',
    },
    deleteButton: {
        position: 'relative',
        border: 'none',
        background: 'none',
        marginLeft: 7,
        marginRight: -4,
        padding: 0,
        right: 8,
        top: 2,
        height: 12,
        width: 12,
    },
    deleteButtonIcon: {
        height: 10,
        width: 10,
    },
};

export class Alternatives extends Component {
    state = { selected: [] };

    onClick = index => {
        !this.state.selected.includes(index) &&
            this.setState({
                selected: [...this.state.selected, index],
            });
        this.props.onClick(index);
    };

    renderIcon = index => {
        const fixedDimensions = 3;
        const dimensionIcon = [<Data />, <Period />, <OrgUnit />];
        return index < fixedDimensions ? (
            dimensionIcon[index]
        ) : (
            <GenericDimension />
        );
    };
    removeDimension = index => {
        this.state.selected.includes(index) &&
            this.setState({
                selected: this.state.selected.filter(entry => index !== entry),
            });
    };
    showMatchingDimensions = (name, index) => {
        return (
            <ul
                key={index}
                selected={this.state.selected.includes(index) || false}
                style={
                    this.state.selected.includes(index)
                        ? { ...style.list, ...style.selected }
                        : style.list
                }
                onClick={() => this.onClick(index)}
            >
                {this.renderIcon(index)}
                <p style={style.textStyle}> {name} </p>
                {this.state.selected.includes(index) && (
                    <button
                        style={style.deleteButton}
                        onClick={() => this.removeDimension(index)}
                    >
                        <SvgIcon icon="Close" style={style.deleteButtonIcon} />
                    </button>
                )}
            </ul>
        );
    };
    renderDimensions = () => {
        return this.props.dimensions.map(
            (dimensionName, index) =>
                dimensionName
                    .toLowerCase()
                    .includes(this.props.searchFieldValue.toLowerCase()) &&
                this.showMatchingDimensions(dimensionName, index)
        );
    };

    render = () => {
        return <div style={style.alternatives}>{this.renderDimensions()}</div>;
    };
}
export default Alternatives;
