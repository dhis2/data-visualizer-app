import { InterpretationsAndDetailsToggler } from '@dhis2/analytics'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { acToggleUiRightSidebarOpen } from '../../actions/ui.js'
import { sGetCurrent } from '../../reducers/current.js'
import { sGetUiRightSidebarOpen } from '../../reducers/ui.js'

export const InterpretationsButton = () => {
    const isShowing = useSelector(sGetUiRightSidebarOpen)
    const current = useSelector(sGetCurrent)
    const isDisabled = !current?.id
    const dispatch = useDispatch()
    const onClick = () => {
        dispatch(acToggleUiRightSidebarOpen())
    }

    return (
        <InterpretationsAndDetailsToggler
            disabled={isDisabled}
            onClick={onClick}
            isShowing={isShowing}
        />
    )
}
