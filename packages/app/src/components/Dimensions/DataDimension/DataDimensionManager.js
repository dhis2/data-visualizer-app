import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DialogActions, DialogContent } from '@material-ui/core';
import i18n from '@dhis2/d2-i18n';
import UnselectedContainer from './UnselectedContainer';
import SelectedContainer from './SelectedContainer';
import { HideButton, UpdateButton } from './buttons';
import { acSetUiItems } from '../../../actions/ui';
import { arrayToIdMap } from '../../../util';
import { colors } from '../../../colors';

const style = {
    dialogContent: {
        overflow: 'hidden',
        paddingBottom: 0,
        paddingTop: 0,
    },
    dialogTitle: {
        fontFamily: 'Roboto',
        color: colors.black,
        height: 24,
        width: 747,
        fontSize: 16,
        fontWeight: 500,
    },
    subContainer: {
        display: 'flex',
        height: 536,
        width: 747,
    },
    dialogActions: {
        borderTop: `1px solid ${colors.blueGrey}`,
        height: 84,
        margin: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 24,
    },
};

const DIALOG_TITLE = i18n.t('Data');

const KEY_POS = 0;
const OBJECT_POS = 1;

export class DataDimensionManager extends Component {
    state = {
        currentGroupSet: {},
        unSelected: {},
        selected: {},
    };

    handleContentChange = async newContent => {
        this.setState({
            currentGroupSet: arrayToIdMap(newContent),
            unSelected: arrayToIdMap(newContent),
        });
    };

    selectAll = () => {
        Object.keys(this.state.unSelected).length &&
            this.setState({
                unSelected: {},
                selected: Object.assign(
                    {},
                    this.state.unSelected,
                    this.state.selected
                ),
            });
    };

    deselectAll = () => {
        this.setState({
            unSelected: this.state.currentGroupSet,
            selected: {},
        });
    };

    assignDataDimensions = highlightedIds => {
        let selectedItems = this.state.selected;
        let unSelectedItems = {};

        Object.entries(this.state.unSelected).forEach(dataDim => {
            highlightedIds.includes(dataDim[KEY_POS])
                ? (selectedItems = {
                      ...selectedItems,
                      ...{ [dataDim[KEY_POS]]: dataDim[OBJECT_POS] },
                  })
                : (unSelectedItems = {
                      ...unSelectedItems,
                      ...{ [dataDim[KEY_POS]]: dataDim[OBJECT_POS] },
                  });
        });

        this.setState({
            unSelected: unSelectedItems,
            selected: selectedItems,
        });
    };

    unAssignDataDimensions = highlightedIds => {
        let unSelectedItems = this.state.unSelected;
        let selectedItems = {};

        Object.entries(this.state.selected).forEach(dataDim => {
            highlightedIds.includes(dataDim[KEY_POS])
                ? (unSelectedItems = {
                      ...unSelectedItems,
                      ...{ [dataDim[KEY_POS]]: dataDim[OBJECT_POS] },
                  })
                : (selectedItems = {
                      ...selectedItems,
                      ...{ [dataDim[KEY_POS]]: dataDim[OBJECT_POS] },
                  });
        });

        this.setState({
            unSelected: unSelectedItems,
            selected: selectedItems,
        });
    };

    removeSelected = dataDimension => {
        const unSelectedItems = Object.assign({}, this.state.unSelected, {
            [dataDimension.id]: dataDimension,
        });

        const selectedItems = Object.entries(this.state.selected).reduce(
            (selectedItems, [key, value]) =>
                key !== dataDimension.id
                    ? { ...selectedItems, [key]: value }
                    : selectedItems,
            {}
        );

        this.setState({
            unSelected: unSelectedItems,
            selected: selectedItems,
        });
    };

    //dispatch to store
    onUpdateClick = () => {
        const ids = Object.entries(this.state.selected).map(
            dataDimension => dataDimension[KEY_POS]
        );
        console.log(ids);
        //this.props.onAddDataDimensions(ids);
        this.props.toggleDialog(null);
    };

    render = () => {
        return (
            <div>
                <DialogContent style={style.dialogContent}>
                    <h3 style={style.dialogTitle}>{DIALOG_TITLE}</h3>
                    <div style={style.subContainer}>
                        <UnselectedContainer
                            onGroupChange={this.handleContentChange}
                            unSelectedItems={this.state.unSelected}
                            onSelectAllClick={this.selectAll}
                            onAssignClick={this.assignDataDimensions}
                        />
                        <SelectedContainer
                            removeSelected={this.removeSelected}
                            selectedItems={this.state.selected}
                            onDeselectAllClick={this.deselectAll}
                            onUnAssignClick={this.unAssignDataDimensions}
                        />
                    </div>
                </DialogContent>
                <DialogActions style={style.dialogActions}>
                    <HideButton action={() => this.props.toggleDialog(null)} />
                    <UpdateButton action={this.onUpdateClick} />
                </DialogActions>
            </div>
        );
    };
}

export default connect(
    null,
    {
        onAddDataDimensions: ids => acSetUiItems(ids),
    }
)(DataDimensionManager);
