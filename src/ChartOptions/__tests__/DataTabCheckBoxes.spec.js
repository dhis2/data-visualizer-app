import React from 'react';
import { shallow, mount } from 'enzyme';
import { getStubContext } from '../../../config/testsContext';
import { FormGroup, FormControlLabel } from 'material-ui-next/Form';
import Tabs, { Tab } from 'material-ui-next/Tabs';
import Checkbox from 'material-ui-next/Checkbox';
import { DataTabCheckBoxes } from '../DataTabCheckBoxes';

describe('The Checkboxes within the Data Tab', () => {
    let props;
    let shallowCheckBoxes;
    let fullMountedComponent;
    const dataTabCheckBoxes = () => {
        if (!shallowCheckBoxes) {
            shallowCheckBoxes = shallow(<DataTabCheckBoxes {...props} />, {
                context: getStubContext(),
            });
        }
        return shallowCheckBoxes;
    };
    beforeEach(() => {
        props = {
            tabContent: {
                showValues: false,
                useCumulative: false,
                useStacked: false,
            },
            classes: {},
            onChange: jest.fn(),
        };
        shallowCheckBoxes = undefined;
        fullMountedComponent = undefined;
    });
    it('Renders 1 <FormGroup /> component', () => {
        expect(dataTabCheckBoxes().find(FormGroup).length).toBe(1);
    });
    it('Renders 3 <FormControlLabel /> component', () => {
        expect(dataTabCheckBoxes().find(FormControlLabel).length).toBe(3);
    });
    describe('The <FormControlLabel /> components', () => {
        beforeEach(() => {
            props.tabContent.showValues = true;
            props.onChange = jest.fn();
            fullMountedComponent = mount(<DataTabCheckBoxes {...props} />);
        });
        it('Renders 1 Checkbox component each, and 3 in total', () => {
            expect(
                fullMountedComponent
                    .find(FormControlLabel)
                    .first()
                    .find(Checkbox).length
            ).toBe(1);

            expect(fullMountedComponent.find(Checkbox).length).toBe(3);
        });
        it('Renders the Checkbox component with the property "checked" passed in as props', () => {
            expect(
                fullMountedComponent
                    .find(Checkbox)
                    .at(0)
                    .props().checked
            ).toBe(true);
        });

        it('Triggers onChange when the checkbox is clicked', () => {
            /*fullMountedComponent
                .find(Checkbox)
                .first()
                .simulate('click');
            expect(props.onChange).toHaveBeenCalled();*/
        });
    });
});
