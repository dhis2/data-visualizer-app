import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { getStubContext } from '../../../../config/inject-theme';

import { FileMenu } from '../FileMenu';

describe('File: FileMenu component', () => {
    let fileMenu;
    let props;

    const context = getStubContext();
    context.d2.models = {
        chart: {
            get: jest.fn().mockReturnValue(
                Promise.resolve({
                    id: 'some-test-id',
                    access: {
                        update: true,
                        manage: true,
                        delete: true,
                    },
                })
            ),
        },
    };

    const renderComponent = props => {
        return shallow(<FileMenu {...props} />);
    };

    beforeEach(() => {
        props = {
            classes: {
                menuButton: { textDecoration: 'none' },
            },
            d2: context.d2,
            fileType: 'chart',
            onNew: jest.fn(),
            onOpen: jest.fn(),
            onSave: jest.fn(),
            onSaveAs: jest.fn(),
            onRename: jest.fn(),
            onTranslate: jest.fn(),
            onShare: jest.fn(),
            onDelete: jest.fn(),
            onError: jest.fn(),
        };

        fileMenu = renderComponent(props);
    });

    it('should have rendered a result', () => {
        expect(fileMenu).toHaveLength(1);
    });

    it('should render a Button', () => {
        expect(fileMenu.find(Button)).toHaveLength(1);
    });

    it('should render a Menu', () => {
        expect(fileMenu.find(Menu)).toHaveLength(1);
    });

    it('should render the Menu as closed', () => {
        expect(fileMenu.find(Menu).props().open).toBe(false);
    });

    it('should render the Menu as open when the button is clicked', () => {
        const button = fileMenu.find(Button);

        button.simulate('click', { currentTarget: button });
        expect(fileMenu.find(Menu).props().open).toBe(true);
    });

    const buttons = [
        { name: 'New', componentName: 'NewMenuItem', enabled: true },
        { name: 'Open', componentName: 'OpenMenuItem', enabled: true },
        { name: 'Save', componentName: 'SaveMenuItem', enabled: true },
        { name: 'Save as...', componentName: 'SaveAsMenuItem', enabled: false },
        { name: 'Rename', componentName: 'RenameMenuItem', enabled: false },
        { name: 'Translate', componentName: 'TranslateMenuItem', enabled: false },
        { name: 'Share', componentName: 'ShareMenuItem', enabled: false },
        { name: 'Get link', componentName: 'GetLinkMenuItem', enabled: false },
        { name: 'Delete', componentName: 'DeleteMenuItem', enabled: false },
    ];

    buttons.forEach(({ name, componentName, enabled }) => {
        it(`should render the ${name} menu item`, () => {
            const button = fileMenu.find(componentName);

            expect(button).toHaveLength(1);
            expect(button.props().enabled).toBe(enabled);
        });
    });

    it('should close the Menu when the button is clicked again', () => {
        const button = fileMenu.find(Button);

        // open the menu first
        button.simulate('click', { currentTarget: button });

        button.simulate('click', { currentTarget: button });
        expect(fileMenu.find(Menu).props().open).toBe(false);
    });

    it('should enable the SaveAs button when an id is passed to props', () => {
        fileMenu = renderComponent({ ...props, fileId: 'some-test-id' });

        // test async
        Promise.resolve().then(() => {
            fileMenu.update();

            expect(fileMenu.find('SaveAsMenuItem').props().enabled).toBe(true);
            expect(fileMenu.find('RenameMenuItem').props().enabled).toBe(true);
            expect(fileMenu.find('TranslateMenuItem').props().enabled).toBe(true);
            expect(fileMenu.find('ShareMenuItem').props().enabled).toBe(true);
            expect(fileMenu.find('GetLinkMenuItem').props().enabled).toBe(true);
            expect(fileMenu.find('DeleteMenuItem').props().enabled).toBe(true);
        });
    });
});
