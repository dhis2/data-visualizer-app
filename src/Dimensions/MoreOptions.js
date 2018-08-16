import React, { Component } from 'react';

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
    dropDownMenu: {
        display: 'inline-grid',
        position: 'absolute',
        height: 117,
        minWidth: 198,
        padding: 0,
        zIndex: 2,
    },
    listButton: {
        border: 'none',
        height: 39,
    },
    text: {
        fontSize: 15,
    },
};

export class MoreOptions extends Component {
    state = { showMenu: true };

    closeMenu = () => {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
            this.props.onClose();
        });
    };

    componentWillMount = () => {
        document.addEventListener('click', this.closeMenu);
    };

    addDimensionTo = id => {
        console.log('Dropdown clicked! adding ', id);
        this.closeMenu();
    };

    render = () => {
        return (
            <div>
                {this.state.showMenu && (
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
                                <span style={style.text}> {option.name} </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };
}

export default MoreOptions;
