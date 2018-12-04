import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import i18n from '@dhis2/d2-i18n';
import PropTypes from 'prop-types';

import {
    OrgUnitSelector,
    userOrgUnits,
    removeOrgUnitLastPathSegment,
} from '@dhis2/d2-ui-org-unit-dialog';

import {
    sGetUiItemsByDimension,
    sGetUiParentGraphMap,
} from '../../../../reducers/ui';
import { acSetCurrentFromUi } from '../../../../actions/current';
import { acAddMetadata } from '../../../../actions/metadata';
import { sGetCurrent } from '../../../../reducers/current';
import { sGetMetadata } from '../../../../reducers/metadata';

import {
    acAddUiItems,
    acSetUiItems,
    acRemoveUiItems,
    acAddParentGraphMap,
} from '../../../../actions/ui';

import {
    apiFetchOrganisationUnitGroups,
    apiFetchOrganisationUnitLevels,
    apiFetchOrganisationUnits,
} from '../../../../api/organisationUnits';

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
} from '../../../../modules/orgUnitDimensions';

import { FIXED_DIMENSIONS } from '../../../../modules/fixedDimensions';
import styles from './styles/OrgUnitDimension.style';

const ouId = FIXED_DIMENSIONS.ou.id;

export const defaultState = {
    root: undefined,
    // use "selected" property for cloning org units while user org unit(s) is (are) selected
    selected: [],
    levelOptions: [],
    groupOptions: [],
    showOrgUnitsTree: true,
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

    componentDidUpdate(prevProps) {
        const previousId = prevProps.current ? prevProps.current.id : null;
        const currentId = this.props.current ? this.props.current.id : null;

        // remount org units selector component to esnure
        // only selected org units are expanded
        if (previousId !== currentId) {
            this.hideOrgUnitsTree();

            setTimeout(this.showOrgUnitsTree, 0);
        }
    }

    showOrgUnitsTree = () => {
        this.setState({ showOrgUnitsTree: true });
    };

    hideOrgUnitsTree = () => {
        this.setState({ showOrgUnitsTree: false });
    };

    addOrgUnitToMetadata = orgUnit => {
        this.props.acAddMetadata({
            [orgUnit.id]: {
                id: orgUnit.id,
                name: orgUnit.name || orgUnit.displayName,
                displayName: orgUnit.displayName,
            },
        });
    };

    addOrgUnitPathToParentGraphMap = orgUnit => {
        const path = removeOrgUnitLastPathSegment(orgUnit.path);

        this.props.acAddParentGraphMap({
            [orgUnit.id]: path[0] === '/' ? path.substr(1) : path,
        });
    };

    setOuUiItems = items => {
        this.props.acSetUiItems({ dimensionType: ouId, items });
    };

    getUserOrgUnitsFromIds = ids => {
        return userOrgUnits.filter(orgUnit => ids.includes(orgUnit.id));
    };

    onLevelChange = event => {
        const levelIds = event.target.value.filter(id => !!id);

        this.setOuUiItems([
            ...this.props.ouItems.filter(id => !isLevelId(id)),
            ...levelIds.map(
                id => `${LEVEL_ID_PREFIX}-${this.props.metadata[id].level}`
            ),
        ]);
    };

    onGroupChange = event => {
        const optionIds = event.target.value.filter(id => !!id);

        this.setOuUiItems([
            ...this.props.ouItems.filter(id => !isGroupId(id)),
            ...optionIds.map(id => `${GROUP_ID_PREFIX}-${id}`),
        ]);
    };

    onDeselectAllClick = () => {
        this.setOuUiItems([]);
    };

    loadOrgUnitTree = () => {
        apiFetchOrganisationUnits()
            .then(rootLevel => rootLevel.toArray()[0])
            .then(root => {
                this.setState({
                    root,
                });
            });
    };

    loadOrgUnitGroups = () => {
        apiFetchOrganisationUnitGroups()
            .then(organisationUnitGroups =>
                transformOptionsIntoMetadata(
                    organisationUnitGroups,
                    this.props.metadata
                )
            )
            .then(({ options, metadata }) => {
                this.props.acAddMetadata(metadata);
                this.setState({ groupOptions: options });
            });
    };

    loadOrgUnitLevels = () => {
        apiFetchOrganisationUnitLevels()
            .then(organisationUnitLevels =>
                transformOptionsIntoMetadata(
                    organisationUnitLevels,
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
            this.props.ouItems,
            this.props.metadata,
            this.props.parentGraphMap
        );

        if (selected.some(ou => ou.path === orgUnit.path)) {
            this.props.acRemoveUiItems({
                dimensionType: ouId,
                value: [orgUnit.id],
            });
        } else {
            this.addOrgUnitPathToParentGraphMap(orgUnit);
            this.addOrgUnitToMetadata(orgUnit);

            this.props.acAddUiItems({
                dimensionType: ouId,
                value: [orgUnit.id],
            });
        }
    };

    handleUserOrgUnitClick = (event, checked) => {
        if (checked) {
            if (!this.state.selected.length) {
                this.setState({
                    selected: this.props.ouItems.slice(),
                });
            }

            this.setOuUiItems([
                ...this.props.ouItems.filter(id =>
                    this.userOrgUnitIds.includes(id)
                ),
                event.target.name,
            ]);
        } else {
            if (
                this.props.ouItems.length === 1 &&
                this.state.selected.length > 0
            ) {
                this.setOuUiItems(this.state.selected);

                this.setState({
                    selected: [],
                });
            }

            this.props.acRemoveUiItems({
                dimensionType: ouId,
                value: [event.target.name],
            });
        }
    };

    handleMultipleOrgUnitsSelect = orgUnits => {
        orgUnits.forEach(orgUnit => {
            this.addOrgUnitPathToParentGraphMap(orgUnit);
            this.addOrgUnitToMetadata(orgUnit);
        });

        this.props.acAddUiItems({
            dimensionType: ouId,
            value: orgUnits.map(orgUnit => orgUnit.id),
        });
    };

    render = () => {
        const ids = this.props.ouItems;
        const selected = getOrgUnitsFromIds(
            ids,
            this.props.metadata,
            this.props.parentGraphMap,
            this.userOrgUnitIds
        );
        const userOrgUnits = this.getUserOrgUnitsFromIds(ids);
        const level = getLevelsFromIds(ids, this.state.levelOptions);
        const group = getGroupsFromIds(ids, this.state.groupOptions);

        return (
            <Fragment>
                <DialogTitle>{i18n.t('Organisation units')}</DialogTitle>
                <DialogContent style={styles.dialogContent}>
                    {this.state.root && this.state.showOrgUnitsTree && (
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
                            onDeselectAllClick={this.onDeselectAllClick}
                            handleUserOrgUnitClick={this.handleUserOrgUnitClick}
                            handleOrgUnitClick={this.handleOrgUnitClick}
                            handleMultipleOrgUnitsSelect={
                                this.handleMultipleOrgUnitsSelect
                            }
                        />
                    )}
                    {!this.state.root && (
                        <CircularProgress style={styles.loader} />
                    )}
                </DialogContent>
            </Fragment>
        );
    };
}

OrgUnitDimension.propTypes = {
    ouItems: PropTypes.array.isRequired,
    parentGraphMap: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
    acAddUiItems: PropTypes.func.isRequired,
    acRemoveUiItems: PropTypes.func.isRequired,
    acAddMetadata: PropTypes.func.isRequired,
    acAddParentGraphMap: PropTypes.func.isRequired,
    acSetUiItems: PropTypes.func.isRequired,
    acSetCurrentFromUi: PropTypes.func.isRequired,
    current: PropTypes.object,
};

const mapStateToProps = state => ({
    ouItems: sGetUiItemsByDimension(state, ouId),
    parentGraphMap: sGetUiParentGraphMap(state),
    metadata: sGetMetadata(state),
    current: sGetCurrent(state),
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
