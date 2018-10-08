import React, { Component } from 'react';
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

export class Groups extends Component {
    handleChange = event => {
        this.props.onGroupChange(event.target.value);
    };

    renderDropDownItems = () => {
        const defaultGroup = dataTypes[this.props.dataType].defaultGroup;
        let optionItems = this.props.groups;

        if (defaultGroup) {
            optionItems = [defaultGroup, ...optionItems];
        }

        return optionItems.map(item => (
            <MenuItem key={item.id} value={item.id}>
                {item.displayName}
            </MenuItem>
        ));
    };

    render = () => {
        const renderItems = this.renderDropDownItems();
        const showTotals = dataTypes[this.props.dataType].groupDetail;

        return (
            <div style={style.container}>
                <div style={style.groupContainer}>
                    <InputLabel style={style.titleText}>
                        {dataTypes[this.props.dataType].groupLabel}
                    </InputLabel>
                    <Select
                        value={this.props.selectedGroupId}
                        onChange={this.handleChange}
                        SelectDisplayProps={{ style: style.dropDown }}
                        disableUnderline
                    >
                        {renderItems}
                    </Select>
                </div>
                {showTotals && (
                    <Detail
                        value={this.props.detailValue}
                        onDetailChange={this.props.onDetailChange}
                    />
                )}
            </div>
        );
    };
}

Groups.propTypes = {
    dataType: PropTypes.string.isRequired,
    groups: PropTypes.array.isRequired,
    onGroupChange: PropTypes.func.isRequired,
    onDetailChange: PropTypes.func.isRequired,
    detailValue: PropTypes.string.isRequired,
};

export default Groups;
