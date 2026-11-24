import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import {
    APPROVAL_LEVEL_OPTION_AUTH,
    UnconnectedApprovalLevel as ApprovalLevel,
} from '../Options/ApprovalLevel.jsx'

const mockUseCachedDataQuery = jest.fn()

jest.mock('@dhis2/analytics', () => ({
    ...jest.requireActual('@dhis2/analytics'),
    useCachedDataQuery: () => mockUseCachedDataQuery(),
}))

jest.mock('@dhis2/app-runtime', () => ({
    ...jest.requireActual('@dhis2/app-runtime'),
    useDataEngine: () => ({ query: jest.fn() }),
}))

const clearButtonTestId = 'dhis2-uicore-singleselect-clear'

describe('DV > Options > ApprovalLevel', () => {
    const onChange = jest.fn()

    beforeEach(() => {
        onChange.mockClear()
        mockUseCachedDataQuery.mockReturnValue({
            currentUser: { authorities: [APPROVAL_LEVEL_OPTION_AUTH] },
            systemSettings: { keyIgnoreAnalyticsApprovalYearThreshold: 0 },
        })
    })

    test('renders nothing when the user lacks the authority', () => {
        mockUseCachedDataQuery.mockReturnValue({
            currentUser: { authorities: [] },
            systemSettings: { keyIgnoreAnalyticsApprovalYearThreshold: 0 },
        })

        const { container } = render(
            <ApprovalLevel value={{}} onChange={onChange} />
        )

        expect(container).toBeEmptyDOMElement()
    })

    test('does not render a clear button when no level is selected', () => {
        render(<ApprovalLevel value={{}} onChange={onChange} />)

        expect(screen.getByText('Data approved at level')).toBeInTheDocument()
        expect(
            screen.getByText(
                'This selection is not saved with the visualization'
            )
        ).toBeInTheDocument()
        expect(screen.queryByTestId(clearButtonTestId)).not.toBeInTheDocument()
    })

    test('clears the selected level when the clear button is clicked', () => {
        render(
            <ApprovalLevel
                value={{ id: 'level1', displayName: 'Chiefdom' }}
                onChange={onChange}
            />
        )

        expect(screen.getByText('Chiefdom')).toBeInTheDocument()

        fireEvent.click(screen.getByTestId(clearButtonTestId))

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenCalledWith(undefined)
    })
})
