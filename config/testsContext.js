import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

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

export const renderWithProviders = (ui, store, renderOptions = {}) => {
    const Wrapper = ({ children }) => (
        <Provider store={store}>{children}</Provider>
    )

    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    }
}
