import i18n from '@dhis2/d2-i18n'
import { InputField } from '@dhis2/ui'
import { IconSearch16 } from '@dhis2/ui-icons'
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
                    <InputField
                        placeholder={i18n.t('Filter dimensions')}
                        value={this.state.filterText}
                        onChange={({ value }) =>
                            value.length
                                ? this.onFilterTextChange(value)
                                : this.onClearFilter()
                        }
                        dense
                        type="search"
                        prefixIcon={<IconSearch16 />}
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
