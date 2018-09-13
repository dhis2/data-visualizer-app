import React, { Component } from 'react';
import i18n from '@dhis2/d2-i18n';

const style = {
    container: {
        height: 536,
        width: 280,
        border: '1px solid #E0E0E0',
    },
    subContainer: {
        height: 494,
        width: 280,
        border: '1px solid #E0E0E0',
    },
    titleContainer: {
        height: 40,
        widht: 280,
        border: '1px solid #E0E0E0',
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

    renderSelectedItems = () => {};

    render = () => {
        return (
            <div>
                <div style={style.titleContainer}>
                    <span style={style.title}>{i18n.t(TITLE)}</span>
                </div>
                <div style={style.subContainer}>
                    {this.renderSelectedItems()}
                </div>
            </div>
        );
    };
}

export default SelectedContainer;
