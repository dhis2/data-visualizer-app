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
    state = { unselected: [], selected: [], highlighted: [] };

    assignDataDimensions = () => {
        this.setState({
            unselected: this.state.unselected.filter(
                dataDim =>
                    this.state.highlighted.includes(dataDim) ? dataDim : null
            ),
            selected: this.state.highlighted,
            highlighted: [],
        });
    };

    unAssignDataDimension = dataDimension => {
        this.setState({
            unselected: [...this.state.unselected, dataDimension],
            selected: this.state.selected.filter(
                dataDim => dataDim !== dataDimension
            ),
        });
    };

    handleContentChange = newContent => {
        //console.log(this.state.unselected);
        this.setState({ unselected: newContent });
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

    render = () => {
        return (
            <div style={style.container}>
                <h3 style={style.title}>{i18n.t(DIALOG_TITLE)}</h3>
                <div style={style.subContainer}>
                    <UnselectedContainer
                        unselected={this.state.unselected}
                        onContentChange={this.handleContentChange}
                        highlightedItems={this.state.highlighted}
                        onItemClick={this.toggleHighlight}
                    />
                    <ActionButtons
                        onAssignClick={this.assignDataDimensions}
                        onUnassignClick={this.unAssignDataDimension}
                    />
                    <SelectedContainer
                        selected={this.state.selected}
                        onItemClick={this.removeDataDimension}
                    />
                </div>
            </div>
        );
    };
}

export default DataDimensionContent;
