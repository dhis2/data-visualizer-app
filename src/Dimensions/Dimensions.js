import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { Search } from 'material-ui-icons';
import { colors } from '../colors';
import Alternatives from './Alternatives';
import DimensionsManager from './DimensionsManager';
import i18n from '@dhis2/d2-i18n';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';

const style = {
    divContainter: {
        backgroundColor: colors.lightGrey,
    },
    searchIcon: {
        marginTop: 15,
        marginLeft: 5,
        color: '#9E9E9E',
    },
    textField: {
        bottom: 10,
        left: 10,
    },
};

export class Dimensions extends Component {
    state = {};

    onClick = index => {
        this.toggleDialog();
        this.setState({
            dialogIndexNum: index,
        });
    };

    toggleDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
    };

    componentWillMount = () => {
        this.setState({
            searchFieldValue: '',
            dialogIsOpen: false,
        });
    };

    render = () => {
        return (
            <div className={'dimensions'} style={style.divContainter}>
                <DimensionsManager
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
                <Alternatives
                    searchFieldValue={this.state.searchFieldValue}
                    dimensions={this.props.dimensions}
                    onClick={this.onClick}
                />
            </div>
        );
    };
}

//TODO: retrieve default dimensions from reducer
const mapStateToProps = state => {
    const dimensions = fromReducers.fromDimensions.sGetFromState(state);
    return {
        dimensions: dimensions,
    };
};

export default connect(
    mapStateToProps,
    { setDimension: fromActions.fromDimensions.acSetDimensions }
)(Dimensions);
