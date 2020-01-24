import React, { Component } from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { DimensionFilter } from '@dhis2/analytics'

import DndDimensionList from './DndDimensionList'

const styles = {
    divContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F4F6F8',
        padding: '8px',
        overflow: 'hidden',
    },
    textField: {
        paddingBottom: '6px',
    },
}

export class DndDimensionPanel extends Component {
    state = { filterText: '' }

    onClearFilter = () => {
        this.setState({ filterText: '' })
    }

    onFilterTextChange = filterText => {
        this.setState({ filterText })
    }

    render() {
        return (
            <div style={styles.divContainer}>
                <DimensionFilter
                    style={styles.textField}
                    placeholder={i18n.t('Search dimensions')}
                    text={this.state.filterText}
                    onChange={this.onFilterTextChange}
                    onClear={this.onClearFilter}
                />
                <DndDimensionList
                    filterText={this.state.filterText}
                    onDimensionOptionsClick={this.props.onDimensionOptionsClick}
                />
            </div>
        )
    }
}

DndDimensionPanel.propTypes = {
    onDimensionOptionsClick: PropTypes.func,
}

export default DndDimensionPanel
