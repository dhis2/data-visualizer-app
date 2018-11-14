import React, { Component } from 'react';
import i18n from '@dhis2/d2-i18n';
import DialogManager from './Dialogs/DialogManager';
import Filter from '../Filter/Filter';
import DimensionList from './DimensionList';
import { styles } from './styles/Dimensions.style';

export class Dimensions extends Component {
    state = { filterText: '' };

    onClearFilter = () => {
        this.setState({ filterText: '' });
    };

    onFilterTextChange = filterText => {
        this.setState({ filterText });
    };

    render = () => (
        <div style={styles.divContainer}>
            <DialogManager />
            <Filter
                style={styles.textField}
                placeholder={i18n.t('Search dimensions')}
                text={this.state.filterText}
                onChange={this.onFilterTextChange}
                onClear={this.onClearFilter}
            />
            <DimensionList filterText={this.state.filterText} />
        </div>
    );
}

export default Dimensions;
