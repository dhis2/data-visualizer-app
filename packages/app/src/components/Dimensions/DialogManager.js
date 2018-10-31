import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DataDimension from './DataDimension/DataDimension';
import OrgUnitDimension from './OrgUnitDimension/OrgUnitDimension';
import PeriodDimension from './PeriodDimension';
import { FIXED_DIMENSIONS } from '../../modules/fixedDimensions';

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;
const ouId = FIXED_DIMENSIONS.ou.id;

export const defaultState = {
    mounted: [],
};

export const dimensionComponents = props => ({
    [dxId]: <DataDimension toggleDialog={props.toggleDialog} />,
    [ouId]: <OrgUnitDimension toggleDialog={props.toggleDialog} />,
    [peId]: <PeriodDimension toggleDialog={props.toggleDialog} />,
});

export class DialogManager extends Component {
    state = defaultState;

    dimensionComponents = dimensionComponents(this.props);

    componentDidUpdate() {
        if (this.props.id && !this.state.mounted.includes(this.props.id)) {
            this.setState({
                mounted: [...this.state.mounted, this.props.id],
            });
        }
    }

    onCloseDialog = () => {
        this.props.toggleDialog(null);
    };

    render = () => (
        <Dialog
            open={this.props.dialogIsOpen}
            onClose={this.onCloseDialog}
            maxWidth={false}
            disableEnforceFocus
            keepMounted
        >
            {Object.keys(this.dimensionComponents).map(dimensionId => {
                return this.state.mounted.includes(dimensionId) ? (
                    <div
                        key={dimensionId}
                        style={{
                            display:
                                dimensionId === this.props.id
                                    ? 'block'
                                    : 'none',
                        }}
                    >
                        {this.dimensionComponents[dimensionId]}
                    </div>
                ) : null;
            })}
        </Dialog>
    );
}

export default DialogManager;
