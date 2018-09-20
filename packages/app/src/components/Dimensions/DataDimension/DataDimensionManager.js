import React, { Component } from 'react';
import UnselectedContainer from './UnselectedContainer';
import SelectedContainer from './SelectedContainer';
import { ActionButtons } from './buttons';
import i18n from '@dhis2/d2-i18n';
import { apiFetchGroups, apiFetchAlternatives } from '../../../api/dimensions';
import { filterArr } from '../../../util';

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
        height: 536,
        width: 747,
        display: 'flex',
    },
};

const RETRIEVE_INCLUDED = true; // RETRIEVE_IF_INCLUDED
const REMOVE_INCLUDED = false; // REMOVE_IF_NOT_INCLUDED
const REMOVE_ELEMENT = 'NOT_EQUAL'; // REMOVE_ELEMENT

const DIALOG_TITLE = i18n.t('Data');

export class DataDimensionManager extends Component {
    state = {
        //TODO: prøv objekter
        unSelected: [],
        selected: [],
        highlighted: [],
    };

    handleContentChange = async currentGroupSet => {
        /*// TODO API Call
        const newContent = await apiFetchAlternatives(
            this.state.dataType,
            currentGroupSet
            this.setState({ currentGroupSet, unSelected: newContent});
        );*/
        this.setState({ unSelected: currentGroupSet });
    };

    selectAll = () => {
        const assignedSelectedItems = [
            ...this.state.unSelected,
            ...this.state.selected,
        ];

        const highlightedItems = filterArr(
            this.state.selected,
            this.state.highlighted,
            RETRIEVE_INCLUDED
        );

        this.setState({
            unSelected: [],
            selected: assignedSelectedItems,
            highlighted: highlightedItems,
        });
    };

    deselectAll = () => {
        const unSelectedItems = [
            ...this.state.unSelected,
            ...this.state.selected,
        ];

        const highlightedItems = filterArr(
            this.state.unSelected,
            this.state.highlighted,
            RETRIEVE_INCLUDED
        );

        // TODO : Fetch original items from group
        this.setState({
            unSelected: unSelectedItems,
            selected: [],
            highlighted: highlightedItems,
        });
    };

    toggleHighlight = dataDim => {
        this.state.highlighted.includes(dataDim)
            ? this.setState({
                  highlighted: filterArr(
                      this.state.highlighted,
                      dataDim,
                      REMOVE_ELEMENT
                  ),
              })
            : this.setState({
                  highlighted: [...this.state.highlighted, dataDim],
              });
    };

    assignDataDimensions = () => {
        const unSelectedItems = filterArr(
            this.state.unSelected,
            this.state.highlighted,
            REMOVE_INCLUDED
        );

        const selectedItems = [
            ...this.state.selected,
            ...filterArr(
                this.state.highlighted,
                this.state.unSelected,
                RETRIEVE_INCLUDED
            ),
        ];

        const highlightedItems = filterArr(
            this.state.highlighted,
            this.state.selected,
            RETRIEVE_INCLUDED
        );

        this.setState({
            unSelected: unSelectedItems,
            selected: selectedItems,
            highlighted: highlightedItems,
        });
    };

    unAssignDataDimensions = () => {
        const unSelectedItems = [
            ...this.state.unSelected,
            ...filterArr(
                this.state.selected,
                this.state.highlighted,
                RETRIEVE_INCLUDED
            ),
        ];

        const selectedItems = filterArr(
            this.state.selected,
            this.state.highlighted,
            REMOVE_INCLUDED
        );

        const highlightedItems = filterArr(
            this.state.highlighted,
            this.state.unSelected,
            RETRIEVE_INCLUDED
        );

        this.setState({
            unSelected: unSelectedItems,
            selected: selectedItems,
            highlighted: highlightedItems,
        });
    };

    removeSelected = dataDimension => {
        const unSelectedItems = [...this.state.unSelected, dataDimension];

        const selectedItems = filterArr(
            this.state.selected,
            dataDimension,
            REMOVE_ELEMENT
        );

        const highlightedItems = filterArr(
            this.state.highlighted,
            dataDimension,
            REMOVE_ELEMENT
        );

        this.setState({
            unSelected: unSelectedItems,
            selected: selectedItems,
            highlighted: highlightedItems,
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
