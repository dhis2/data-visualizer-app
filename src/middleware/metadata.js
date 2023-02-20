import { acAddMetadata } from '../actions/metadata.js'

export default ({ dispatch }) =>
    (next) =>
    (action) => {
        if (typeof action.metadata === 'object') {
            if (Array.isArray(action.metadata)) {
                dispatch(
                    acAddMetadata(
                        action.metadata.reduce(
                            (meta, obj) => ({
                                ...meta,
                                ...obj,
                            }),
                            {}
                        )
                    )
                )
            } else {
                dispatch(acAddMetadata(action.metadata))
            }
        }

        next(action)
    }
