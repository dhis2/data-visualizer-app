import React, { Component } from 'react';
import List, { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui';
import { Data, Period, OrgUnit, GenericDimension } from './icons';

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

export class Alternatives extends Component {
    state = { selected: [] };

    onClick = index => {
        !this.state.selected.includes(index) &&
            this.setState({
                selected: [...this.state.selected, index],
            });
        this.props.onClick(index);
    };

    renderListIcon = index => {
        const dimensionIcon = [<Data />, <Period />, <OrgUnit />];
        return (
            <ListItemIcon style={style.iconStyle}>
                {index < 3 ? dimensionIcon[index] : <GenericDimension />}
            </ListItemIcon>
        );
    };
    displayMatchingDimensions = (entry, index) => {
        return (
            <MenuItem
                style={style.listItemStyle}
                button
                key={index}
                onClick={() => this.onClick(index)}
                selected={this.state.selected.includes(index) || false}
            >
                {this.renderListIcon(index)}
                <ListItemText
                    style={style.textStyle}
                    primary={entry}
                    disableTypography
                />
            </MenuItem>
        );
    };

    render = () => {
        const { dimensions, searchFieldValue } = this.props;
        return (
            <List>
                {dimensions.map(
                    (entry, index) =>
                        entry
                            .toLowerCase()
                            .includes(searchFieldValue.toLowerCase()) &&
                        this.displayMatchingDimensions(entry, index)
                )}
            </List>
        );
    };
}
export default Alternatives;
