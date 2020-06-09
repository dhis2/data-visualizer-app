import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from 'prop-types'

import styles from './styles/YearOverYearSelect.style'

class YearOverYearSelect extends React.Component {
    state = {
        open: false,
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    render() {
        return (
            <Select
                disableUnderline
                multiple={Boolean(this.props.multiple)}
                open={this.state.open}
                onChange={this.props.onChange}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.props.value}
                SelectDisplayProps={{
                    style: styles.displayProps,
                }}
            >
                {this.props.options.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.getName()}
                    </MenuItem>
                ))}
            </Select>
        )
    }
}

YearOverYearSelect.propTypes = {
    multiple: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    onChange: PropTypes.func,
}

export default YearOverYearSelect
