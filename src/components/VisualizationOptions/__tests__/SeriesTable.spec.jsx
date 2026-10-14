import {
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
    LEGEND_DISPLAY_STYLE_FILL,
    VIS_TYPE_COLUMN,
} from '@dhis2/analytics'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../../../reducers/index.js'
import { DEFAULT_UI } from '../../../reducers/ui.js'
import SeriesTable from '../Options/SeriesTable.jsx'

const getStore = () =>
    createStore(rootReducer, {
        ui: {
            ...DEFAULT_UI,
            type: VIS_TYPE_COLUMN,
            layout: { columns: ['dx'], rows: ['pe'], filters: [] },
            itemsByDimension: { dx: ['a', 'b'] },
            options: {
                ...DEFAULT_UI.options,
                legend: {
                    strategy: LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
                    style: LEGEND_DISPLAY_STYLE_FILL,
                },
            },
        },
    })

describe('SeriesTable colours', () => {
    it('stays in Legend mode when switching to "Select a legend" before a set is picked', () => {
        render(
            <Provider store={getStore()}>
                <SeriesTable showColours showModeSwitch showFill />
            </Provider>
        )

        fireEvent.click(screen.getByLabelText('Select a legend'))

        expect(screen.queryByText('Colour')).not.toBeInTheDocument()
        expect(screen.getByLabelText('Select a legend')).toBeInTheDocument()
    })

    it('shows a colour column for fixed items in Static mode', () => {
        render(
            <Provider store={getStore()}>
                <SeriesTable showColours showModeSwitch showFill />
            </Provider>
        )

        fireEvent.click(screen.getByText('Static'))

        expect(screen.getByText('Colour')).toBeInTheDocument()
        expect(screen.getAllByTestId('series-colour-button')).toHaveLength(2)
    })

    it('offers a palette instead of per-item colours for relative series', () => {
        const store = getStore()
        store.getState().ui.layout = {
            columns: ['pe'],
            rows: ['dx'],
            filters: [],
        }
        store.getState().ui.itemsByDimension = { pe: ['LAST_12_MONTHS'] }
        store.getState().ui.options.legend = {}

        render(
            <Provider store={store}>
                <SeriesTable showColours showModeSwitch showFill />
            </Provider>
        )

        expect(screen.getByText('Palette')).toBeInTheDocument()
        expect(screen.queryByText('Colour')).not.toBeInTheDocument()
        expect(screen.queryAllByTestId('series-colour-button')).toHaveLength(0)
    })

    it('keeps "No Series options" for types without colours (gauge, pivot table)', () => {
        render(
            <Provider store={getStore()}>
                <SeriesTable />
            </Provider>
        )

        expect(screen.getByText('No Series options')).toBeInTheDocument()
    })
})
