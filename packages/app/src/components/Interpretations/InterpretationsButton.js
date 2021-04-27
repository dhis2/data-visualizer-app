import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { IconChevronRight24, IconChevronLeft24 } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'

import { sGetUiRightSidebarOpen } from '../../reducers/ui'
import { sGetCurrent } from '../../reducers/current'
import { acToggleUiRightSidebarOpen } from '../../actions/ui'
import MenuButton from '../MenuButton/MenuButton'
import styles from './styles/InterpretationsButton.module.css'

export const InterpretationsButton = props => (
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

InterpretationsButton.propTypes = {
    id: PropTypes.string,
    rightSidebarOpen: PropTypes.bool,
    onClick: PropTypes.func,
}

const mapStateToProps = state => ({
    rightSidebarOpen: sGetUiRightSidebarOpen(state),
    id: (sGetCurrent(state) || {}).id,
})

const mapDispatchToProps = dispatch => ({
    onClick: () => dispatch(acToggleUiRightSidebarOpen()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InterpretationsButton)
