import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Detail } from './Detail';
import { dataTypes, isProgram } from '../../../../modules/dataTypes';
import { styles } from './styles/Groups.style';

const renderPlaceholder = () => <span>{i18n.t('Select Program')}</span>;

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
                {item.name}
            </MenuItem>
        ));
    };

    const havePlaceholder = isProgram(props.groupId, props.dataType);

    const groupDetail = dataTypes[props.dataType].groupDetail;

    return (
        <div style={styles.container}>
            <div style={styles.groupContainer}>
                <InputLabel style={styles.titleText}>
                    {dataTypes[props.dataType].groupLabel}
                </InputLabel>
                <Select
                    value={props.groupId}
                    onChange={handleChange}
                    renderValue={havePlaceholder ? renderPlaceholder : null}
                    displayEmpty={havePlaceholder}
                    disableUnderline
                    SelectDisplayProps={
                        havePlaceholder
                            ? { style: styles.placeholder }
                            : { style: styles.dropDown }
                    }
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
    groupId: PropTypes.string.isRequired,
    onGroupChange: PropTypes.func.isRequired,
    onDetailChange: PropTypes.func.isRequired,
    detailValue: PropTypes.string.isRequired,
};

export default Groups;
