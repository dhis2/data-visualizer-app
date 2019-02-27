import React from 'react';
import renderer from 'react-test-renderer';
import { PeriodDimension } from '../PeriodDimension';
import { FIXED_DIMENSIONS } from '../../../../../modules/fixedDimensions';

const peId = FIXED_DIMENSIONS.pe.id;

jest.mock('@dhis2/d2-ui-period-selector-dialog', () => ({
    PeriodSelector: 'mockPeriodSelector',
}));

describe('The Period Dimension component', () => {
    const props = {
        ui: {
            itemsByDimension: {
                [peId]: [],
            },
        },
        metadata: {},
        addMetadata: jest.fn(),
        addUiItems: jest.fn(),
        removeUiItems: jest.fn(),
        setUiItems: jest.fn(),
        context: { d2: {} },
    };

    it('renders correctly', () => {
        const tree = renderer.create(<PeriodDimension {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
