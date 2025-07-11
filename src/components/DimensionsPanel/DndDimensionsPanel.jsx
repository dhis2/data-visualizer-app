import { DimensionFilter } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { default as DndDimensionList } from './DndDimensionList.jsx'
import styles from './styles/DndDimensionsPanel.module.css'

export class DndDimensionsPanel extends Component {
    state = { filterText: '' }

    onClearFilter = () => {
        this.setState({ filterText: '' })
    }

    onFilterTextChange = (filterText) => {
        this.setState({ filterText })
    }

    render() {
        return (
            <div className={styles.container} data-test="dimensions-panel">
                <div className={styles.filter}>
                    <DimensionFilter
                        placeholder={i18n.t('Filter dimensions')}
                        text={this.state.filterText}
                        onChange={this.onFilterTextChange}
                        onClear={this.onClearFilter}
                        disableUnderline={true}
                        type="search"
                        dataTest="dimensions-panel-filter"
                    />
                </div>
                <DndDimensionList
                    filterText={this.state.filterText}
                    onDimensionOptionsClick={this.props.onDimensionOptionsClick}
                    onDimensionClick={this.props.onDimensionClick}
                    dataTest="dimensions-panel-list"
                    activeDimensionId={this.props.activeDimensionId}
                />
            </div>
        )
    }
}

DndDimensionsPanel.propTypes = {
    activeDimensionId: PropTypes.string,
    onDimensionClick: PropTypes.func,
    onDimensionOptionsClick: PropTypes.func,
}

export default DndDimensionsPanel
