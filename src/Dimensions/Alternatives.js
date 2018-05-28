import React from 'react';
import { connect } from 'react-redux';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Star } from 'material-ui-icons';
import * as fromReducers from '../reducers';

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

// these are missing from the API request
//let testArr = ['Data', 'Period', 'Organisation Units'];

export const Alternatives = ({ dimensions, searchFieldValue, onClick }) => {
    return (
        <List>
            {dimensions
                ? Object.entries(dimensions).map(
                      (entry, index) =>
                          entry[1].displayName
                              .toLowerCase()
                              .includes(searchFieldValue.toLowerCase()) ? (
                              <ListItem
                                  style={style.listItemStyle}
                                  button
                                  key={entry[1].id}
                                  onClick={() => onClick(index)}
                              >
                                  <ListItemIcon style={style.iconStyle}>
                                      {/* TODO: Replace placeholder for the icons displayed in the Dimension list */}
                                      <Star />
                                  </ListItemIcon>
                                  <ListItemText
                                      style={style.textStyle}
                                      primary={entry[1].displayName}
                                      disableTypography
                                  />
                              </ListItem>
                          ) : null
                  )
                : null}
        </List>
    );
};

const mapStateToProps = state => ({
    dimensions: fromReducers.fromDimensions.sGetFromState(state),
});

export default connect(mapStateToProps)(Alternatives);
