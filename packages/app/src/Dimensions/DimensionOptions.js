import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropDown from './DropDown';
import { MoreHorizontal } from './icons';

const style = {
    wrapper: {
        position: 'static',
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
    renderPos: {
        left: 5,
    },
};

const MAX_TOP_PIXEL_POS = 696;
const LEFT_RENDER_PIXEL_POS = 5;

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
        document.removeEventListener('click', this.closeMenu);
        this.props.toggleHoverListener();
    };

    showMenu = () => {
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
            this.props.toggleHoverListener();
        });
    };

    componentDidMount = () => {
        const initialPos = this.refs.wrapper.getBoundingClientRect();

        const topPixelPos =
            initialPos.top > MAX_TOP_PIXEL_POS
                ? MAX_TOP_PIXEL_POS
                : initialPos.top;

        style.renderPos = {
            top: topPixelPos,
            left: LEFT_RENDER_PIXEL_POS + initialPos.left,
        };
    };

    render = () => {
        const Options = this.state.showMenu ? (
            <DropDown
                onClose={this.closeMenu}
                renderPos={style.renderPos}
                id={this.props.id}
            />
        ) : (
            <OptionsButton action={this.showMenu} />
        );

        return (
            <div ref={'wrapper'} style={style.wrapper}>
                {Options}
            </div>
        );
    };
}

DimensionOptions.propTypes = {
    toggleHoverListener: PropTypes.func.isRequired,
};

export default DimensionOptions;
