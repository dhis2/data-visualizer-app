import React, { Component } from 'react';
import UnselectedContainer from './UnselectedContainer';
import SelectedContainer from './SelectedContainer';
import { ActionButtons } from './buttons';
import i18n from '@dhis2/d2-i18n';

const style = {
    container: {
        height: 536,
        width: 747,
    },
    title: {
        height: 24,
        width: 747,
        color: '#000000',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 500,
    },
    subContainer: {
        display: 'flex',
    },
};

const DIALOG_TITLE = 'Data';

export class DataDimensionContent extends Component {
    state = {};

    render = () => {
        return (
            <div style={style.container}>
                <h3 style={style.title}>{i18n.t(DIALOG_TITLE)}</h3>
                <div style={style.subContainer}>
                    <UnselectedContainer />
                    <ActionButtons />
                    <SelectedContainer />
                </div>
            </div>
        );
    };
}

export default DataDimensionContent;
