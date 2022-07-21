export const RECEIVED_USER = 'RECEIVED_USER'
export const SET_USER_AUTHORITY = 'SET_USER_AUTHORITY'

export const DEFAULT_USER = {
    id: '',
    username: '',
    isSuperuser: false,
    authorities: {},
}

export default (state = DEFAULT_USER, action) => {
    switch (action.type) {
        case RECEIVED_USER: {
            return formatUserObject(action.value)
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

function formatUserObject(userObject) {
    return {
        id: userObject.id,
        username: userObject.username,
        isSuperuser: userObject.authorities.includes('ALL'),
    }
}

// Selectors

export const sGetUser = (state) => state.user

export const sGetUserId = (state) => sGetUser(state).id
export const sGetUsername = (state) => sGetUser(state).username
export const sGetIsSuperuser = (state) => sGetUser(state).isSuperuser
export const sGetUserAuthorities = (state) => sGetUser(state).authorities
