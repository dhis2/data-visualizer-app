import {
    COLOR_SET_BRIGHT,
    LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM,
    VIS_TYPE_COLUMN,
} from '@dhis2/analytics'
import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { acSetUiOptions } from '../../../../../actions/ui.js'
import rootReducer from '../../../../../reducers/index.js'
import { DEFAULT_UI } from '../../../../../reducers/ui.js'
import ColourByControl from '../ColourByControl.jsx'

const getStore = (options = {}) =>
    createStore(rootReducer, {
        ui: {
            ...DEFAULT_UI,
            type: VIS_TYPE_COLUMN,
            layout: { columns: ['dx'], rows: ['pe'], filters: [] },
            itemsByDimension: { dx: ['a', 'b'] },
            options: { ...DEFAULT_UI.options, ...options },
        },
    })

const renderControl = (store, props = { showLegend: true, showFill: true }) =>
    render(
        <Provider store={store}>
            <ColourByControl {...props} />
        </Provider>
    )

describe('ColourByControl', () => {
    it('initialises a new chart to the default palette with item colours on', () => {
        const store = getStore()
        renderControl(store)

        const { options } = store.getState().ui
        expect(options.colorMode).toBe('PALETTE')
        expect(options.colorPalette).toBe('DEFAULT')
        expect(options.useItemColors).toBe(true)
        expect(
            screen.getByLabelText(
                'Use automatic data item colours where available'
            )
        ).toBeChecked()
    })

    it('does not re-initialise a chart that already has colour options', () => {
        const store = getStore({
            colorMode: 'SINGLE',
            singleColor: '#00ff00',
        })
        renderControl(store)

        expect(store.getState().ui.options.colorMode).toBe('SINGLE')
        expect(screen.getByText('#00ff00')).toBeInTheDocument()
        expect(
            screen.queryByText(
                'Use automatic data item colours where available'
            )
        ).not.toBeInTheDocument()
    })

    it('switches mode without touching series overrides', () => {
        const series = [{ dimensionItem: 'a', color: '#ff0000' }]
        const store = getStore({
            colorMode: 'PALETTE',
            colorPalette: COLOR_SET_BRIGHT,
            series,
        })
        renderControl(store)

        fireEvent.click(screen.getByText('Single colour'))
        expect(store.getState().ui.options.colorMode).toBe('SINGLE')
        fireEvent.click(screen.getByText('Palette'))
        expect(store.getState().ui.options.colorMode).toBe('PALETTE')
        expect(store.getState().ui.options.colorPalette).toBe(COLOR_SET_BRIGHT)
        expect(store.getState().ui.options.series).toEqual(series)
    })

    it('turns the legend on and off from the segmented control', () => {
        const store = getStore({ colorMode: 'PALETTE' })
        renderControl(store)

        fireEvent.click(screen.getByText('Legend'))
        expect(store.getState().ui.options.legend.strategy).toBe(
            LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM
        )
        expect(screen.queryByText('Fill')).not.toBeInTheDocument()

        fireEvent.click(screen.getByText('Palette'))
        expect(store.getState().ui.options.legend.strategy).toBe('FIXED')
    })

    it('hides Legend and Fill when not supported', () => {
        renderControl(getStore({ colorMode: 'PALETTE' }), {
            showLegend: false,
            showFill: false,
        })

        expect(screen.queryByText('Legend')).not.toBeInTheDocument()
        expect(screen.queryByText('Fill')).not.toBeInTheDocument()
    })

    it('offers By axis only for multi-axis charts, or when already selected', () => {
        const { unmount } = renderControl(getStore({ colorMode: 'PALETTE' }))
        fireEvent.click(screen.getByTestId('colour-palette-select-content'))
        expect(screen.queryByText('By axis')).not.toBeInTheDocument()
        unmount()

        renderControl(
            getStore({ colorMode: 'PALETTE', colorPalette: 'BY_AXIS' })
        )
        expect(screen.getByText('By axis')).toBeInTheDocument()
    })
    it('initialises again when another chart is loaded while the tab is open', () => {
        const store = getStore({ colorMode: 'SINGLE' })
        renderControl(store)

        act(() => {
            store.dispatch(acSetUiOptions({ colorMode: undefined }))
        })

        expect(store.getState().ui.options.colorMode).toBe('PALETTE')
    })
})
