import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { Search } from 'material-ui-icons';
import { colors } from '../colors';
import DimensionList from './DimensionList';
import DialogManager from './DialogManager';
import i18n from '@dhis2/d2-i18n';
import * as fromReducers from '../reducers';

const style = {
    divContainter: {
        backgroundColor: colors.lightGrey,
        height: 764,
        width: 250,
    },
    searchIcon: {
        color: '#9E9E9E',
        position: 'relative',
        marginTop: 15,
        right: 15,
    },
    textField: {
        bottom: 9,
        right: 8,
    },
};

export class Dimensions extends Component {
    state = { searchText: '', dialogIsOpen: false, dimensionId: null };

    handleChange = event => {
        this.setState({ searchText: event.target.value });
    };

    toggleDialog = id => {
        this.setState({
            dimensionId: id,
            dialogIsOpen: !this.state.dialogIsOpen,
        });
    };

    render = () => {
        return (
            <div className={'dimensions'} style={style.divContainter}>
                <DialogManager
                    open={this.state.dialogIsOpen}
                    dimensionId={this.state.dimensionId}
                    toggleDialog={this.toggleDialog}
                />
                <Search style={style.searchIcon} />
                <TextField
                    placeholder={i18n.t('Search dimensions')}
                    style={style.textField}
                    onChange={this.handleChange}
                />
                <DimensionList
                    searchText={this.state.searchText}
                    dimensions={this.props.dimensions}
                    toggleDialog={this.toggleDialog}
                />
            </div>
        );
    };
}

const mapStateToProps = state => ({
    dimensions: fromReducers.fromDimensions.sGetFromState(state),
});

export default connect(mapStateToProps)(Dimensions);
