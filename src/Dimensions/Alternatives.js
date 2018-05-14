import React from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Star } from 'material-ui-icons';

const style = {
    // TODO: Move CSS into .css file when styling is done
    listItemStyle: {
        padding: 0,
        paddingLeft: 12,
        height: 35,
    },

    iconStyle: {
        marginRight: 0,
    },

    textStyle: {
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 0,
    },
};

const strings = [
    'Data',
    'Period',
    'Organisation Units',
    'Area',
    'Commodities',
    'Diagnosis',
    'Donor',
    'EPI/nutrition age',
    'Facility Ownership',
    'Facility Type',
    'Funding Agency',
    'Gender',
    'HIV age',
    'Implementing Partner',
    'Location Fixed/Outreach',
    'Location Rural/Urban',
    'Main data element groups',
    'Morbidity Age',
    'Morbidity/Mortality',
    'PMTCT',
    'Pregnant/Non-Pregnant',
    'Project',
    'Referrals Age',
    'Rural and Urban',
    'Target vs Result',
    'Tracker-based data',
];

export const Alternatives = ({ dimensions, searchFieldValue, onClick }) => {
    //dimensions.map((id, displayName) => console.log(id, displayName));
    return (
        <List>
            {strings.map(
                (entry, i) =>
                    searchFieldValue !== undefined &&
                    entry
                        .toLowerCase()
                        .includes(searchFieldValue.toLowerCase()) ? (
                        <ListItem
                            style={style.listItemStyle}
                            button
                            key={i}
                            onClick={() => onClick(i)}
                        >
                            <ListItemIcon style={style.iconStyle}>
                                <Star />
                            </ListItemIcon>
                            <ListItemText
                                style={style.textStyle}
                                primary={entry}
                                disableTypography
                            />
                        </ListItem>
                    ) : null
            )}
        </List>
    );
};

export default Alternatives;
