export const SET_CONFIG = 'SET_CONFIG'

export const DEFAULT_CONFIG = null

export default (state = DEFAULT_CONFIG, action) => {
    switch (action.type) {
        case SET_CONFIG: {
            return action.value
        }
        default:
            return state
    }
}
