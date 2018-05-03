import React from 'react';
import List, {
    ListItem,
    ListItemIcon,
    ListItemText,
} from 'material-ui-next/List';
import { Star } from 'material-ui-icons';

const style = {
    // TODO: Move CSS into .css file when styling is done
    listStyle: {},

    listItemStyle: {
        height: 24,
        width: 128,
        borderRadius: 4,
        backgroundColor: '#BBDEFB',
    },

    iconStyle: {},

    textStyle: {},
};

const getDimensionOptions = () => {
    //TODO: https://play.dhis2.org/dev/api/dimensions.json
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

const listAlternatives = () => {
    return (
        <List>
            {strings.map((entry, i) => (
                <ListItem button key={i}>
                    <ListItemIcon>
                        <Star />
                    </ListItemIcon>
                    <ListItemText inset primary={entry} />
                </ListItem>
            ))}
        </List>
    );
};

export const Alternatives = props => {
    return <div>{listAlternatives()}</div>;
};

export default Alternatives;
