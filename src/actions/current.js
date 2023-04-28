import {
    SET_CURRENT,
    SET_CURRENT_FROM_UI,
    CLEAR_CURRENT,
} from '../reducers/current.js'
import { sGetMetadata } from '../reducers/metadata.js'
import { sGetUi } from '../reducers/ui.js'

export const acSetCurrent = (value) => ({
    type: SET_CURRENT,
    value,
})

export const acClear = () => ({
    type: CLEAR_CURRENT,
})

export const acSetCurrentFromUi = (value) => ({
    type: SET_CURRENT_FROM_UI,
    value,
})

export const tSetCurrentFromUi = () => async (dispatch, getState) => {
    dispatch(
        acSetCurrentFromUi({
            ui: sGetUi(getState()),
            metadata: sGetMetadata(getState()),
        })
    )
}
