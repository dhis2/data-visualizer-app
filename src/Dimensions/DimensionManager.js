import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { Search } from 'material-ui-icons';
import { colors } from '../colors';
import DimensionList from './DimensionList';
import DialogueManager from './DialogueManager';
import i18n from '@dhis2/d2-i18n';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';

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

export class DimensionManager extends Component {
    state = {
        searchFieldValue: '',
        dialogIsOpen: false,
        dimensions: ['Data', 'Periods', 'Organisation Units'],
    };

    onClick = index => {
        this.toggleDialog();
        this.setState({
            dialogIndexNum: index,
        });
    };

    toggleDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    componentWillReceiveProps = nextProps => {
        let metaDataObjectPosition = 1;
        this.setState({
            dimensions: [
                ...this.state.dimensions,
                ...Object.entries(nextProps.dimensions).map(
                    entry => entry[metaDataObjectPosition].displayName
                ),
            ],
        });
    };

    render = () => {
        return (
            <div className={'dimensions'} style={style.divContainter}>
                <DialogueManager
                    index={this.state.dialogIndexNum}
                    dialogIsOpen={this.state.dialogIsOpen}
                    toggleDialog={this.toggleDialog}
                />
                <Search style={style.searchIcon} />
                <TextField
                    placeholder={i18n.t('Search dimensions')}
                    style={style.textField}
                    onChange={event =>
                        this.setState({ searchFieldValue: event.target.value })
                    }
                />
                <DimensionList
                    searchFieldValue={this.state.searchFieldValue}
                    dimensions={this.state.dimensions}
                    onClick={this.onClick}
                />
            </div>
        );
    };
}

const mapStateToProps = state => ({
    dimensions: fromReducers.fromDimensions.sGetFromState(state) || {},
});

const mapDispatchToProps = dispatch => ({
    setDimension: fromActions.fromDimensions.acSetDimensions,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DimensionManager);
