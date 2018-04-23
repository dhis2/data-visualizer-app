import React from 'react';

import './MenuBar.css';

const style = {
    ul: {
        listStyleType: 'none',
        flex: '1',
        minWidth: '800px',
    },
};

const MenuBar = props => {
    return (
        <ul className="menu-bar" style={style.ul}>
            <li>
                <button type="button">Update</button>
            </li>
            <li>Favorites</li>
            <li>Options</li>
            <li>Download</li>
            <li>Embed</li>
        </ul>
    );
};

export default MenuBar;
