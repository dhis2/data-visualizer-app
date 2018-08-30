import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { MoreHorizontal } from './icons';

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
    menuContainer: {
        display: 'inline-flex',
    },
    dropDownButton: {
        border: 'none',
        background: 'none',
        outline: 'none',
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 1,
        paddingTop: 2,
    },
    dropDownMenu: {
        display: 'inline-grid',
        position: 'absolute',
        height: 117,
        minWidth: 198,
        padding: 0,
    },
    listButton: {
        border: 'none',
        height: 39,
    },
    text: {
        fontSize: 15,
    },
};

export const OptionsButton = ({ action }) => {
    return (
        <button style={style.dropDownButton} onClick={action} tabIndex={1}>
            <MoreHorizontal />
        </button>
    );
};

export class DimensionOptions extends Component {
    state = { showMenu: false };

    closeMenu = () => {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
            this.props.toggleHoverListener();
        });
    };

    showMenu = () => {
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
            this.props.toggleHoverListener();
        });
    };

    addDimensionTo = id => {
        console.log('Dropdown clicked! adding to ', id);
        this.closeMenu();
    };

    renderDropDown = () => {
        return (
            <div style={style.dropDownMenu}>
                {items.map(option => (
                    <button
                        key={option.id}
                        style={style.listButton}
                        onClick={() => this.addDimensionTo(option.id)}
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

    render = () => {
        let Options = <OptionsButton action={this.showMenu} />;

        if (this.state.showMenu) {
            Options = this.renderDropDown();
        }

        return <div>{Options}</div>;
    };
}

DimensionOptions.propTypes = {
    toggleHoverListener: PropTypes.func.isRequired,
};

export default DimensionOptions;
