import Button from '@material-ui/core/Button';
import i18n from '@dhis2/d2-i18n';
import React from 'react';

export const HideButton = props => <Button {...props}>{i18n.t('Hide')}</Button>;

export const UpdateButton = props => (
    <Button {...props}>{i18n.t('Update')}</Button>
);
