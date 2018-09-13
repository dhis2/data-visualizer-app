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
        flexFlow: 'column',
    },
};

const TITLE = 'Data Type';

export class DataTypes extends Component {
    state = {};

    render = () => {
        return (
            <div style={style.container}>
                <span>{i18n.t(TITLE)}</span>
                <Select>
                    <option>OPtion 1</option>
                    <option>Option 2</option>
                    <option>Option3</option>
                </Select>
            </div>
        );
    };
}

export default DataTypes;
