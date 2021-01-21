import React from 'react';
import { shallow } from 'enzyme';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import TranslationDialog from '@dhis2/d2-ui-translation-dialog';

import { getStubContext } from '../../../../config/inject-theme';

import TranslateMenuItem from '../TranslateMenuItem';

describe('File: FileMenu > TranslateMenuItem component', () => {
    let translateMenuItem;
    let onTranslate;
    let onError;
    let props;
    let translationDialog;

    const context = getStubContext();

    beforeEach(() => {
        onTranslate = jest.fn();
        onError = jest.fn();

        props = {
            enabled: true,
            fileModel: { id: 'some-file' },
            onTranslate,
            onTranslateError: onError,
        };

        translateMenuItem = shallow(<TranslateMenuItem {...props} />, { context });
    });

    it('should render the Translate button', () => {
        expect(translateMenuItem.find(ListItemIcon)).toHaveLength(1);
        expect(translateMenuItem.find(ListItemText).props().primary).toEqual('Translate');
    });

    it('should open the Translation dialog on button click', () => {
        const menuItem = translateMenuItem.find(MenuItem);
        expect(menuItem.props().disabled).toBe(false);

        menuItem.simulate('click');

        translationDialog = translateMenuItem.find(TranslationDialog);
        expect(translationDialog.props().open).toBe(true);
    });

    it('should close the Translation dialog on click', () => {
        translateMenuItem.find(MenuItem).simulate('click');
        translateMenuItem.find(MenuItem).simulate('click');

        translationDialog = translateMenuItem.find(TranslationDialog);
        expect(translationDialog.props().open).toBe(false);
    });

    it('should trigger the onTranslate callback upon successful translation', () => {
        translationDialog = translateMenuItem.find(TranslationDialog);
        translationDialog.props().onTranslationSaved();

        expect(onTranslate).toHaveBeenCalledTimes(1);
    });

    it('should trigger the onError callback upon unsuccessful translation', () => {
        translationDialog = translateMenuItem.find(TranslationDialog);
        translationDialog.props().onTranslationError();

        expect(onError).toHaveBeenCalledTimes(1);
    });
});
