import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { Search } from 'material-ui-icons';
import { colors } from '../colors';
import Alternatives from './Alternatives';
import DimensionsManager from './DimensionsManager';
import i18n from '@dhis2/d2-i18n';

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
    state = { searchFieldValue: '', dialogIsOpen: false };

    onClick = index => {
        this.toggleDialog();
        this.setState({
            dialogIndexNum: index,
        });
    };

    toggleDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
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
                    onClick={this.onClick}
                />
            </div>
        );
    };
}

export default Dimensions;
