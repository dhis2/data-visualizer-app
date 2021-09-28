import {
    AXIS_ID_COLUMNS,
    hasCustomAxes,
    hasRelativeItems,
    isDualAxisType,
    VisualizationOptions,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getOptionsByType } from '../../modules/options/config'
import {
    sGetUiType,
    sGetUiOptions,
    sGetDimensionItemsByAxis,
    sGetUiLayout,
} from '../../reducers/ui'
import MenuButton from '../MenuButton/MenuButton'
import UpdateVisualizationContainer from '../UpdateButton/UpdateVisualizationContainer'

class VisualizationOptionsManager extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dialogIsOpen: false,
        }
    }

    onClick = handler => () => {
        handler()
        this.onClose()
    }

    onClose = () => {
        this.toggleVisualizationOptionsDialog()
    }

    toggleVisualizationOptionsDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen })
    }

    filteredSeries = this.props.series.filter(seriesItem =>
        this.props.columnDimensionItems.some(
            layoutItem => layoutItem === seriesItem.dimensionItem
        )
    )
    optionsConfig = getOptionsByType(
        this.props.visualizationType,
        isDualAxisType(this.props.visualizationType) &&
            hasCustomAxes(this.filteredSeries) &&
            !hasRelativeItems(
                this.props.columns[0],
                this.props.columnDimensionItems
            ),
        this.props.series?.length &&
            isDualAxisType(this.props.visualizationType)
            ? [...new Set(this.props.series.map(serie => serie.axis))].sort(
                  (a, b) => a - b
              )
            : [0]
    )

    render() {
        return (
            <>
                <MenuButton
                    data-test={'app-menubar-options-button'}
                    onClick={this.toggleVisualizationOptionsDialog}
                >
                    {i18n.t('Options')}
                </MenuButton>
                {this.state.dialogIsOpen && (
                    <UpdateVisualizationContainer
                        renderComponent={handler => (
                            <VisualizationOptions
                                optionsConfig={this.optionsConfig}
                                onPrimaryClick={this.onClick(handler)}
                                onClose={this.onClose}
                            />
                        )}
                    />
                )}
            </>
        )
    }
}

VisualizationOptionsManager.propTypes = {
    visualizationType: PropTypes.string.isRequired,
    columnDimensionItems: PropTypes.array,
    columns: PropTypes.array,
    series: PropTypes.array,
}

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
    columnDimensionItems: sGetDimensionItemsByAxis(state, AXIS_ID_COLUMNS),
    series: sGetUiOptions(state).series,
    columns: sGetUiLayout(state).columns,
})

export default connect(mapStateToProps)(VisualizationOptionsManager)
