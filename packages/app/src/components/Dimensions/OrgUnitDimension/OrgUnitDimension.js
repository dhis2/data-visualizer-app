import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import i18n from '@dhis2/d2-i18n';
import PropTypes from 'prop-types';

import {
    OrgUnitSelector,
    userOrgUnits,
    removeOrgUnitLastPathSegment,
} from '@dhis2/d2-ui-org-unit-dialog';

import styles from './styles/OrgUnitDimension.style';
import { HideButton, UpdateButton } from './buttons';
import { sGetUi } from '../../../reducers/ui';
import { acSetCurrentFromUi } from '../../../actions/current';
import { acAddMetadata } from '../../../actions/metadata';
import { sGetMetadata } from '../../../reducers/metadata';

import {
    acAddUiItems,
    acSetUiItems,
    acRemoveUiItems,
    acAddParentGraphMap,
} from '../../../actions/ui';

import {
    apiFetchOrganisationUnitGroups,
    apiFetchOrganisationUnitLevels,
    apiFetchOrganisationUnits,
} from '../../../api/organisationUnits';

import {
    LEVEL_ID_PREFIX,
    GROUP_ID_PREFIX,
    isLevelId,
    isGroupId,
    getOrgUnitsFromIds,
    getLevelsFromIds,
    getGroupsFromIds,
    sortOrgUnitLevels,
    transformOptionsIntoMetadata,
} from '../../../modules/orgUnitDimensions';

export const defaultState = {
    root: undefined,
    // use "selected" property for cloning org units while user org unit(s) is (are) selected
    selected: [],
    levelOptions: [],
    groupOptions: [],
};

export class OrgUnitDimension extends Component {
    constructor(props) {
        super(props);

        this.state = defaultState;
        this.userOrgUnitIds = userOrgUnits.map(orgUnit => orgUnit.id);

        this.loadOrgUnitTree();
        this.loadOrgUnitLevels();
        this.loadOrgUnitGroups();
    }

    getUserOrgUnitsFromIds = ids => {
        return userOrgUnits.filter(orgUnit => ids.includes(orgUnit.id));
    };

    onLevelChange = event => {
        const levelIds = event.target.value.filter(id => !!id);

        this.props.acSetUiItems({
            ...this.props.ui.itemsByDimension,
            ou: [
                ...this.props.ui.itemsByDimension.ou.filter(
                    id => !isLevelId(id)
                ),
                ...levelIds.map(
                    id => `${LEVEL_ID_PREFIX}-${this.props.metadata[id].level}`
                ),
            ],
        });
    };

    onGroupChange = event => {
        const optionIds = event.target.value.filter(id => !!id);

        this.props.acSetUiItems({
            ...this.props.ui.itemsByDimension,
            ou: [
                ...this.props.ui.itemsByDimension.ou.filter(
                    id => !isGroupId(id)
                ),
                ...optionIds.map(id => `${GROUP_ID_PREFIX}-${id}`),
            ],
        });
    };

    loadOrgUnitTree = () => {
        apiFetchOrganisationUnits()
            .then(rootLevel => rootLevel.toArray()[0])
            .then(root => {
                if (this.props.metadata[root.id] === undefined) {
                    this.props.acAddMetadata({
                        [root.id]: {
                            id: root.id,
                            displayName: root.displayName,
                            name: root.name,
                        },
                    });
                }

                this.setState({
                    root,
                });
            });
    };

    loadOrgUnitGroups = () => {
        apiFetchOrganisationUnitGroups()
            .then(collection => collection.toArray())
            .then(options =>
                transformOptionsIntoMetadata(options, this.props.metadata)
            )
            .then(({ options, metadata }) => {
                this.props.acAddMetadata(metadata);
                this.setState({ groupOptions: options });
            });
    };

    loadOrgUnitLevels = () => {
        apiFetchOrganisationUnitLevels()
            .then(collection => collection.toArray())
            .then(levelOptions =>
                transformOptionsIntoMetadata(
                    levelOptions,
                    this.props.metadata,
                    ['id', 'displayName', 'name', 'level']
                )
            )
            .then(({ options, metadata }) => {
                this.props.acAddMetadata(metadata);
                this.setState({
                    levelOptions: sortOrgUnitLevels(options),
                });
            });
    };

