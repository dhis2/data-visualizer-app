import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Detail } from './Detail';
import { apiFetchGroups, apiFetchAlternatives } from '../../../api/dimensions'; // TODO
import {
    DATA_SETS_CONSTANTS,
    DATA_SETS,
    DATA_ELEMENTS,
    getReportingRates,
    getInputLabel,
    getDefaultAlternative,
} from './defaults';
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
    state = {
        indicators: [],
        dataElements: [],
        dataSets: DATA_SETS_CONSTANTS,
        eventDataItems: [],
        programIndicators: [],
        dataDimId: '',
    };

    handleChange = async event => {
        const currentGroup = event.target.value;
        let newDataDimensions = await apiFetchAlternatives(
            this.props.dataType,
            currentGroup
        );

        if (this.props.dataType === DATA_SETS)
            newDataDimensions = getReportingRates(
                newDataDimensions,
                currentGroup
            );

        this.setState({ dataDimId: currentGroup });
        this.props.onGroupChange(newDataDimensions);
    };

    renderDropDownItems = () => {
        const { dataType } = this.props;
        const defaultAlternative = getDefaultAlternative(dataType);
        let optionItems = this.state[dataType];

        if (defaultAlternative)
            optionItems = [defaultAlternative, ...optionItems];

        return dataType.length
            ? optionItems.map(item => (
                  <MenuItem key={item.id} value={item.id}>
                      {item.displayName}
                  </MenuItem>
              ))
            : null;
    };

    componentDidUpdate = async () => {
        const { dataType } = this.props;

        if (!Object.keys(this.state[dataType]).length) {
            const groupSetAlternatives = await apiFetchGroups(dataType);
            this.setState({ [dataType]: groupSetAlternatives });
        }
    };

    render = () => {
        const INPUT_LABEL = getInputLabel(this.props.dataType);
        const renderItems = this.renderDropDownItems();
        const showTotals = this.props.dataType === DATA_ELEMENTS;

        return (
            <div style={style.container}>
                <div style={style.groupContainer}>
                    <InputLabel style={style.titleText}>
                        {INPUT_LABEL}
                    </InputLabel>
                    <Select
                        value={this.state.dataDimId}
                        onChange={this.handleChange}
                        SelectDisplayProps={{ style: style.dropDown }}
                        disableUnderline
                    >
                        {renderItems}
                    </Select>
                </div>
                {showTotals ? (
                    <Detail
                        value={this.props.detailValue}
                        onDetailChange={this.props.onDetailChange}
                    />
                ) : null}
            </div>
        );
    };
}

export default Groups;
