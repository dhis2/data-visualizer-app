import { shallow } from 'enzyme'
import React from 'react'
import { Dimensions } from '../DimensionsPanel.jsx'
import { DndDimensionsPanel } from '../DndDimensionsPanel.jsx'

jest.mock('@dhis2/app-runtime', () => ({
    useDataEngine: jest.fn(() => ({
        query: Function.prototype,
    })),
}))

jest.mock('@dhis2/analytics', () => ({
    ...jest.requireActual('@dhis2/analytics'),
    useCachedDataQuery: jest.fn(() => ({
        currentUser: {
            settings: {
                DERIVED_USER_SETTINGS_DISPLAY_NAME_PROPERTY: 'displayName',
            },
        },
    })),
    CachedDataQueryProvider: () => <div className="CachedDataQueryProvider" />,
}))

describe('Dimensions component ', () => {
    let shallowDimensions
    let props
    const dimensionsComponent = () => {
        if (!shallowDimensions) {
            shallowDimensions = shallow(<Dimensions {...props} />)
        }
        return shallowDimensions
    }

    beforeEach(() => {
        shallowDimensions = undefined
        props = {
            ui: {
                layout: {},
                type: '',
            },
            itemsByDimension: {},
            axisItemHandler: () => {},
            removeItemHandler: () => {},
            getCurrentAxisId: () => '',
            onDimensionClick: () => {},
        }
    })

    it('renders a div', () => {
        expect(dimensionsComponent().find('div').length).toEqual(1)
    })

    it('renders a div containing everything else', () => {
        const wrappingDiv = dimensionsComponent().find('div').first()

        expect(wrappingDiv.children()).toEqual(dimensionsComponent().children())
    })

    it('renders a DndDimensionsPanel', () => {
        const dimensionsComp = dimensionsComponent()

        expect(dimensionsComp.find(DndDimensionsPanel).length).toEqual(1)
    })
})
