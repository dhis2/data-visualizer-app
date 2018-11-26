import React from 'react';
import { shallow } from 'enzyme';
import FormGroup from '@material-ui/core/FormGroup';

import { DataTab } from '../DataTab';

import CumulativeValues from '../Options/CumulativeValues';
import PercentStackedValues from '../Options/PercentStackedValues';
import ShowData from '../Options/ShowData';
import HideEmptyRowItems from '../Options/HideEmptyRowItems';
import RegressionType from '../Options/RegressionType';
import TargetLine from '../Options/TargetLine';
import BaseLine from '../Options/BaseLine';
import SortOrder from '../Options/SortOrder';
import AggregationType from '../Options/AggregationType';

describe('The DataTab component', () => {
    const props = { classes: {} };
    let shallowDataTab;

    const dataTab = () => {
        if (!shallowDataTab) {
            shallowDataTab = shallow(<DataTab {...props} />);
        }
        return shallowDataTab;
    };

    beforeEach(() => {
        shallowDataTab = undefined;
    });

    it('renders a FormGroup containing everything else', () => {
        const wrappingDiv = dataTab()
            .find(FormGroup)
            .first();
        expect(wrappingDiv.children()).toHaveLength(9);
    });

    [
        CumulativeValues,
        PercentStackedValues,
        ShowData,
        HideEmptyRowItems,
        RegressionType,
        TargetLine,
        BaseLine,
        SortOrder,
        AggregationType,
    ].forEach(component => {
        it(`should render a ${component} component`, () => {
            expect(dataTab().find(component)).toHaveLength(1);
        });
    });
});
