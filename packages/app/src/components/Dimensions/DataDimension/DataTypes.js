import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import i18n from '@dhis2/d2-i18n';

const style = {
    container: {
        height: 53,
        width: 410,
        border: '1px solid #E0E0E0',
        borderBottom: 0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        display: 'flex',
        flexFlow: 'column',
    },
    titleText: {
        fontSize: 13,
        fontWeight: 300,
        color: '#616161',
        paddingBottom: 15,
    },
    dropDownItem: {
        fontSize: 16,
    },
    dropDown: {
        padding: 0,
    },
};

const alternatives = [
    {
        id: 'indicators',
        displayName: 'Indicators',
    },
    {
        id: 'dataElements',
        displayName: 'Data Elements',
    },
    {
        id: 'dataSets',
        displayName: 'Data sets',
    },
    {
        id: 'eventDataItems',
        displayName: 'Event data items',
    },
    {
        id: 'programIndicators',
        displayName: 'Program Indicator',
    },
];

const LABEL_TITLE = i18n.t('Data Type');

export class DataTypes extends Component {
    state = {};

    render = () => {
        return (
            <div style={style.container}>
                <InputLabel style={style.titleText}>{LABEL_TITLE}</InputLabel>
                <Select
                    value={this.props.value}
                    onChange={this.props.onDataTypeChange}
                    disableUnderline
                    SelectDisplayProps={{ style: style.dropDown }}
                >
                    {alternatives.map(item => (
                        <MenuItem
                            style={style.dropDownItem}
                            key={item.id}
                            value={item.id}
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
