import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers/index.js'

const configureStore = (middleware) => {
    // Enable Redux devtools if extension is installed instead of redux-logger
    // const composeEnhancers =
    //     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                  name: 'data-visualizer-app',
              })
            : compose

    if (
        !window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        process.env.NODE_ENV !== 'production'
    ) {
        middleware.push(createLogger())
    }

    return createStore(
        reducer,
        composeEnhancers(applyMiddleware(...middleware))
    )
}

// for testing purposes only
export const setupTestStore = (preloadedState = {}) => {
    return createStore(reducer, preloadedState, applyMiddleware(thunk))
}

export default configureStore
