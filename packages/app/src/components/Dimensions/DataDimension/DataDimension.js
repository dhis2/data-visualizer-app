import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DialogActions, DialogContent } from '@material-ui/core';
import i18n from '@dhis2/d2-i18n';

import UnselectedContainer from './UnselectedContainer';
import SelectedItems from './SelectedItems';
import { HideButton, UpdateButton } from './buttons';

import { sGetUiItems, sGetUi } from '../../../reducers/ui';
import { acSetCurrentFromUi } from '../../../actions/current';
import { acAddUiLayoutDimensions } from '../../../actions/ui';
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
        unSelected: {},
        selected: {},
    };

    handleChangedGroup = items => {
        console.log('handleChangedGroup', items);

        // const selectedIds = Object.keys(this.props.ui.selected);
        // const unSelected = items.filter(i => {
        //     return selectedIds.indexOf(i.id) === -1;
        // });
        // this.setState({
        //     unSelected: arrayToIdMap(unSelected),
        // });
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
        console.log('deselect', ids);

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
        this.props.onUpdate(this.props.ui);
    };

    render = () => {
        return (
            <div style={style.container}>
                <DialogContent style={style.dialogContent}>
                    <h3 style={style.dialogTitle}>{DIALOG_TITLE}</h3>
                    <div style={style.subContainer}>
                        <UnselectedContainer
                            items={this.state.unSelected}
                            onGroupChange={this.handleChangedGroup}
                            onSelect={this.selectDataDimensions}
                        />
                        <SelectedItems
                            items={this.props.selectedItems.dx}
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
    setDimension: PropTypes.func.isRequired,
    toggleDialog: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    selectedItems: sGetUiItems(state),
    ui: sGetUi(state),
});

export default connect(
    mapStateToProps,
    {
        onSelectedChanged: acAddUiLayoutDimensions,
        onUpdate: acSetCurrentFromUi,
    }
)(DataDimension);
