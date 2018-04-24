import React from 'react';
import { shallow } from 'enzyme';
import { getStubContext } from '../../../config/testsContext';
import StyleTab from '../../options-component/StyleTab';

describe('StyleOptions', () => {
    let props;
    let shallowStyleOptionsComponent;
    const styleOptions = () => {
        if (!shallowStyleOptionsComponent) {
            shallowStyleOptionsComponent = shallow(<StyleTab {...props} />, {
                context: getStubContext(),
            });
        }
        return shallowStyleOptionsComponent;
    };
    beforeEach(() => {
        props = {
            tabContent: {
                noSpace: false,
            },
            onChange: jest.fn(),
        };
        shallowStyleOptionsComponent = undefined;
    });
    // the outermost div contains everything that will be rendered
    it('renders a div as outermost component', () => {
        console.log(styleOptions().children());
    });
});
