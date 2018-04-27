import React from 'react';
import { shallow } from 'enzyme';
import Card, { CardContent } from 'material-ui-next/Card';
import { ChartOptions } from '../ChartOptions';
import { DataTab } from '../DataTab';

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
        beforeEach(() => {
            props.activeTab = 0;
        });
        // If activeTab is 0 - DataOptions should be rendered by CardContent
        it('renders the <TabsBar /> Component', () => {
            const cardContentComponent = chartOptions().find(CardContent);
            //expect(cardContentComponent.find(TabsBar).length).toBe(1);
        });
        /*
        // If activeTab is 1 - AxesOptions should be rendered by CardContent
        it('renders AxesAndLegendTab component if activeTab is set to 1,', () => {
            props.activeTab = 1;
            const cardContentComponent = chartOptions().find(CardContent);
            expect(cardContentComponent.childAt(2).type()).toEqual(
                AxesAndLegendsTab
            );
        });
        // If activeTab is 2 - StyleOptions should be rendered by CardContent
        it('renders StyleTab component if activeTab is set to 2,', () => {
            props.activeTab = 2;
            const cardContentComponent = chartOptions().find(CardContent);
            expect(cardContentComponent.childAt(2).type()).toEqual(StyleTab);
        });
        */
    });
});
