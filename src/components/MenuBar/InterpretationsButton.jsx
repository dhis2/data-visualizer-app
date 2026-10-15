import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { acToggleUiRightSidebarOpen } from '../../actions/ui.js'
import { sGetCurrent } from '../../reducers/current.js'
import { sGetUiRightSidebarOpen } from '../../reducers/ui.js'
import styles from './MenuBar.module.css'

const OpenIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="1.5" y="1.5" width="13" height="13" rx="1.5" stroke="currentColor" />
        <rect x="9" y="2" width="1" height="12" fill="currentColor" />
        <path d="M7 6V10L4 8L7 6Z" fill="currentColor" />
    </svg>
)

const CloseIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="1.5" y="1.5" width="13" height="13" rx="1.5" stroke="currentColor" />
        <rect x="9" y="2" width="1" height="12" fill="currentColor" />
        <rect x="10" y="2" width="4" height="12" fill="currentColor" fillOpacity="0.2" />
        <path d="M4 10V6L7 8L4 10Z" fill="currentColor" />
    </svg>
)

export const InterpretationsButton = () => {
    const isShowing = useSelector(sGetUiRightSidebarOpen)
    const current = useSelector(sGetCurrent)
    const isDisabled = !current?.id
    const dispatch = useDispatch()
    const onClick = () => {
        dispatch(acToggleUiRightSidebarOpen())
    }

    return (
        <button
            className={styles.iconButton}
            disabled={isDisabled}
            onClick={onClick}
        >
            {isShowing ? <CloseIcon /> : <OpenIcon />}
        </button>
    )
}
