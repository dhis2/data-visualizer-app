import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import i18n from '@dhis2/d2-i18n';

const style = {
    container: {
        height: 53,
        width: 420,
        border: '1px solid #E0E0E0',
        borderBottom: 0,
        display: 'flex',
    },
    groupContainer: {
        display: 'flex',
        flexFlow: 'column',
        width: 'inherit',
        paddingLeft: 5,
        paddingRight: 5,
    },
    detailContainer: {
        display: 'flex',
        flexFlow: 'column',
        width: '40%',
        paddingLeft: 5,
        paddingRight: 5,
    },
};

const GROUP = 'Group';
const DETAIL = 'Detail';

export class Groups extends Component {
    state = {};

    render = () => {
        return (
            <div style={style.container}>
                <div style={style.groupContainer}>
                    <span>{i18n.t(GROUP)}</span>
                    <Select />
                </div>
                <div style={style.detailContainer}>
                    <span>{i18n.t(DETAIL)}</span>
                    <Select />
                </div>
            </div>
        );
    };
}

export default Groups;
