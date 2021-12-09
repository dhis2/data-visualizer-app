export const RECEIVED_USER = 'RECEIVED_USER'
export const SET_USER_AUTHORITY = 'SET_USER_AUTHORITY'

export const DEFAULT_USER = {
    id: '',
    username: '',
    uiLocale: '',
    isSuperuser: false,
    authorities: {},
}

export default (state = DEFAULT_USER, action) => {
    switch (action.type) {
        case RECEIVED_USER: {
            return fromD2ToUserObj(action.value)
        }
        case SET_USER_AUTHORITY: {
            return {
                ...state,
                authorities: {
                    ...state.authorities,
                    ...action.value,
                },
            }
        }
        default:
            return state
    }
}

function fromD2ToUserObj(d2Object) {
    return {
        id: d2Object.id,
        username: d2Object.username,
        uiLocale: d2Object.settings.keyUiLocale,
        isSuperuser: d2Object.authorities.has('ALL'),
    }
}

// Selectors

export const sGetUser = (state) => state.user

export const sGetUserId = (state) => sGetUser(state).id
export const sGetUsername = (state) => sGetUser(state).username
export const sGetIsSuperuser = (state) => sGetUser(state).isSuperuser
export const sGetUiLocale = (state) => sGetUser(state).uiLocale
export const sGetUserAuthorities = (state) => sGetUser(state).authorities
