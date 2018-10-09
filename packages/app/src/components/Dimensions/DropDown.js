import React, { Component } from 'react';
import { connect } from 'react-redux';
import { acAddUiLayoutDimensions } from '../../actions/ui';
import i18n from '@dhis2/d2-i18n';
import { colors } from '../../colors';

const items = [
    {
        axisName: 'columns',
        displayName: i18n.t('Add to series'),
    },
    {
        axisName: 'rows',
        displayName: i18n.t('Add to category'),
    },
    {
        axisName: 'filters',
        displayName: i18n.t('Add to filter'),
    },
];

const style = {
    container: {
        position: 'absolute',
        border: 'none',
        background: 'none',
        outline: 'none',
        display: 'grid',
        boxShadow: '0px 1px 2px rgba(0,0,0,0.19)',
        height: 117,
        minWidth: 198,
        padding: 0,
        zIndex: 100,
    },
    listButton: {
        display: 'flex',
        border: 'none',
        backgroundColor: colors.white,
        height: 39,
        paddingLeft: 25,
    },
    text: {
        fontSize: 15,
    },
};

export class DropDown extends Component {
    handleKeyPress = event => {
        const ESCAPE = 27;

        if (event.keyCode === ESCAPE) {
            this.props.onClose();
        }
    };

    addDimension = axisName => {
        this.props.onAddDimension({ [this.props.id]: axisName });
        this.props.onClose();
    };

    renderDropDown = () => {
        return items.map(option => (
            <button
                key={option.axisName}
                style={style.listButton}
                onClick={() => this.addDimension(option.axisName)}
                onKeyDown={this.handleKeyPress}
            >
                <span style={style.text}> {option.displayName} </span>
            </button>
        ));
    };

    render = () => {
        const dropDown = this.renderDropDown();
        const dropdownStyle = { ...style.container, ...this.props.renderPos };

        return <div style={dropdownStyle}>{dropDown}</div>;
    };
}

export default connect(
    null,
    {
        onAddDimension: dimension => acAddUiLayoutDimensions(dimension),
    }
)(DropDown);
