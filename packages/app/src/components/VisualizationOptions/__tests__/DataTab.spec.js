import React from 'react';
import { shallow } from 'enzyme';
import FormGroup from '@material-ui/core/FormGroup';

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
        };
        shallowDataTab = undefined;
    });

    it('renders a FormGroup containing everything else', () => {
        const wrappingDiv = dataTab()
            .find(FormGroup)
            .first();
        expect(wrappingDiv.children()).toHaveLength(9);
    });

    [
        'CumulativeValues',
        'PercentStackedValues',
        'ShowData',
        'HideEmptyRowItems',
        'RegressionType',
        'SortOrder',
        'AggregationType',
        // TODO find a way to test BaseLine and TargetLine
    ].forEach(component => {
        it(`should render a ${component} component`, () => {
            expect(dataTab().find(component)).toHaveLength(1);
        });
    });
});
