import i18n from '@dhis2/d2-i18n'
import { IconChevronRight24, IconChevronLeft24 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { acToggleUiRightSidebarOpen } from '../../actions/ui.js'
import { sGetCurrent } from '../../reducers/current.js'
import { sGetUiRightSidebarOpen } from '../../reducers/ui.js'
import MenuButton from '../MenuButton/MenuButton.js'
import styles from './styles/InterpretationsButton.module.css'

export const UnconnectedInterpretationsButton = (props) => (
    <MenuButton disabled={!props.id} onClick={props.onClick}>
        {props.rightSidebarOpen ? (
            <div className={styles.iconWrapper}>
                <IconChevronRight24 />
            </div>
        ) : (
            <div className={styles.iconWrapper}>
                <IconChevronLeft24 />
            </div>
        )}
        {i18n.t('Interpretations')}
    </MenuButton>
)

UnconnectedInterpretationsButton.propTypes = {
    id: PropTypes.string,
    rightSidebarOpen: PropTypes.bool,
    onClick: PropTypes.func,
}

const mapStateToProps = (state) => ({
    rightSidebarOpen: sGetUiRightSidebarOpen(state),
    id: (sGetCurrent(state) || {}).id,
})

const mapDispatchToProps = (dispatch) => ({
    onClick: () => dispatch(acToggleUiRightSidebarOpen()),
})

export const InterpretationsButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedInterpretationsButton)
