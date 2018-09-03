import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropDown from './DropDown';
import { MoreHorizontal } from './icons';

const style = {
    dropDownButton: {
        border: 'none',
        background: 'none',
        outline: 'none',
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 1,
        paddingTop: 2,
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

    render = () => {
        let Options = <OptionsButton action={this.showMenu} />;

        if (this.state.showMenu) {
            Options = <DropDown onClose={this.closeMenu} />;
        }

        return Options;
    };
}

DimensionOptions.propTypes = {
    toggleHoverListener: PropTypes.func.isRequired,
};

export default DimensionOptions;
