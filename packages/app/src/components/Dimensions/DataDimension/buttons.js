import React from 'react';
import i18n from '@dhis2/d2-i18n';

export const ActionButtons = () => {
    return (
        <div>
            <AssignButton />
            <UnassignButton />
        </div>
    );
};

export const AssignButton = () => {
    return <button>rightArrowIcon</button>;
};

export const UnassignButton = () => {
    return <button>leftArrowIcon</button>;
};

export const DeselectAllButton = () => {
    return <button>{i18n.t('DESELECT ALL')}</button>;
};