    handleOrgUnitClick = (event, orgUnit) => {
        const selected = getOrgUnitsFromIds(
            this.props.ui.itemsByDimension.ou,
            this.props.metadata,
            this.props.ui.parentGraphMap
        );

        if (selected.some(ou => ou.path === orgUnit.path)) {
            this.props.acRemoveUiItems({
                dimensionType: 'ou',
                value: [orgUnit.id],
            });
        } else {
            const path = removeOrgUnitLastPathSegment(orgUnit.path);

            this.props.acAddParentGraphMap({
                [orgUnit.id]: path[0] === '/' ? path.substr(1) : path,
            });

            this.props.acAddMetadata({
                [orgUnit.id]: {
                    id: orgUnit.id,
                    name: orgUnit.name,
                    displayName: orgUnit.displayName,
                },
            });

            this.props.acAddUiItems({
                dimensionType: 'ou',
                value: [orgUnit.id],
            });
        }
    };

    handleUserOrgUnitClick = (event, checked) => {
        if (checked) {
            if (!this.state.selected.length) {
                this.setState({
                    selected: this.props.ui.itemsByDimension.ou.slice(),
                });
            }

            this.props.acSetUiItems({
                ...this.props.ui.itemsByDimension,
                ou: [
                    ...this.props.ui.itemsByDimension.ou.filter(id =>
                        this.userOrgUnitIds.includes(id)
                    ),
                    event.target.name,
                ],
            });
        } else {
            if (
                this.props.ui.itemsByDimension.ou.length === 1 &&
                this.state.selected.length > 0
            ) {
                this.props.acSetUiItems({
                    ...this.props.ui.itemsByDimension,
                    ou: this.state.selected,
                });

                this.setState({
                    selected: [],
                });
            }

            this.props.acRemoveUiItems({
                dimensionType: 'ou',
                value: [event.target.name],
            });
        }
    };

    onCloseClick = () => {
        this.props.toggleDialog();
    };

    onUpdateClick = () => {
        this.props.acSetCurrentFromUi(this.props.ui);
        this.props.toggleDialog(null);
    };

    render = () => {
        const ids = this.props.ui.itemsByDimension.ou;

        const selected = getOrgUnitsFromIds(
            ids,
            this.props.metadata,
            this.props.ui.parentGraphMap,
            this.userOrgUnitIds
        );
        const userOrgUnits = this.getUserOrgUnitsFromIds(ids);
        const level = getLevelsFromIds(ids, this.state.levelOptions);
        const group = getGroupsFromIds(ids, this.state.groupOptions);

        return (
            <Fragment>
                <DialogTitle>{i18n.t('Organisation units')}</DialogTitle>
                <DialogContent style={styles.dialogContent}>
                    {this.state.root && (
                        <OrgUnitSelector
                            root={this.state.root}
                            selected={selected}
                            userOrgUnits={userOrgUnits}
                            level={level}
                            group={group}
                            levelOptions={this.state.levelOptions}
                            groupOptions={this.state.groupOptions}
                            onLevelChange={this.onLevelChange}
                            onGroupChange={this.onGroupChange}
                            handleUserOrgUnitClick={this.handleUserOrgUnitClick}
                            handleOrgUnitClick={this.handleOrgUnitClick}
                        />
                    )}
                    {!this.state.root && (
                        <CircularProgress style={styles.loader} />
                    )}
                </DialogContent>
                <DialogActions style={{ padding: '24px' }}>
                    <HideButton onClick={this.onCloseClick} />
                    <UpdateButton
                        color="primary"
                        onClick={this.onUpdateClick}
                    />
                </DialogActions>
            </Fragment>
        );
    };
}

OrgUnitDimension.propTypes = {
    toggleDialog: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    ui: sGetUi(state),
    metadata: sGetMetadata(state),
});

const mapDispatchToProps = {
    acAddUiItems,
    acRemoveUiItems,
    acAddMetadata,
    acSetUiItems,
    acAddParentGraphMap,
    acSetCurrentFromUi,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrgUnitDimension);
