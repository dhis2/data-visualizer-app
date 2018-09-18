import React, { Component } from 'react';
import i18n from '@dhis2/d2-i18n';

const style = {
    container: {
        height: 536,
        width: 278,
        border: '1px solid #E0E0E0',
    },
    list: {
        height: 493,
        width: 280,
        border: '1px solid #E0E0E0',
        borderBottom: 0,
        margin: 0,
        paddingLeft: 25,
    },
    titleContainer: {
        height: 42,
        widht: 280,
        border: '1px solid #E0E0E0',
        borderBottom: 0,
    },
    title: {
        position: 'relative',
        height: 20,
        width: 92,
        color: '#494949',
        fontFamily: 'Roboto',
        fontSize: 15,
        fontWeight: 500,
        top: 12,
        left: 8,
    },
};

const TITLE = 'Selected Data';

export class SelectedContainer extends Component {
    state = {};

    renderSelectedItems = () => {
        return this.props.selected.map(item => (
            <li
                key={item.id}
                onClick={() => this.props.onRemoveDataDimension(item)}
            >
                {i18n.t(item.displayName)}
            </li>
        ));
    };

    render = () => {
        const selectedItems = this.renderSelectedItems();
        return (
            <div>
                <div style={style.titleContainer}>
                    <span style={style.title}>{i18n.t(TITLE)}</span>
                </div>
                <ul style={style.list}>{selectedItems}</ul>
            </div>
        );
    };
}

export default SelectedContainer;
