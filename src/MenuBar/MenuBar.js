import React from 'react';

import './MenuBar.css';

const MenuBar = props => {
    return (
        <ul className="menu-bar">
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
