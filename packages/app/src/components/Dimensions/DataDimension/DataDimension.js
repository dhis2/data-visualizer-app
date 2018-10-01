import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DialogActions, DialogContent } from '@material-ui/core';
import i18n from '@dhis2/d2-i18n';
import UnselectedContainer from './UnselectedContainer';
import SelectedItems from './SelectedItems';
import { HideButton, UpdateButton } from './buttons';
import { arrayToIdMap } from '../../../util';
import { colors } from '../../../colors';

import './DataDimension.css';

const style = {
    container: {
        maxHeight: 677,
        maxWidth: 795,
        overflow: 'hidden',
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

export class DataDimension extends Component {
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

    selectDataDimensions = ids => {
        let selected = this.state.selected;
        let unSelected = {};

        Object.entries(this.state.unSelected).forEach(dataDim => {
            ids.includes(dataDim[KEY_POS])
                ? (selected = {
                      ...selected,
                      ...{ [dataDim[KEY_POS]]: dataDim[OBJECT_POS] },
                  })
                : (unSelected = {
                      ...unSelected,
                      ...{ [dataDim[KEY_POS]]: dataDim[OBJECT_POS] },
                  });
        });

        this.setState({
            unSelected,
            selected,
        });
    };

    deselectDataDimensions = ids => {
        let unSelected = this.state.unSelected;
        let selected = {};

        Object.entries(this.state.selected).forEach(dataDim => {
            ids.includes(dataDim[KEY_POS])
                ? (unSelected = {
                      ...unSelected,
                      ...{ [dataDim[KEY_POS]]: dataDim[OBJECT_POS] },
                  })
                : (selected = {
                      ...selected,
                      ...{ [dataDim[KEY_POS]]: dataDim[OBJECT_POS] },
                  });
        });

        this.setState({
            unSelected,
            selected,
        });
    };

    onUpdateClick = () => {
        if (Object.entries(this.state.selected).length) {
            const ids = Object.entries(this.state.selected).map(
                dataDimension => dataDimension[KEY_POS]
            );
            this.props.setDimension({ [AXIS_KEY]: ids });
        }
    };

    render = () => {
        return (
            <div style={style.container}>
                <DialogContent style={style.dialogContent}>
                    <h3 style={style.dialogTitle}>{DIALOG_TITLE}</h3>
                    <div style={style.subContainer}>
                        <UnselectedContainer
                            items={this.state.unSelected}
                            onGroupChange={this.handleContentChange}
                            onSelect={this.selectDataDimensions}
                        />
                        <SelectedItems
                            items={this.state.selected}
                            onDeselect={this.deselectDataDimensions}
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

DataDimension.propTypes = {
    toggleDialog: PropTypes.func.isRequired,
};

export default DataDimension;
