// import React from 'react';
// import { shallow } from 'enzyme';

// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogActions from '@material-ui/core/DialogActions';

// import { AxisSetup } from '../AxisSetup';
// import { axis1, axis2 } from '../constants';

// describe('AxisSetup component', () => {
//     let props;
//     let shallowComponent;

//     const axisSetupComponent = () => {
//         if (!shallowComponent) {
//             shallowComponent = shallow(<AxisSetup {...props} />);
//         }
//         return shallowComponent;
//     };

//     beforeEach(() => {
//         props = {
//             isOpened: true,
//             items: [
//                 { id: 'fs23wfq', name: 'ANC 1 Coverage', axis: axis1 },
//                 { id: 'qwe23ecs', name: 'ANC 3 Coverage', axis: axis1 },
//             ],
//             classes: {},
//             onUpdateClick: jest.fn(),
//             onCancelClick: jest.fn(),
//         };
//         shallowComponent = undefined;
//     });

//     it('renders static content', () => {
//         const component = axisSetupComponent();

//         expect(component.find(DialogTitle).exists()).toBeTruthy();
//         expect(component.find(DialogContent).exists()).toBeTruthy();
//         expect(component.find(DialogActions).exists()).toBeTruthy();
//     });

//     it('renders items from props', () => {
//         const component = axisSetupComponent();
//         const { items } = props;

//         items.forEach(item => {
//             expect(component.contains(item.name)).toBeTruthy();
//         });
//     });

//     it('calls onUpdateClick function with correct items as argument', () => {
//         // define items again to ensure all items have axis === axis1
//         props.items = [
//             { id: 'fs23wfq', name: 'ANC 1 Coverage', axis: axis1 },
//             { id: 'qwe23ecs', name: 'ANC 3 Coverage', axis: axis1 },
//         ];
//         const component = axisSetupComponent();

//         props.items.forEach(item => {
//             // simulate axis change click (choosing axis2)
//             component.instance().onAxisChange(item, axis2);
//         });

//         const dialogActions = component.find(DialogActions);
//         const updateButton = dialogActions.childAt(1);

//         updateButton.simulate('click');

//         expect(props.onUpdateClick).toBeCalledWith([
//             { id: 'fs23wfq', name: 'ANC 1 Coverage', axis: axis2 },
//             { id: 'qwe23ecs', name: 'ANC 3 Coverage', axis: axis2 },
//         ]);
//     });

//     it('updates items on prop update', () => {
//         const component = axisSetupComponent();
//         const { items } = props;
//         const newItem = {
//             id: 'qwe213csd',
//             name: 'Some new data element',
//             axis: axis1,
//         };
//         const newItems = [...props.items, newItem];

//         items.forEach(item => {
//             expect(component.contains(item.name)).toBeTruthy();
//         });

//         component.setProps({ items: newItems });

//         newItems.forEach(item => {
//             expect(component.contains(item.name)).toBeTruthy();
//         });
//     });
// });
