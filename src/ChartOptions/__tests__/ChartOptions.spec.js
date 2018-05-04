import React from 'react';
import { shallow } from 'enzyme';
import { ChartOptions } from '../ChartOptions';
import DataTab from '../DataTab';
import TabsBar from '../TabsBar';
import Button from 'material-ui/Button';

describe('ChartOptions', () => {
    let props;
    let shallowChartOptions;
    const chartOptions = () => {
        if (!shallowChartOptions) {
            shallowChartOptions = shallow(<ChartOptions {...props} />);
        }
        return shallowChartOptions;
    };
    beforeEach(() => {
        props = {
            activeTab: 0,
            optionsValues: {},
            classes: {},
        };
        shallowChartOptions = undefined;
    });

    it('renders the <TabsBar /> component', () => {
        expect(chartOptions().find(TabsBar).length).toBe(1);
    });
    it('renders the <DataTab /> component if activeTab is set to 0,', () => {
        expect(chartOptions().find(DataTab).length).toBe(1);
    });
});
