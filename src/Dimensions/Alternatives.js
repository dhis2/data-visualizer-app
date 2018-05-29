import React from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Data } from './icons/data';
import { Period } from './icons/period';
import { OrgUnit } from './icons/orgunit';
import { GenericDimension } from './icons/genericdimension';

// import { Data, Period, OrgUnit, GenericDimension } from './icons';  resulting in module not found (?)

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

const dimensionIcon = [<Data />, <Period />, <OrgUnit />];

export const Alternatives = ({ dimensions, searchFieldValue, onClick }) => {
    return (
        <List>
            {dimensions.map(
                (entry, index) =>
                    entry
                        .toLowerCase()
                        .includes(searchFieldValue.toLowerCase()) ? (
                        <ListItem
                            style={style.listItemStyle}
                            button
                            key={index}
                            onClick={() => onClick(index)}
                        >
                            <ListItemIcon style={style.iconStyle}>
                                {index < 3 ? (
                                    dimensionIcon[index]
                                ) : (
                                    <GenericDimension />
                                )}
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
