import React from 'react';
import { shallow } from 'enzyme';
import { VisualizationOptions } from '../VisualizationOptions';
import DataTab from '../DataTab';
import TabsBar from '../TabsBar';

describe('VisualizationOptions', () => {
    let props;
    let shallowVisualizationOptions;
    const options = () => {
        if (!shallowVisualizationOptions) {
            shallowVisualizationOptions = shallow(
                <VisualizationOptions {...props} />
            );
        }
        return shallowVisualizationOptions;
    };
    beforeEach(() => {
        props = {
            activeTab: 0,
            optionsValues: {},
            classes: {},
        };
        shallowVisualizationOptions = undefined;
    });

    it('renders the <TabsBar /> component', () => {
        expect(options().find(TabsBar).length).toBe(1);
    });
    it('renders the <DataTab /> component if activeTab is set to 0,', () => {
        expect(options().find(DataTab).length).toBe(1);
    });
});
