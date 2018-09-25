import React, { Component } from 'react';
import UnselectedContainer from './UnselectedContainer';
import SelectedContainer from './SelectedContainer';
import { ActionButtons } from './buttons';
import i18n from '@dhis2/d2-i18n';
//import { apiFetchGroups, apiFetchAlternatives } from '../../../api/dimensions';
import { entriesToObject, arrayToIdMap, sortArray } from '../../../util';

const style = {
    container: {
        //maxHeight: 677,
        //maxWidth: 795,
    },
    title: {
        height: 24,
        width: 747,
        color: '#000000',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 500,
        paddingTop: 15,
        paddingBottom: 15,
    },
    subContainer: {
        height: 507,
        width: 747,
        display: 'flex',
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

    render = () => {
        return (
            <div style={style.container}>
                <h3 style={style.title}>{DIALOG_TITLE}</h3>
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
            </div>
        );
    };
}

export default DataDimensionManager;
