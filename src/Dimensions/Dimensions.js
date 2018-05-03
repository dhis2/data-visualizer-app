import React from 'react';
import TextField from 'material-ui-next/TextField';
import { InputAdornment } from 'material-ui-next/Input';
import { Search } from 'material-ui-icons';
import { colors } from '../colors';
import Alternatives from './Alternatives';

const style = {
    backgroundColor: colors.lightGrey,
};

const Dimensions = props => {
    return (
        <div className="dimensions" style={style}>
            <TextField
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
                placeholder={'Search dimensions'}
            />
            <Alternatives />
        </div>
    );
};

export default Dimensions;
