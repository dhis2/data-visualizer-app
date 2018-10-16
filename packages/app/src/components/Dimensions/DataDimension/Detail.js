import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import i18n from '@dhis2/d2-i18n';

const style = {
    detailContainer: {
        display: 'flex',
        flexFlow: 'column',
        width: '40%',
        paddingLeft: 5,
        paddingRight: 5,
    },
    titleText: {
        color: '#616161', // color
        fontSize: 12,
        paddingBottom: 15,
        fontWeight: 300,
    },
};

export const Detail = ({ value, onDetailChange, detailAlternatives }) => {
    return (
        <div style={style.detailContainer}>
            <InputLabel style={style.titleText}>{i18n.t('Detail')}</InputLabel>
            <Select
                onChange={event => onDetailChange(event.target.value)}
                value={value}
                disableUnderline
            >
                {Object.entries(detailAlternatives).map(item => {
                    return (
                        <MenuItem key={item[0]} value={item[0]}>
                            {item[1]}
                        </MenuItem>
                    );
                })}
            </Select>
        </div>
    );
};

Detail.propTypes = {
    value: PropTypes.string.isRequired,
    onDetailChange: PropTypes.func.isRequired,
    detailAlternatives: PropTypes.object.isRequired,
};

export default Detail;
