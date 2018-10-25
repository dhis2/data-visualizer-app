import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import i18n from '@dhis2/d2-i18n';
import { dataTypes } from './dataTypes';
import { colors } from '../../../utils/colors';

const style = {
    container: {
        border: `1px solid ${colors.greyLight}`,
        display: 'flex',
        flexFlow: 'column',
        height: 53,
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

export const DataTypes = ({ currentDataType, onDataTypeChange }) => {
    return (
        <div style={style.container}>
            <InputLabel style={style.titleText}>
                {i18n.t('Data Type')}
            </InputLabel>
            <Select
                value={currentDataType}
                onChange={event => onDataTypeChange(event.target.value)}
                disableUnderline
                SelectDisplayProps={{ style: style.dropDown }}
            >
                {Object.values(dataTypes).map(type => (
                    <MenuItem
                        style={style.dropDownItem}
                        key={type.id}
                        value={type.id}
                    >
                        {type.name}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};

DataTypes.propTypes = {
    currentDataType: PropTypes.string.isRequired,
    onDataTypeChange: PropTypes.func.isRequired,
};

export default DataTypes;
