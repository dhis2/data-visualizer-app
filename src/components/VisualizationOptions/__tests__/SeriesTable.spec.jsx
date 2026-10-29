import {
    COLOR_SET_BRIGHT,
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

const getStore = (options = {}, layout, itemsByDimension) =>
    createStore(rootReducer, {
        ui: {
            ...DEFAULT_UI,
            type: VIS_TYPE_COLUMN,
            layout: layout || { columns: ['dx'], rows: ['pe'], filters: [] },
            itemsByDimension: itemsByDimension || { dx: ['a', 'b'] },
            options: {
                ...DEFAULT_UI.options,
                colorMode: 'PALETTE',
                colorPalette: COLOR_SET_BRIGHT,
                useItemColors: false,
                ...options,
            },
        },
    })

const renderTable = (store, props = { showColours: true }) =>
    render(
        <Provider store={store}>
            <SeriesTable {...props} />
        </Provider>
    )

describe('SeriesTable overrides', () => {
    it('shows each series with its inherited palette colour', () => {
        renderTable(getStore())

        expect(screen.getAllByText('Color set')).toHaveLength(2)
        const swatches = screen
            .getAllByTestId('series-colour-button')
            .map((button) => button.firstChild.style.backgroundColor)
        expect(swatches).toHaveLength(2)
        expect(swatches[0]).not.toBe('')
        expect(
            screen.queryByLabelText(/^Reset colour for/)
        ).not.toBeInTheDocument()
    })

    it('shows the single colour as the source in Single colour mode', () => {
        renderTable(getStore({ colorMode: 'SINGLE', singleColor: '#00ff00' }))

        expect(screen.getAllByText('Single colour')).toHaveLength(2)
    })

    it('removes an override with the reset button', () => {
        const store = getStore({
            series: [
                { dimensionItem: 'a', color: '#ff0000' },
                { dimensionItem: 'b' },
            ],
        })
        renderTable(store)

        expect(screen.getByText('#ff0000')).toBeInTheDocument()
        fireEvent.click(screen.getAllByLabelText(/^Reset colour for/)[0])

        const items = store.getState().ui.options.series
        expect(items.find((item) => item.dimensionItem === 'a').color).toBe(
            undefined
        )
        expect(screen.getAllByText('Color set')).toHaveLength(2)
    })

    it('shows "Set by legend" and no colour buttons in legend mode', () => {
        renderTable(
            getStore({
                legend: {
                    strategy: LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
                    style: LEGEND_DISPLAY_STYLE_FILL,
                },
            })
        )

        expect(screen.getAllByText('Set by legend')).toHaveLength(2)
        expect(screen.queryAllByTestId('series-colour-button')).toHaveLength(0)
    })

    it('hides per-item columns for relative series and explains why', () => {
        renderTable(
            getStore(
                {},
                { columns: ['pe'], rows: ['dx'], filters: [] },
                { pe: ['LAST_12_MONTHS'] }
            ),
            { showColours: true, showTypeOptions: true, showAxisOptions: true }
        )

        expect(
            screen.getByText(/colours follow the chart setting in order/)
        ).toBeInTheDocument()
        expect(screen.queryAllByTestId('series-colour-button')).toHaveLength(0)
    })

    it('keeps "No Series options" for types without colours (gauge, pivot table)', () => {
        renderTable(getStore(), {})

        expect(screen.getByText('No Series options')).toBeInTheDocument()
    })

    it('no longer shows the mode switch, Apply colours or Fill', () => {
        renderTable(getStore())

        expect(screen.queryByText('Colour by')).not.toBeInTheDocument()
        expect(screen.queryByText(/Apply colours/)).not.toBeInTheDocument()
        expect(screen.queryByText('Fill')).not.toBeInTheDocument()
    })
})
