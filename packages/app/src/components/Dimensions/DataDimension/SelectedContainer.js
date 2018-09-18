import React, { Component } from 'react';
import i18n from '@dhis2/d2-i18n';
import { colors } from '../../../colors';

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
        paddingLeft: 0,
        margin: 0,
        listStyle: 'none',
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
    listItem: {
        display: 'flex',
        paddingTop: 2,
        paddingBottom: 2,
    },
    highlighted: {
        backgroundColor: colors.lightBlue,
        display: 'flex',
        paddingTop: 1,
        paddingBottom: 1,
        paddingRight: 5,
        paddingLeft: 6,
        marginRight: 1,
        marginLeft: 3,
        borderRadius: 4,

        //border: '1px solid black',
    },
    icon: {
        height: 6,
        width: 6,
        marginTop: 5,
        marginRight: 5,
        backgroundColor: '#9E9E9E',
    },
    paddedIcon: {
        height: 6,
        width: 10,
        marginTop: 10,
        marginRight: 5,
        backgroundColor: '#9E9E9E',
    },
    text: {
        fontSize: 13,
        fontFamily: 'Roboto',
        paddingLeft: 2,
    },
};

const TITLE = 'Selected Data';

export class SelectedContainer extends Component {
    state = {};

    renderSelectedItems = dataDim => {
        console.log(dataDim);
        return (
            <li id={dataDim.id} key={dataDim.id} style={style.listItem}>
                <div
                    onClick={() => this.props.onItemClick(dataDim.id)}
                    style={style.highlighted}
                >
                    <div
                        style={
                            dataDim.displayName.length > 47
                                ? style.paddedIcon
                                : style.icon
                        }
                    />
                    <span style={style.text}>
                        {i18n.t(dataDim.displayName)}
                    </span>
                </div>
            </li>
        );
    };

    render = () => {
        const selectedItems = this.props.selected.map(dataDim =>
            this.renderSelectedItems(dataDim)
        );
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
