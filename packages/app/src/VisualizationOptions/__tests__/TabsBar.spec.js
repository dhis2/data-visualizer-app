import React from 'react';
import { shallow } from 'enzyme';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import { TabsBar } from '../TabsBar';

describe('The TabsBar', () => {
    let props;
    let tabsBarComponent;
    const tabsBar = () => {
        if (!tabsBarComponent) {
            tabsBarComponent = shallow(<TabsBar {...props} />);
        }
        return tabsBarComponent;
    };
    beforeEach(() => {
        props = {
            activeTab: 1,
            onChange: jest.fn(),
            classes: {},
        };
        tabsBarComponent = undefined;
    });
    it('renders an <AppBar />', () => {
        expect(tabsBar().find(AppBar).length).toEqual(1);
    });
    it('renders an <AppBar /> component containing everything else', () => {
        const appBarWrapper = tabsBar()
            .find(AppBar)
            .first();

        expect(appBarWrapper.children()).toEqual(tabsBar().children());
    });
    it('renders 1 <Tabs /> and 3 <Tab /> components', () => {
        const tabs = tabsBar().find(Tabs);
        const tab = tabsBar().find(Tab);
        expect(tabs.length).toEqual(1);
        expect(tab.length).toEqual(3);
    });
    it('changes tab as when the prop.activeTab value is changed', () => {
        const newValue = 2;
        const tabs = tabsBar().find(Tabs);

        tabs.simulate('change', newValue);

        expect(props.onChange).toHaveBeenCalledTimes(1);
    });
});
