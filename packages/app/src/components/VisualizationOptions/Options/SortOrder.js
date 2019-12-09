import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import i18n from '@dhis2/d2-i18n'

import SelectBaseOption from './SelectBaseOption'
import styles from '../styles/VisualizationOptions.style'

const SortOrder = ({ classes }) => (
    <SelectBaseOption
        className={classes.selectBaseOption}
        option={{
            name: 'sortOrder',
            label: i18n.t('Sort order'),
            items: [
                { id: 0, label: i18n.t('None') },
                { id: -1, label: i18n.t('Low to high') },
                { id: 1, label: i18n.t('High to low') },
            ],
        }}
    />
)

SortOrder.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SortOrder)
