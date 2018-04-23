import React from 'react';
import { shallow } from 'enzyme';
import Card, { CardContent } from 'material-ui-next/Card';
import { getStubContext } from '../../../config/testsContext';
import ChartOptions from '../../options-component/ChartOptions';
import DataTab from '../../options-component/DataTab';
import AxesAndLegendsTab from '../../options-component/AxesAndLegendsTab';
import StyleTab from '../../options-component/StyleTab';

describe('ChartOptions', () => {
    let props;
    let shallowChartOptionsComponent;
    const chartOptions = () => {
        if (!shallowChartOptionsComponent) {
            shallowChartOptionsComponent = shallow(
                <ChartOptions {...props} />,
                {
                    context: getStubContext(),
                }
            );
        }
        return shallowChartOptionsComponent;
    };
    beforeEach(() => {
        props = {
            activeTab: 0,
            selector: undefined,
            className: undefined, // ?
            onTabChange: jest.fn(),
            optionsValues: {},
            onOptionsChange: jest.fn(),
        };
        shallowChartOptionsComponent = undefined;
    });
    // the outermost div contains everything that will be rendered
    /* it('contains a <Card /> component which renders everything else', () => {
        const card = chartOptions().find(Card);
        const wrappingDiv = card.first();

        expect(wrappingDiv.children()).toEqual(chartOptions().children());
    });*/
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
    it('should always render a material-ui v1 Card Component', () => {
        console.log(chartOptions());
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
