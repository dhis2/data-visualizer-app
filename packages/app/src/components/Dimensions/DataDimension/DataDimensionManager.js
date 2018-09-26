import React, { Component } from 'react';
import { DialogActions, DialogContent } from '@material-ui/core';
import i18n from '@dhis2/d2-i18n';
import UnselectedContainer from './UnselectedContainer';
import SelectedContainer from './SelectedContainer';
import { HideButton, UpdateButton } from './buttons';
import { arrayToIdMap } from '../../../util';
import { colors } from '../../../colors';

const style = {
    container: {
        maxHeight: 677,
        maxWidth: 795,
        overflow: 'scroll',
    },
    dialogContent: {
        paddingBottom: 0,
        paddingTop: 0,
    },
    dialogTitle: {
        fontFamily: 'Roboto',
        color: colors.black,
        height: 24,
        fontSize: 16,
        fontWeight: 500,
    },
    subContainer: {
        display: 'flex',
        height: 536,
    },
    dialogActions: {
        borderTop: `1px solid ${colors.blueGrey}`,
        margin: 0,
        paddingTop: 0,
        paddingBottom: 0,
        height: 84,
        paddingRight: 24,
    },
};

const DIALOG_TITLE = i18n.t('Data');
const AXIS_KEY = 'dx';
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
        if (Object.entries(this.state.selected).length) {
            const ids = Object.entries(this.state.selected).map(
                dataDimension => dataDimension[KEY_POS]
            );
            this.props.toggleDialog({ [AXIS_KEY]: ids });
        }
    };

    render = () => {
        return (
            <div style={style.container}>
                <DialogContent style={style.dialogContent}>
                    <h3 style={style.dialogTitle}>{DIALOG_TITLE}</h3>
                    <div style={style.subContainer}>
                        <UnselectedContainer
                            unSelectedItems={this.state.unSelected}
                            onGroupChange={this.handleContentChange}
                            onSelectAllClick={this.selectAll}
                            onAssignClick={this.assignDataDimensions}
                        />
                        <SelectedContainer
                            selectedItems={this.state.selected}
                            removeSelected={this.removeSelected}
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

export default DataDimensionManager;
