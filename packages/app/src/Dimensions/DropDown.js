import React, { Component } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import ReactDOM from 'react-dom';
import i18n from '@dhis2/d2-i18n';

const items = [
    {
        id: 'series',
        name: 'Add to series',
    },
    {
        id: 'category',
        name: 'Add to category',
    },
    {
        id: 'filter',
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

    addDimensionTo = id => {
        console.log('Dropdown clicked! adding to ', id);
        this.props.onClose();
    };

    componentDidMount = () => {
        const dropDownPos = this.refs.dropDown.getBoundingClientRect();
        console.log(dropDownPos);
        /* style.container = {
            ...style.dropDownButton,
            ...{
                top: dropDownPos.top,
                right: dropDownPos.right,
                bottom: dropDownPos.bottom,
                left: dropDownPos.left,
            },
        };*/
    };

    componentDidUpdate = () => {};

    render = () => {
        return (
            <div style={style.container} ref={'dropDown'}>
                {items.map(option => (
                    <button
                        key={option.id}
                        style={style.listButton}
                        onClick={() => this.addDimensionTo(option.id)}
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

export default DropDown;
