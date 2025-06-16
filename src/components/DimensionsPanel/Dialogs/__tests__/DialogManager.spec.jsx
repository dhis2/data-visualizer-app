import * as analytics from '@dhis2/analytics'
import { screen, fireEvent, act } from '@testing-library/react'
import React from 'react'
import { renderWithProviders } from '../../../../../config/testsContext.js'
import { setupTestStore } from '../../../../configureStore.js'
import { DEFAULT_UI } from '../../../../reducers/ui.js'
import DialogManager from '../DialogManager.jsx'

jest.mock('@dhis2/analytics', () => ({
    ...jest.requireActual('@dhis2/analytics'),
    DataDimension: () => <div data-test="DataDimension" />,
    DynamicDimension: () => <div data-test="DynamicDimension" />,
    PeriodDimension: () => <div data-test="PeriodDimension" />,
    OrgUnitDimension: () => <div data-test="OrgUnitDimension" />,
    apiFetchRecommendedIds: jest.fn(() => Promise.resolve(['mockId'])),
}))

describe('DialogManager (connected)', () => {
    let store
    let initialState

    beforeEach(() => {
        jest.clearAllMocks()
        initialState = {
            settings: {
                displayNameProperty: 'displayName',
                settings: {},
            },
            ui: {
                ...DEFAULT_UI,
                activeModalDialog: null,
                itemsByDimension: {
                    dx: ['test'],
                    ou: [],
                    pe: [],
                },
                parentGraphMap: {},
                type: 'BAR',
                dimensionIdsInLayout: [],
                itemsByAttribute: {},
            },
        }
    })

    it('renders a closed dialog', () => {
        store = setupTestStore(initialState)
        renderWithProviders(<DialogManager dataEngine={{}} />, store)
        expect(screen.queryByTestId('DataDimension')).not.toBeInTheDocument()
        expect(screen.queryByTestId('OrgUnitDimension')).not.toBeInTheDocument()
        expect(screen.queryByTestId('PeriodDimension')).not.toBeInTheDocument()
    })

    it('renders the DataDimension content in dialog', () => {
        store = setupTestStore({
            ...initialState,
            ui: {
                ...initialState.ui,
                activeModalDialog: 'dx',
            },
        })
        renderWithProviders(<DialogManager dataEngine={{}} />, store)
        expect(screen.getByTestId('DataDimension')).toBeInTheDocument()
    })

    it('renders the OrgUnitDimension content in dialog', () => {
        store = setupTestStore({
            ...initialState,
            ui: {
                ...initialState.ui,
                activeModalDialog: 'ou',
            },
        })
        renderWithProviders(<DialogManager dataEngine={{}} />, store)
        expect(
            screen.getByRole('heading', {
                level: 1,
                name: /Organisation unit/i,
            })
        ).toBeInTheDocument()
        expect(
            screen.queryByRole('heading', {
                level: 1,
                name: /Period/i,
            })
        ).not.toBeInTheDocument()
    })

    it('renders the PeriodDimension content in dialog', () => {
        store = setupTestStore({
            ...initialState,
            ui: {
                ...initialState.ui,
                activeModalDialog: 'pe',
            },
        })
        renderWithProviders(<DialogManager dataEngine={{}} />, store)
        expect(
            screen.getByRole('heading', {
                level: 1,
                name: /Period/i,
            })
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                level: 1,
                name: /Organisation unit/i,
            })
        ).not.toBeInTheDocument()
    })

    it('sets the recommended Ids (with debounced delay) when a change in dx (Data) or ou (Organisation Unit) occurs', async () => {
        jest.useFakeTimers()
        // 1. Setup initial state
        store = setupTestStore({
            ...initialState,
            ui: {
                ...initialState.ui,
                itemsByDimension: {
                    ...initialState.ui.itemsByDimension,
                    dx: ['DX-A'],
                    ou: ['OU-A'],
                },
            },
        })
        // jest.spyOn(store, 'dispatch')
        renderWithProviders(<DialogManager dataEngine={{}} />, store)

        // 2. Dispatch an action that changes itemsByDimension.dx
        act(() => {
            store.dispatch({
                type: 'SET_UI_ITEMS',
                value: { dimensionId: 'dx', itemIds: ['DX-A', 'DX-B'] },
            })
            jest.advanceTimersByTime(1001)
        })

        // Advance timers to flush debounce
        act(() => {
            jest.advanceTimersByTime(1001)
        })

        // Await any pending promises
        await act(async () => {
            await Promise.resolve()
        })

        expect(analytics.apiFetchRecommendedIds).toHaveBeenCalledWith(
            expect.anything(),
            ['DX-A', 'DX-B'],
            expect.anything()
        )
    })

    it('does not update recommendedIds if other selected ids are updated', async () => {
        jest.useFakeTimers()
        store = setupTestStore(initialState)
        jest.spyOn(store, 'dispatch')
        renderWithProviders(<DialogManager dataEngine={{}} />, store)
        // No change in dxIds or ouIds, so setRecommendedIds should not be called
        act(() => {
            jest.advanceTimersByTime(1001)
        })
        // setRecommendedIds is not dispatched
        const calls = store.dispatch.mock.calls.map(([action]) => action)
        const wasSetRecommendedIdsDispatched = calls.some(
            (action) => action.type === 'SET_RECOMMENDED_IDS'
        )
        expect(wasSetRecommendedIdsDispatched).toBe(false)
        jest.useRealTimers()
    })

    it('dispatches action to close modal when HideButton is clicked', () => {
        store = setupTestStore({
            ...initialState,
            ui: {
                ...initialState.ui,
                activeModalDialog: 'dx',
            },
        })
        jest.spyOn(store, 'dispatch')
        renderWithProviders(<DialogManager dataEngine={{}} />, store)
        fireEvent.click(
            screen.getByTestId('dialog-manager-modal-action-cancel')
        )
        const calls = store.dispatch.mock.calls.map(([action]) => action)
        const wasChangeDialogDispatched = calls.some(
            (action) =>
                typeof action === 'object' &&
                action.type === 'SET_UI_ACTIVE_MODAL_DIALOG' &&
                action.value === null
        )
        expect(wasChangeDialogDispatched).toBe(true)
    })
})
