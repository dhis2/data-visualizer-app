import React, { Component } from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { DimensionFilter } from '@dhis2/analytics'
import { colors } from '@dhis2/ui-core'

import DndDimensionList from './DndDimensionList'

import styles from './styles/DndDimensionsPanel.module.css'

export class DndDimensionsPanel extends Component {
    state = { filterText: '' }

    onClearFilter = () => {
        this.setState({ filterText: '' })
    }

    onFilterTextChange = filterText => {
        this.setState({ filterText })
    }

    render() {
        return (
            <div className={styles.container}>
                <DimensionFilter
                    style={{
                        marginBottom: '6px',
                        background: '#fff',
                        border: `1px solid ${colors.grey400}`,
                        borderRadius: '5px',
                        marginRight: '8px',
                    }}
                    placeholder={i18n.t('Filter dimensions')}
                    text={this.state.filterText}
                    onChange={this.onFilterTextChange}
                    onClear={this.onClearFilter}
                    disableUnderline={true}
                />
                <DndDimensionList
                    filterText={this.state.filterText}
                    onDimensionOptionsClick={this.props.onDimensionOptionsClick}
                />
            </div>
        )
    }
}

DndDimensionsPanel.propTypes = {
    onDimensionOptionsClick: PropTypes.func,
}

export default DndDimensionsPanel
