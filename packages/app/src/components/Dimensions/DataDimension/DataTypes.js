import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import i18n from '@dhis2/d2-i18n';

const style = {
    container: {
        height: 53,
        width: 410,
        border: '1px solid #E0E0E0',
        borderBottom: 0,
        paddingLeft: 5,
        paddingRight: 5,
        display: 'flex',
        flexFlow: 'column',
    },
    titleText: {
        fontSize: 12,
        color: '#616161',
    },
    dropDown: {
        display: 'grid',
    },
    dropDownItem: {
        fontSize: 16,
    },
};

const TITLE = i18n.t('Data Type');
const alternatives = [
    {
        id: 'indicator',
        displayName: 'Indicators',
    },
    {
        id: 'Delements',
        displayName: 'Data Elements',
    },
    {
        id: 'Dsets',
        displayName: 'Data sets',
    },
    {
        id: 'EDItems',
        displayName: 'Event data items',
    },
    {
        id: 'pIndicator',
        displayName: 'Program Indicator',
    },
];

export class DataTypes extends Component {
    state = { dataType: '' };

    handleChange = event => {
        this.setState({ dataType: event.target.value });
    };

    render = () => {
        return (
            <div style={style.container}>
                <span style={style.titleText}>{TITLE}</span>
                <Select
                    value={this.state.dataType}
                    onChange={this.handleChange}
                    style={style.dropDown}
                >
                    {alternatives.map(item => (
                        <MenuItem
                            style={style.dropDownItem}
                            key={item.id}
                            value={item.displayName}
                        >
                            {item.displayName}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        );
    };
}

export default DataTypes;
