import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import { visTypeDisplayNames } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'

import { prepareCurrentAnalyticalObject } from '../../modules/currentAnalyticalObject'
import { sGetUi, sGetUiType } from '../../reducers/ui'
import { sGetCurrent } from '../../reducers/current'
import { sGetMetadata } from '../../reducers/metadata'
import { acSetUiType } from '../../actions/ui'
import {
    apiSaveAOInUserDataStore,
    CURRENT_AO_KEY,
} from '../../api/userDataStore'

import VisualizationTypeMenuItem from './VisualizationTypeMenuItem'
import MenuItemIcon from './MenuItemIcon'
import styles from './styles/VisualizationTypeSelector.style'

export const MAPS_APP_URL = 'dhis-web-maps'

export const defaultState = {
    anchorEl: null,
}

export class VisualizationTypeSelector extends Component {
    constructor(props, context) {
        super(props)

        this.state = defaultState
        this.baseUrl = context.baseUrl
    }

    handleButtonClick = event => {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleMenuItemClick = type => () => {
        this.props.onTypeSelect(type)
        this.handleClose()
    }

    handleOpenAsMapClick = async () => {
        const currentAnalyticalObject = prepareCurrentAnalyticalObject(
            this.props.current,
            this.props.metadata,
            this.props.ui
        )

        await apiSaveAOInUserDataStore(currentAnalyticalObject)

        window.location.href = `${this.baseUrl}/${MAPS_APP_URL}?${CURRENT_AO_KEY}=true`
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    getVisTypes = () => Object.keys(visTypeDisplayNames)

    render() {
        const { anchorEl } = this.state
        const { visualizationType } = this.props

        return (
            <Fragment>
                <Button
                    onClick={this.handleButtonClick}
                    disableRipple
                    disableFocusRipple
                    fullWidth={true}
                    size="small"
                    style={styles.button}
                >
                    <MenuItemIcon iconType={visualizationType} />
                    {visTypeDisplayNames[visualizationType]}
                    <ArrowDropDownIcon style={styles.dropDownArrow} />
                </Button>
                <Menu
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    onClose={this.handleClose}
                    getContentAnchorEl={null}
                    MenuListProps={{
                        style: styles.menu,
                    }}
                >
                    {this.getVisTypes().map(type => (
                        <VisualizationTypeMenuItem
                            key={type}
                            iconType={type}
                            label={visTypeDisplayNames[type]}
                            isSelected={type === visualizationType}
                            styles={styles}
                            onClick={this.handleMenuItemClick(type)}
                        />
                    ))}
                    <div style={styles.clearFix} />
                    <hr style={styles.menuDivider} />
                    <VisualizationTypeMenuItem
                        key={'MAP'}
                        iconType={'MAP'}
                        label={i18n.t('Open as Map')} // TODO: Open as: Map when i18next nsSeparator fixed
                        styles={styles}
                        onClick={this.handleOpenAsMapClick}
                        disabled={!this.props.current}
                    />
                </Menu>
            </Fragment>
        )
    }
}

VisualizationTypeSelector.propTypes = {
    current: PropTypes.object,
    metadata: PropTypes.object,
    ui: PropTypes.object,
    visualizationType: PropTypes.oneOf(Object.keys(visTypeDisplayNames)),
    onTypeSelect: PropTypes.func,
}

VisualizationTypeSelector.contextTypes = {
    baseUrl: PropTypes.string,
}

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
    current: sGetCurrent(state),
    metadata: sGetMetadata(state),
    ui: sGetUi(state),
})

const mapDispatchToProps = dispatch => ({
    onTypeSelect: type => dispatch(acSetUiType(type)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VisualizationTypeSelector)
