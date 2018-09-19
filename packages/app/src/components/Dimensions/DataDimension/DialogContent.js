import React, { Component } from 'react';
import UnselectedContainer from './UnselectedContainer';
import SelectedContainer from './SelectedContainer';
import { ActionButtons } from './buttons';
import i18n from '@dhis2/d2-i18n';

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

const DIALOG_TITLE = 'Data';

export class DataDimensionContent extends Component {
    state = { unSelected: [], selected: [], highlighted: [] };

    handleContentChange = newContent => {
        this.setState({ unSelected: newContent });
    };

    selectAll = () => {
        const filterSelected = [
            ...this.state.unSelected,
            ...this.state.selected,
        ];

        const filterHighlighted = this.state.selected.filter(
            item => this.state.highlighted.includes(item) && item
        );

        this.setState({
            unSelected: [],
            selected: filterSelected,
            highlighted: filterHighlighted,
        });
    };

    deselectAll = () => {
        const filterUnselected = [
            ...this.state.unSelected,
            ...this.state.selected,
        ];

        const filterHighlighted = this.state.unSelected.filter(
            item => this.state.highlighted.includes(item) && item
        );

        this.setState({
            unSelected: filterUnselected,
            selected: [],
            highlighted: filterHighlighted,
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
        const filterUnselected = this.state.unSelected.filter(
            item => !this.state.highlighted.includes(item) && item
        );

        const filterAndMoveItems = [
            ...this.state.selected,
            ...this.state.highlighted.filter(
                item => this.state.unSelected.includes(item) && item
            ),
        ];

        const filterHighlighted = this.state.highlighted.filter(
            item => this.state.selected.includes(item) && item
        );

        this.setState({
            unSelected: filterUnselected,
            selected: filterAndMoveItems,
            highlighted: filterHighlighted,
        });
    };

    unAssignDataDimensions = () => {
        const filterUnselected = [
            ...this.state.unSelected,
            ...this.state.selected.filter(
                item => this.state.highlighted.includes(item) && item
            ),
        ];

        const filterSelected = this.state.selected.filter(
            dataDim => !this.state.highlighted.includes(dataDim) && dataDim
        );

        const filterHighlighted = this.state.highlighted.filter(
            item => this.state.unSelected.includes(item) && item
        );

        this.setState({
            unSelected: filterUnselected,
            selected: filterSelected,
            highlighted: filterHighlighted,
        });
    };

    removeSelected = dataDimension => {
        const filterUnselected = [...this.state.unSelected, dataDimension];

        const filterSelected = this.state.selected.filter(
            item => item.id !== dataDimension.id
        );

        const filterHighlighted = this.state.highlighted.filter(
            item => item.id !== dataDimension.id
        );

        this.setState({
            unSelected: filterUnselected,
            selected: filterSelected,
            highlighted: filterHighlighted,
        });
    };

    render = () => {
        return (
            <div style={style.container}>
                <h3 style={style.title}>{i18n.t(DIALOG_TITLE)}</h3>
                <div style={style.subContainer}>
                    <UnselectedContainer
                        selectAll={this.selectAll}
                        onContentChange={this.handleContentChange}
                        unSelected={this.state.unSelected}
                        highlightedItems={this.state.highlighted}
                        onItemClick={this.toggleHighlight}
                    />
                    <ActionButtons
                        onAssignClick={this.assignDataDimensions}
                        onUnassignClick={this.unAssignDataDimensions}
                    />
                    <SelectedContainer
                        deselectAll={this.deselectAll}
                        selected={this.state.selected}
                        highlightedItems={this.state.highlighted}
                        onItemClick={this.toggleHighlight}
                        removeSelected={this.removeSelected}
                    />
                </div>
            </div>
        );
    };
}

export default DataDimensionContent;
