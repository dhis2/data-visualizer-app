import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupTestStore } from '../src/configureStore.js'

export function getStubContext() {
    return {
        i18n: {
            t: () => {},
        },
        store: {
            dispatch: () => {},
        },
    }
}

export const renderWithProviders = (ui, extendedRenderOptions = {}) => {
    const {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupTestStore(preloadedState),
        ...renderOptions
    } = extendedRenderOptions

    const Wrapper = ({ children }) => (
        <Provider store={store}>{children}</Provider>
    )

    // Return an object with the store and all of RTL's query functions
    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    }
}
