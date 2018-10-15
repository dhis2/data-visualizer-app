import React, { Component } from 'react';
import { connect } from 'react-redux';
import { acAddUiLayoutDimensions } from '../../actions/ui';
import i18n from '@dhis2/d2-i18n';

const items = [
    {
        axisName: 'columns',
        name: 'Add to series',
    },
    {
        axisName: 'rows',
        name: 'Add to category',
    },
    {
        axisName: 'filters',
        name: 'Add to filter',
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
    },
    listButton: {
        display: 'flex',
        border: 'none',
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
        this.props.onClose();
        this.props.onAddDimension({ [this.props.id]: axisName });
    };

    render = () => {
        return (
            <div style={{ ...style.container, ...this.props.renderPos }}>
                {items.map(option => (
                    <button
                        key={option.axisName}
                        style={style.listButton}
                        onClick={() => this.addDimension(option.axisName)}
                        onKeyDown={this.handleKeyPress}
                        ref={element => {
                            this.dropDownMenu = element;
                        }}
                    >
                        <span style={style.text}> {i18n.t(option.name)} </span>
                    </button>
                ))}
            </div>
        );
    };
}

export default connect(
    null,
    {
        onAddDimension: dimension => acAddUiLayoutDimensions(dimension),
    }
)(DropDown);
