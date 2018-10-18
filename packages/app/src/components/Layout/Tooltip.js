import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import i18n from '@dhis2/d2-i18n';

import { sGetUiItems } from '../../reducers/ui';
import { sGetMetadata } from '../../reducers/metadata';
import { styles } from './styles/Tooltip.style';

const labels = {
    noneSelected: i18n.t('None selected'),
};

export class Tooltip extends React.Component {
    renderTooltip = names => (
        <Popper
            anchorEl={this.props.anchorEl}
            open={this.props.open}
            placement="bottom-start"
        >
            <Paper style={styles.tooltip}>
                {
                    <ul style={styles.list}>
                        {names.map(name => (
                            <li key={`${this.props.dimensionId}-${name}`}>
                                {name}
                            </li>
                        ))}
                    </ul>
                }
            </Paper>
        </Popper>
    );

    render() {
        const { itemIds, metadata } = this.props;

        const names = (itemIds || []).length
            ? itemIds.map(id => (metadata[id] ? metadata[id].name : id))
            : [labels.noneSelected];

        return names.length ? this.renderTooltip(names) : '';
    }
}

Tooltip.propTypes = {
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.object.isRequired,
    dimensionId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    itemIds: sGetUiItems(state)[ownProps.dimensionId],
    metadata: sGetMetadata(state),
});

export default connect(mapStateToProps)(Tooltip);
