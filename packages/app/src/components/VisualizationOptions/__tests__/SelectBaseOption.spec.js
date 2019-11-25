import React from 'react';
import { shallow } from 'enzyme';

import {
    Checkbox,
    SingleSelectField,
    SingleSelectOption,
} from '@dhis2/ui-core';

import { SelectBaseOption } from '../Options/SelectBaseOption'

describe('DV > Options > SelectBaseOption', () => {
    let props;
    let shallowSelectBaseOption;
    const onChange = jest.fn();
    const onToggle = jest.fn();

    const selectBaseOption = props => {
        shallowSelectBaseOption = shallow(<SelectBaseOption {...props} />)

        return shallowSelectBaseOption
    }

    describe('toggleable', () => {
        beforeEach(() => {
            props = {
                value: '',
                label: 'toggleable test',
                option: {
                    items: [
                        { id: '', label: 'Empty option' },
                        { id: 'opt1', label: 'Option 1' },
                        { id: 'opt2', label: 'Option 2' },
                        { id: 'opt3', label: 'Option 3' },
                    ],
                },
                onChange,
                onToggle,
                toggleable: true,
            };

            shallowSelectBaseOption = undefined;
        });

        it('renders a <Checkbox />', () => {
            expect(selectBaseOption(props).find(Checkbox)).toHaveLength(1);
        });

        it('does not render a <SingleSelectField />', () => {
            expect(
                selectBaseOption(props).find(SingleSelectField)
            ).toHaveLength(0);
        });

        it('does render a <SingleSelectField /> when the checkbox is enabled', () => {
            props.enabled = true;

            const select = selectBaseOption(props);
            expect(select.find(SingleSelectField)).toHaveLength(1);
            expect(select.find(Checkbox).props().checked).toBe(true);
        });
    });

    describe('non toggleable', () => {
        beforeEach(() => {
            props = {
                value: '',
                option: {
                    items: [
                        { id: '', label: 'Empty option' },
                        { id: 'opt1', label: 'Option 1' },
                        { id: 'opt2', label: 'Option 2' },
                        { id: 'opt3', label: 'Option 3' },
                    ],
                },
                onChange,
                onToggle,
                toggleable: false,
            };

            shallowSelectBaseOption = undefined;
        });

        it('renders a <SingleSelectField />', () => {
            expect(
                selectBaseOption(props).find(SingleSelectField)
            ).toHaveLength(1);
        });

        it('renders the list of options', () => {
            const options = selectBaseOption(props).find(SingleSelectOption);

            options.forEach((item, index) => {
                const option = props.option.items[index];

                expect(item.props().value).toEqual(option.id);
                expect(item.props().label).toEqual(option.label);
            });
        });

        it('should trigger the onChange callback on select change', () => {
            const select = selectBaseOption(props).find(SingleSelectField);

            select.simulate('change', {
                selected: {
                    value: props.option.items.find(item => item.id === 'opt2'),
                },
            });

            expect(onChange).toHaveBeenCalled();
        });
    });
});
