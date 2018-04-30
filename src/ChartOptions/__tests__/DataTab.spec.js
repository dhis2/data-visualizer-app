import React from 'react';
import { shallow } from 'enzyme';
import { DataTab } from '../DataTab';

describe('The DataTab component', () => {
    let props;
    let shallowDataTab;
    const dataTab = () => {
        if (!shallowDataTab) {
            shallowDataTab = shallow(<DataTab {...props} />);
        }
        return shallowDataTab;
    };
    beforeEach(() => {
        props = {
            classes: {},
            onChange: jest.fn(),
            tabContent: {
                showValues: false,
                useCumululative: false,
                useStacked: false,
                category: '',
                trendLine: '',
                targetLineValue: '',
                targetLineTitle: '',
                baseLineValue: '',
                baseLineTitle: '',
                sortOrder: '',
                aggregation: '',
            },
        };
        shallowDataTab = undefined;
    });
    it('renders a div', () => {
        expect(dataTab().find('div').length).toBe(1);
    });
    it('renders a div containing everything else', () => {
        const wrappingDiv = dataTab()
            .find('div')
            .first();
        expect(wrappingDiv.children()).toEqual(dataTab().children());
    });
});
