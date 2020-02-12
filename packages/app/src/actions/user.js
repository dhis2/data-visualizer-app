import { RECEIVED_USER, SET_USER_AUTHORITY } from '../reducers/user'
import { onError } from './index'

import { apiFetchUserAuthority } from '../api/user'

export const acReceivedUser = value => ({
    type: RECEIVED_USER,
    value,
})

export const acSetUserAuthority = value => ({
    type: SET_USER_AUTHORITY,
    value,
})

export const tLoadUserAuthority = authorityKey => async (
    dispatch,
    getState,
    engine
) => {
    const onSuccess = response => {
        dispatch(acSetUserAuthority({ [authorityKey]: response.authority }))
    }

    try {
        return onSuccess(await apiFetchUserAuthority(engine, authorityKey))
    } catch (err) {
        onError('tLoadUserAuthority', err)
    }
}
