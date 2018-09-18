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
    state = { unselected: [], selected: [] };

    addDataDimension = dataDimension => {
        //console.log('adding dataDim ', dataDimension, ' to selected');
        //console.log(this.state);
        this.setState({
            unselected: this.state.unselected.filter(
                dataDim => dataDim !== dataDimension
            ),
            selected: [...this.state.selected, dataDimension],
        });
    };

    removeDataDimension = dataDimension => {
        //console.log('removing dataDim ', dataDimension, ' to unselected');
        //console.log(this.state);
        this.setState({
            unselected: [...this.state.unselected, dataDimension],
            selected: this.state.selected.filter(
                dataDim => dataDim !== dataDimension
            ),
        });
    };

    handleContentChange = newContent => {
        this.setState({ unselected: newContent });
    };

    render = () => {
        //console.log(this.state);
        return (
            <div style={style.container}>
                <h3 style={style.title}>{i18n.t(DIALOG_TITLE)}</h3>
                <div style={style.subContainer}>
                    <UnselectedContainer
                        unselected={this.state.unselected}
                        onContentChange={this.handleContentChange}
                        onAddDataDimension={this.addDataDimension}
                    />
                    <ActionButtons
                        onAssignClick={this.addDataDimension}
                        onUnassignClick={this.removeDataDimension}
                    />
                    <SelectedContainer
                        selected={this.state.selected}
                        onRemoveDataDimension={this.removeDataDimension}
                    />
                </div>
            </div>
        );
    };
}

export default DataDimensionContent;
