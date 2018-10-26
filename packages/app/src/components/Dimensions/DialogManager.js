import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DataDimension from './DataDimension/DataDimension';
import PeriodDimension from './PeriodDimension';
import OrgUnitDimension from './OrgUnitDimension';

import { HideButton, UpdateButton } from './DataDimension/buttons';

import { sGetUiItems, sGetUi } from '../../reducers/ui';

import { acSetCurrentFromUi } from '../../actions/current';
import { tSetRecommendedIds } from '../../actions/recommendedIds';

import { colors } from '../../colors';

const styles = {
    dialogActions: {
        borderTop: `1px solid ${colors.blueGrey}`,
        margin: 0,
        paddingTop: 0,
        paddingBottom: 0,
        height: 84,
        paddingRight: 24,
    },
};

export const DialogManager = ({
    onUpdate,
    ui,
    fetchRecommendedIds,
    selectedItems,
    dialogIsOpen,
    id,
    toggleDialog,
}) => {
    const dimensionComponents = {
        dx: <DataDimension />,
        ou: <OrgUnitDimension />,
        pe: <PeriodDimension />,
    };

    const onUpdateClick = () => {
        if (selectedItems.dx.length || selectedItems.ou.length)
            fetchRecommendedIds({ dx: selectedItems.dx, ou: selectedItems.ou });

        onUpdate(ui);
        toggleDialog(null);
    };

    return id ? (
        <Dialog
            open={dialogIsOpen}
            onClose={() => toggleDialog(null)}
            maxWidth={false}
            disableEnforceFocus
        >
            {dimensionComponents[id]}
            <DialogActions style={styles.dialogActions}>
                <HideButton action={() => toggleDialog(null)} />
                <UpdateButton action={onUpdateClick} />
            </DialogActions>
        </Dialog>
    ) : null;
};

DialogManager.propTypes = {
    selectedItems: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    fetchRecommendedIds: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    selectedItems: sGetUiItems(state),
    ui: sGetUi(state),
});

export default connect(
    mapStateToProps,
    {
        fetchRecommendedIds: tSetRecommendedIds,
        onUpdate: acSetCurrentFromUi,
    }
)(DialogManager);
