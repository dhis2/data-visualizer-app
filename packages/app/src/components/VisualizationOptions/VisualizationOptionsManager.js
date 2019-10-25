import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';

import { sGetUiType } from '../../reducers/ui';
import { chartTypeDisplayNames } from '../../modules/chartTypes';
import UpdateButton from '../UpdateButton/UpdateButton';
import VisualizationOptions from './VisualizationOptions';
import styles from './styles/VisualizationOptions.style';

class VisualizationOptionsManager extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dialogIsOpen: false,
        }
    }

    onClose = () => {
        this.toggleVisualizationOptionsDialog()
    }

    toggleVisualizationOptionsDialog = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen })
    }

    render() {
        return (
            <Fragment>
                <Button
                    className={this.props.className}
                    onClick={this.toggleVisualizationOptionsDialog}
                >
                    {i18n.t('Options')}
                </Button>
                <Dialog
                    open={this.state.dialogIsOpen}
                    onClose={this.onClose}
                    maxWidth="xl"
                >
                    <DialogTitle>
                        {i18n.t('{{visType}} options', {
                            visType:
                                chartTypeDisplayNames[
                                    this.props.visualizationType
                                ],
                        })}
                    </DialogTitle>
                    <DialogContent className={this.props.classes.dialogContent}>
                        <VisualizationOptions />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.onClose}>
                            {i18n.t('Hide')}
                        </Button>
                        <UpdateButton onClick={this.onClose} />
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

VisualizationOptionsManager.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    visualizationType: PropTypes.string,
}

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
});

export default connect(mapStateToProps)(
    withStyles(styles)(VisualizationOptionsManager)
);
