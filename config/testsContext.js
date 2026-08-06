import { render } from '@testing-library/react'
import PropTypes from 'prop-types'
import React from 'react'
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

    Wrapper.propTypes = {
        children: PropTypes.node,
    }

    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    }
}
