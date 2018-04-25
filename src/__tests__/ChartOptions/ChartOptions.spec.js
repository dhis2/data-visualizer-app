import React from 'react';
import { shallow, mount } from 'enzyme';
import { createShallow } from 'material-ui-next/test-utils';
import Card, { CardContent } from 'material-ui-next/Card';
import { getStubContext } from '../../../config/testsContext';
import ChartOptions from '../../ChartOptions/ChartOptions';

describe('ChartOptions', () => {
    let props;
    let shallowChartOptions;
    let muiShallow;
    const chartOptions = () => {
        if (!shallowChartOptions) {
            shallowChartOptions = shallow(<ChartOptions {...props} />, {
                context: getStubContext(),
            });
        }
        return shallowChartOptions;
    };
    beforeEach(() => {
        props = {
            activeTab: 0,
            optionsValues: {},
            //classes: undefined,
        };
        shallowChartOptions = undefined;
        muiShallow = createShallow();
    });
    // the outermost div contains everything that will be rendered
    it('renders a <Card /> component', () => {
        const wrapper = shallow(<ChartOptions {...props} />);
        console.log(wrapper);
        // expect(wrapper.find(Card).length).toBeGreaterThan(0);

        console.log(chartOptions().find(Card).length);
        // expect(chartOptions().find(Card).length).toBeGreaterThan(0);
    });
    // the outermost div has a className from ../component-helpers/utils
    /*it('should have a default a class name of d2-ui-chartoptions', () => {
        expect(chartOptions().props().className).toMatch('d2-ui-chartoptions');
    });
    // The className is configureable
    it('should add a custom class name when selector is passed', () => {
        props.selector = 'my-chartoptions';
        expect(chartOptions().props().className).toMatch(
            'd2-ui-chartoptions-my-chartoptions'
        );
    });*/

    // Material-UI v1 Card Component will always be rendered
    /*it('should always render a material-ui v1 Card Component', () => {
        console.log(chartOptions.children());
        //  expect(chartOptions().find(Card).length).toBe(1);
    });
    /*
    // Material-UI CardContent will always be rendyaered
    it('should always render a CardContent Component', () => {
        expect(chartOptions().find(CardContent).length).toBe(1);
    });

    describe('The CardContent Component', () => {
        beforeEach(() => {
            props.activeTab = 0;
        });
        // If activeTab is 0 - DataOptions should be rendered by CardContent
        it('renders the DataTab component if activeTab is set to 0', () => {
            const cardContentComponent = chartOptions().find(CardContent);
            expect(cardContentComponent.childAt(2).type()).toEqual(DataTab);
        });
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
    });
    */
});
