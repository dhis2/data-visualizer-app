import React from 'react';
import { shallow } from 'enzyme';
import Card, { CardContent } from 'material-ui-next/Card';
import { ChartOptions } from '../ChartOptions';
import DataTab from '../DataTab';
import TabsBar from '../TabsBar';
import Button from 'material-ui-next/Button';

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
    it('renders a <Card /> component', () => {
        expect(chartOptions().find(Card).length).toBe(1);
    });

    it('renders a <Card /> component containing everything else', () => {
        const wrappingCard = chartOptions()
            .find(Card)
            .first();
        expect(wrappingCard.children()).toEqual(chartOptions().children());
    });
    it('renders a <CardContent /> Component', () => {
        expect(chartOptions().find(CardContent).length).toEqual(1);
    });
    describe('The CardContent Component', () => {
        it('renders the <TabsBar /> component', () => {
            expect(chartOptions().find(TabsBar).length).toBe(1);
        });
        it('renders the <DataTab /> component if activeTab is set to 0,', () => {
            const cardContentComponent = chartOptions().find(CardContent);
            expect(cardContentComponent.find(DataTab).length).toBe(1);
        });
        it('renders a Button component', () => {
            const cardContentComponent = chartOptions().find(CardContent);
            expect(cardContentComponent.childAt(3).type()).toEqual(Button);
        });
    });
});
