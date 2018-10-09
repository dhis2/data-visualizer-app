import React from 'react';
import PropTypes from 'prop-types';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Detail } from './Detail';

import { dataTypes } from './dataTypes';
import { colors } from '../../../colors';

const style = {
    container: {
        border: `1px solid ${colors.greyLight}`,
        display: 'flex',
        height: 53,
        width: 420,
        borderBottom: 0,
        paddingTop: 5,
    },
    groupContainer: {
        display: 'flex',
        flexFlow: 'column',
        width: 'inherit',
        minWidth: 316,
        paddingLeft: 5,
        paddingRight: 5,
    },
    dropDown: {
        padding: 0,
    },
    titleText: {
        color: colors.greyDark,
        fontSize: 13,
        fontWeight: 300,
        paddingBottom: 15,
    },
};

const Groups = props => {
    const handleChange = event => {
        props.onGroupChange(event.target.value);
    };

    const renderDropDownItems = () => {
        const defaultGroup = dataTypes[props.dataType].defaultGroup;
        let optionItems = props.groups;

        if (defaultGroup) {
            optionItems = [defaultGroup, ...optionItems];
        }

        return optionItems.map(item => (
            <MenuItem key={item.id} value={item.id}>
                {item.displayName}
            </MenuItem>
        ));
    };

    const groupDetail = dataTypes[props.dataType].groupDetail;

    return (
        <div style={style.container}>
            <div style={style.groupContainer}>
                <InputLabel style={style.titleText}>
                    {dataTypes[props.dataType].groupLabel}
                </InputLabel>
                <Select
                    value={props.selectedGroupId}
                    onChange={handleChange}
                    SelectDisplayProps={{ style: style.dropDown }}
                    disableUnderline
                >
                    {renderDropDownItems()}
                </Select>
            </div>
            {groupDetail && (
                <Detail
                    value={props.detailValue}
                    onDetailChange={props.onDetailChange}
                    detailAlternatives={groupDetail.alternatives}
                />
            )}
        </div>
    );
};

Groups.propTypes = {
    dataType: PropTypes.string.isRequired,
    groups: PropTypes.array.isRequired,
    onGroupChange: PropTypes.func.isRequired,
    onDetailChange: PropTypes.func.isRequired,
    detailValue: PropTypes.string.isRequired,
};

export default Groups;
