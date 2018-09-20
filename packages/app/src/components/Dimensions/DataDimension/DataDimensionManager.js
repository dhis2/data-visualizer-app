import React, { Component } from 'react';
import UnselectedContainer from './UnselectedContainer';
import SelectedContainer from './SelectedContainer';
import { ActionButtons } from './buttons';
import i18n from '@dhis2/d2-i18n';
import { apiFetchGroups, apiFetchAlternatives } from '../../../api/dimensions';

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

const DIALOG_TITLE = i18n.t('Data');

export class DataDimensionManager extends Component {
    state = {
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

    filterItem = (filterArr, includeArr, flag) => {
        const RETRIEVE_INCLUDED = true;
        const REMOVE_INCLUDED = false;
        const REMOVE_ELEMENT = 'NOT_EQUAL';

        switch (flag) {
            case true: {
                return filterArr.filter(
                    item => includeArr.includes(item) && item
                );
            }
            case false: {
                return filterArr.filter(
                    item => !includeArr.includes(item) && item
                );
            }
            case 'NOT_EQUAL': {
                return filterArr.filter(item => item.id !== includeArr.id);
            }
            default:
                return [];
        }
    };

    selectAll = () => {
        const assignedSelectedItems = [
            ...this.state.unSelected,
            ...this.state.selected,
        ];

        //const highlightedItems = this.filterItem(this.state.selected, this.state.highlighted, RETRIEVE_INCLUDED);
        const highlightedItems = this.state.selected.filter(
            item => this.state.highlighted.includes(item) && item
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

        //const highlightedItems = this.filterItem(this.state.unSelected, this.state.highlighted, RETRIEVE_INCLUDED);
        const highlightedItems = this.state.unSelected.filter(
            item => this.state.highlighted.includes(item) && item
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
                  highlighted: this.state.highlighted.filter(
                      item => dataDim.id !== item.id
                  ),
              })
            : this.setState({
                  highlighted: [...this.state.highlighted, dataDim],
              });
    };

    assignDataDimensions = () => {
        //const highlightedItems = this.filterItem(this.state.unSelected, this.state.highlighted, REMOVE_INCLUDED);
        const unSelectedItems = this.state.unSelected.filter(
            item => !this.state.highlighted.includes(item) && item
        );

        const selectedItems = [
            ...this.state.selected,
            ...this.state.highlighted.filter(
                item => this.state.unSelected.includes(item) && item
            ),
        ];

        //const highlightedItems = this.filterItem(this.state.highlighted, this.state.selected, RETRIEVE_INCLUDED);
        const highlightedItems = this.state.highlighted.filter(
            item => this.state.selected.includes(item) && item
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
            ...this.state.selected.filter(
                item => this.state.highlighted.includes(item) && item
            ),
        ];

        //const highlightedItems = this.filterItem(this.state.selected, this.state.highlighted, REMOVE_INCLUDED);
        const selectedItems = this.state.selected.filter(
            item => !this.state.highlighted.includes(item) && item
        );

        //const highlightedItems = this.filterItem(this.state.highlighted, this.state.unSelected, RETRIEVE_INCLUDED);
        const highlightedItems = this.state.highlighted.filter(
            item => this.state.unSelected.includes(item) && item
        );

        this.setState({
            unSelected: unSelectedItems,
            selected: selectedItems,
            highlighted: highlightedItems,
        });
    };

    removeSelected = dataDimension => {
        const unSelectedItems = [...this.state.unSelected, dataDimension];

        //const highlightedItems = this.filterItem(this.state.selected, dataDimension, NOT_EQUAL);
        const selectedItems = this.state.selected.filter(
            item => item.id !== dataDimension.id
        );

        //const highlightedItems = this.filterItem(this.state.highlighted, dataDimension, NOT_EQUAL);
        const highlightedItems = this.state.highlighted.filter(
            item => item.id !== dataDimension.id
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
