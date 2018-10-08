import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Detail } from './Detail';
import { apiFetchGroups, apiFetchAlternatives } from '../../../api/dimensions'; // TODO
import {
    dataTypes,
    DATA_SETS_CONSTANTS,
    DATA_SETS,
    DATA_ELEMENTS,
    getReportingRates,
    DEFAULT_DATATYPE_ID,
    ALL_ID,
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

        if (this.props.dataType === DATA_SETS) {
            newDataDimensions = getReportingRates(
                newDataDimensions,
                currentGroup
            );
        }

        this.setState({ dataDimId: currentGroup });
        this.props.onGroupChange(newDataDimensions);
    };

    renderDropDownItems = () => {
        const { dataType } = this.props;
        const defaultGroup = dataTypes[dataType].defaultGroup;

        let optionItems = this.state[dataType];

        if (defaultGroup) {
            optionItems = [defaultGroup, ...optionItems];
        }

        return dataType.length
            ? optionItems.map(item => (
                  <MenuItem key={item.id} value={item.id}>
                      {item.displayName}
                  </MenuItem>
              ))
            : null;
    };

    componentDidMount = async () => {
        const dataType = DEFAULT_DATATYPE_ID;
        const groupSetAlternatives = await apiFetchGroups(dataType);
        this.setState({ [dataType]: groupSetAlternatives });
        const dimensions = await apiFetchAlternatives(
            this.props.dataType,
            ALL_ID
        );
        this.setState({ dataDimId: ALL_ID });
        this.props.onGroupChange(dimensions);
    };

    componentDidUpdate = async () => {
        const { dataType } = this.props;

        if (!Object.keys(this.state[dataType]).length) {
            const groupSetAlternatives = await apiFetchGroups(dataType);
            this.setState({ [dataType]: groupSetAlternatives });
        }
    };

    render = () => {
        const renderItems = this.renderDropDownItems();
        const showTotals = this.props.dataType === DATA_ELEMENTS;

        return (
            <div style={style.container}>
                <div style={style.groupContainer}>
                    <InputLabel style={style.titleText}>
                        {dataTypes[this.props.dataType].groupLabel}
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
    onGroupChange: PropTypes.func.isRequired,
    onDetailChange: PropTypes.func.isRequired,
    detailValue: PropTypes.string.isRequired,
};

export default Groups;
