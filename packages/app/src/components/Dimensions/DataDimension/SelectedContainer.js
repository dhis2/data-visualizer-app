import React, { Component } from 'react';
import { Close } from '@material-ui/icons';
import i18n from '@dhis2/d2-i18n';
import { DeselectAllButton } from './buttons';
import { colors } from '../../../colors';

const style = {
    container: {
        height: 505,
        width: 278,
        border: '1px solid #E0E0E0',
    },
    subTitleContainer: {
        height: 42,
        widht: 280,
        borderBottom: '1px solid #E0E0E0',
    },
    list: {
        height: 426,
        width: 280,
        paddingLeft: 0,
        margin: 0,
        listStyle: 'none',
        overflowX: 'scroll',
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
        paddingTop: 3,
        paddingBottom: 3,
        minHeight: 24,
    },
    highlighted: {
        display: 'flex',
        marginLeft: 12,
        marginRight: 12,
        paddingRight: 4,
        paddingBottom: 3,
        minHeight: 24,
        borderRadius: 4,
        border: '1px solid black',
    },
    unHighlighted: {
        backgroundColor: colors.lightBlue,
        display: 'flex',
        marginLeft: 12,
        marginRight: 12,
        paddingRight: 4,
        paddingBottom: 3,
        borderRadius: 4,
        minHeight: 24,
    },
    iconContainer: {
        width: 20,
    },
    icon: {
        height: 6,
        width: 6,
        backgroundColor: '#1976D2',
        position: 'relative',
        left: '44%',
        top: '44%',
    },
    text: {
        fontSize: 13,
        fontFamily: 'Roboto',
        wordBreak: 'break-word',
        paddingLeft: 8,
        paddingTop: 5,
    },
    deleteButton: {
        border: 'none',
        background: 'none',
        padding: 0,
        paddingTop: 6,
        paddingLeft: 1,
        width: 9,
    },
    deleteButtonIcon: {
        fill: colors.blue,
        height: 13,
        width: 10,
    },
};

const SELECTED_DATA_TITLE = i18n.t('Selected Data');
const OBJECT_POS = 1;

export const RemoveSelectedItemButton = ({ action }) => {
    return (
        <button style={style.deleteButton} onClick={action} tabIndex={0}>
            <Close style={style.deleteButtonIcon} />
        </button>
    );
};
const SELECTED = 'selected';

export class SelectedContainer extends Component {
    renderSelectedItems = dataDim => {
        const handleClick = () => this.props.onItemClick(SELECTED, dataDim);

        const itemStyle = dataDim.isHighlighted
            ? style.highlighted
            : style.unHighlighted;

        return (
            <li id={dataDim.id} key={dataDim.id} style={style.listItem}>
                <div style={itemStyle}>
                    <div style={style.iconContainer}>
                        <div style={style.icon} />
                    </div>
                    <span style={style.text} onClick={handleClick}>
                        {i18n.t(dataDim.displayName)}
                    </span>
                    <RemoveSelectedItemButton
                        style={style.removeButton}
                        action={() => this.props.removeSelected(dataDim)}
                    />
                </div>
            </li>
        );
    };

    render = () => {
        const selectedItems = Object.entries(this.props.selected).map(dataDim =>
            this.renderSelectedItems(dataDim[OBJECT_POS])
        );
        return (
            <div style={style.container}>
                <div style={style.subTitleContainer}>
                    <span style={style.title}>{SELECTED_DATA_TITLE}</span>
                </div>
                <ul style={style.list}>{selectedItems}</ul>
                <DeselectAllButton action={this.props.deselectAll} />
            </div>
        );
    };
}

export default SelectedContainer;
