import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import i18n from '@dhis2/d2-i18n';
import { colors } from '../../../colors';
import { dataTypes } from './defaults';

const style = {
    container: {
        border: `1px solid ${colors.greyLight}`,
        display: 'flex',
        flexFlow: 'column',
        height: 53,
        width: 410,
        borderBottom: 0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
    },
    titleText: {
        color: colors.greyDark,
        fontSize: 13,
        fontWeight: 300,
        paddingBottom: 15,
    },
    dropDownItem: {
        fontSize: 16,
    },
    dropDown: {
        outline: 'none',
        padding: 0,
    },
};

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
                    {dataTypes.map(item => (
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
