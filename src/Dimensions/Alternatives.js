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
                                {/* TODO: Replace placeholder for the icons displayed in the Dimension list */}
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
