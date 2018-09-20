import React, { Component } from 'react';
import UnselectedContainer from './UnselectedContainer';
import SelectedContainer from './SelectedContainer';
import { ActionButtons } from './buttons';
import i18n from '@dhis2/d2-i18n';
//import { apiFetchGroups, apiFetchAlternatives } from '../../../api/dimensions';
import { entriesToObject, sortArray } from '../../../util';

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

const OBJECT_POS = 1;
const DIALOG_TITLE = i18n.t('Data');

export class DataDimensionManager extends Component {
    state = {
        //TODO: prøv objekter
        currentGroupSet: {},
        unSelected: {},
        selected: {},
    };

    handleContentChange = async newContent => {
        /*// TODO API Call
        const newContent = await apiFetchAlternatives(
            this.state.dataType,
            currentGroupSet
            this.setState({ currentGroupSet, unSelected: newContent});
        );*/

        function arrayToIdMap(array) {
            return sortArray(array).reduce((obj, item) => {
                obj[item.id] = { ...item, isHighlighted: false };
                return obj;
            }, {});
        }

        const newDimensions = arrayToIdMap(newContent);

        this.setState({
            currentGroupSet: newDimensions,
            unSelected: newDimensions,
        });
    };

    selectAll = () => {
        if (Object.keys(this.state.unSelected).length) {
            const selectedItems = Object.assign(
                {},
                this.state.selected,
                this.state.unSelected
            );

            this.setState({
                unSelected: {},
                selected: selectedItems,
            });
        }
    };

    deselectAll = () => {
        this.setState({
            unSelected: this.state.currentGroupSet,
            selected: [],
        });
    };

    toggleHighlight = (name, dataDim) => {
        const toggle = {
            ...dataDim,
            isHighlighted: !dataDim.isHighlighted,
        };

        const highlightedItems = {
            ...this.state[name],
            [dataDim.id]: toggle,
        };

        this.setState({
            [name]: highlightedItems,
        });
    };

    assignDataDimensions = () => {
        let selectedItems = this.state.selected;

        Object.entries(this.state.unSelected).forEach(entry => {
            const dataDimension = entry[OBJECT_POS];
            const resetHighlight = {
                ...dataDimension,
                isHighlighted: false,
            };

            if (dataDimension.isHighlighted)
                selectedItems = {
                    ...selectedItems,
                    [dataDimension.id]: resetHighlight,
                };
        });

        const unSelectedItems = Object.entries(this.state.unSelected).filter(
            dataDim => !dataDim[OBJECT_POS].isHighlighted
        );

        this.setState({
            unSelected: entriesToObject(unSelectedItems),
            selected: selectedItems,
        });
    };

    unAssignDataDimensions = () => {
        let unSelectedItems = this.state.unSelected;

        Object.entries(this.state.selected).forEach(dataDim => {
            const dataDimension = dataDim[OBJECT_POS];
            const resetHighlight = {
                ...dataDimension,
                isHighlighted: false,
            };

            if (dataDimension.isHighlighted)
                unSelectedItems = {
                    ...unSelectedItems,
                    [dataDimension.id]: resetHighlight,
                };
        });

        const selectedItems = Object.entries(this.state.selected).filter(
            dataDim => !dataDim[OBJECT_POS].isHighlighted
        );

        this.setState({
            unSelected: unSelectedItems,
            selected: entriesToObject(selectedItems),
        });
    };

    removeSelected = dataDimension => {
        const unSelectedItems = Object.assign({}, this.state.unSelected, {
            [dataDimension.id]: dataDimension,
        });

        const selectedItems = Object.entries(this.state.selected).filter(
            dataDim => dataDim[OBJECT_POS].id !== dataDimension.id
        );

        this.setState({
            unSelected: unSelectedItems,
            selected: entriesToObject(selectedItems),
        });
    };

    render = () => {
        return (
            <div style={style.container}>
                <h3 style={style.title}>{DIALOG_TITLE}</h3>
                <div style={style.subContainer}>
                    <UnselectedContainer
                        onGroupChange={this.handleContentChange}
                        selectAll={this.selectAll}
                        unSelected={this.state.unSelected}
                        highlighted={this.state.highlighted}
                        onItemClick={this.toggleHighlight}
                    />
                    <ActionButtons
                        onAssignClick={this.assignDataDimensions}
                        onUnassignClick={this.unAssignDataDimensions}
                    />
                    <SelectedContainer
                        deselectAll={this.deselectAll}
                        selected={this.state.selected}
                        highlighted={this.state.highlighted}
                        onItemClick={this.toggleHighlight}
                        removeSelected={this.removeSelected}
                    />
                </div>
            </div>
        );
    };
}

export default DataDimensionManager;
