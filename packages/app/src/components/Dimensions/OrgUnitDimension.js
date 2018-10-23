import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import i18n from '@dhis2/d2-i18n';
import { OrgUnitSelector, userOrgUnits, removeOrgUnitLastPathSegment } from '@dhis2/d2-ui-org-unit-dialog';
import PropTypes from 'prop-types';
import { sGetUi } from '../../reducers/ui';
import { acSetCurrentFromUi } from '../../actions/current';
import { acAddMetadata } from '../../actions/metadata';
import { sGetMetadata } from '../../reducers/metadata';
import {
    acAddUiItems,
    acSetUiItems,
    acRemoveUiItems,
    acAddParentGraphMap,
    acSetParentGraphMap
} from '../../actions/ui';
import {
    apiFetchOrganisationUnitGroups,
    apiFetchOrganisationUnitLevels,
    apiFetchOrganisationUnits,
} from '../../api/organisationUnits';

/**
 * Org unit level id prefix
 * @type {string}
 */
const LEVEL_ID_PREFIX = 'LEVEL';

/**
 * Detects if id is ou level id
 * @param id
 * @returns {boolean}
 */
const isLevelId = id => id.substr(0, LEVEL_ID_PREFIX.length) === LEVEL_ID_PREFIX;

/**
 * Org unit group id prefix
 * @type {string}
 */
const GROUP_ID_PREFIX = 'OU_GROUP';

/**
 * Detects if id is group id
 * @param id
 * @returns {boolean}
 */
const isGroupId = id => id.substr(0, GROUP_ID_PREFIX.length) === GROUP_ID_PREFIX;

export class OrgUnitDimension extends Component {
    constructor(props) {
        super(props);

        this.userOrgUnitIds = userOrgUnits.map(orgUnit => orgUnit.id);

        this.state = {
            root: undefined,
            // use "selected" property for cloning org units while user org unit(s) is (are) selected
            selected: [],
            levelOptions: [],
            groupOptions: [],
        };

        this.loadOrgUnitTree();
        this.loadOrgUnitLevels();
        this.loadOrgUnitGroups();
    }

    getUserOrgUnitsFromIds = (ids) => {
        return userOrgUnits.filter(orgUnit => ids.includes(orgUnit.id));
    };

    getOrgUnitPath = (id) => {
        if (this.props.metadata[id] && this.props.metadata[id].path) {
            return this.props.metadata[id].path;
        }

        // for root org units
        if (this.props.ui.parentGraphMap[id] === '') {
            return `/${id}`;
        }

        return this.props.ui.parentGraphMap[id]
            ? `/${this.props.ui.parentGraphMap[id]}/${id}`
            : undefined;
    };

    getOrgUnitsFromIds = (ids, idsToExclude = []) => {
        return ids
            .filter(id => !idsToExclude.includes(id))
            .filter(id => this.props.metadata[id] !== undefined)
            .map(id => ({
                id: id,
                name: this.props.metadata[id].displayName || this.props.metadata[id].name,
                path: this.getOrgUnitPath(id),
            }));
    };

    getLevelsFromIds = (ids) => {
        if (this.state.levelOptions.length === 0) {
            return [];
        }

        return ids
            .filter(isLevelId)
            .map(id => id.substr(LEVEL_ID_PREFIX.length + 1))
            .map(level => this.state.levelOptions.find(option => Number(option.level) === Number(level)).id);
    };

    getGroupsFromIds = (ids) => {
        if (this.state.groupOptions.length === 0) {
            return [];
        }

        return ids
            .filter(isGroupId)
            .map(id => id.substr(GROUP_ID_PREFIX.length + 1));
    };

    transformOptionsIntoMetadata = (options, fields = ['id', 'displayName', 'name']) => {
        const metadata = {};

        for (let i = 0; i < options.length; ++i) {
            // skip if we already have this property in metadata
            if (this.props.metadata[options[i].id] !== undefined) {
                break;
            }

            metadata[options[i].id] = {};

            fields.forEach(field => {
                metadata[options[i].id][field] = options[i][field];
            });
        }

        return {
            options,
            metadata,
        };
    };

    onLevelChange = (event) => {
        const levelIds = event.target.value;

        this.props.acSetUiItems({
            ...this.props.ui.itemsByDimension,
            ou: [
                ...this.props.ui.itemsByDimension.ou.filter(id => !isLevelId(id)),
                ...levelIds.map(id => `${LEVEL_ID_PREFIX}-${this.props.metadata[id].level}`),
            ]
        });
    };

    onGroupChange = (event) => {
        const optionIds = event.target.value;

        this.props.acSetUiItems({
            ...this.props.ui.itemsByDimension,
            ou: [
                ...this.props.ui.itemsByDimension.ou.filter(id => !isGroupId(id)),
                ...optionIds.map(id => `${GROUP_ID_PREFIX}-${id}`),
            ]
        });
    };

    loadOrgUnitTree = () => {
        apiFetchOrganisationUnits()
            .then(rootLevel => rootLevel.toArray()[0])
            .then((root) => {
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
            .then(this.transformOptionsIntoMetadata)
            .then(({ options, metadata }) => {
                this.props.acAddMetadata(metadata);
                this.setState({ groupOptions: options });
            })
    };

    loadOrgUnitLevels = () => {
        apiFetchOrganisationUnitLevels()
            .then(collection => collection.toArray())
            .then(levelOptions => this.transformOptionsIntoMetadata(levelOptions, ['id', 'displayName', 'name', 'level']))
            .then(({ options, metadata }) => {
                this.props.acAddMetadata(metadata);
                this.setState({ levelOptions: options });
            });
    };

    handleOrgUnitClick = (event, orgUnit) => {
        const selected = this.getOrgUnitsFromIds(this.props.ui.itemsByDimension.ou);

        if (selected.some(ou => ou.path === orgUnit.path)) {
            this.props.acRemoveUiItems({
                dimensionType: 'ou',
                value: [orgUnit.id],
            });
        } else {
            const path = removeOrgUnitLastPathSegment(orgUnit.path);

            this.props.acAddParentGraphMap({
                [orgUnit.id]: path[0] === '/'
                    ? path.substr(1)
                    : path,
            });

            this.props.acAddMetadata({
                [orgUnit.id]: {
                    id: orgUnit.id,
                    name: orgUnit.displayName,
                    path: orgUnit.path,
                }
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
                    ...this.props.ui.itemsByDimension.ou.filter(id => this.userOrgUnitIds.includes(id)),
                    event.target.name
                ],
            });
        } else {
            this.props.acRemoveUiItems({
                dimensionType: 'ou',
                value: [event.target.name],
            });

            if (this.props.ui.itemsByDimension.ou.length === 1 && this.state.selected.length > 0) {
                this.props.acSetUiItems({
                    ...this.props.ui.itemsByDimension,
                    ou: this.state.selected,
                });

                this.setState({
                    selected: [],
                });
            }
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
        if (!this.state.root) {
            return 'loading...';
        }

        const ids = this.props.ui.itemsByDimension.ou;

        const userOrgUnits = this.getUserOrgUnitsFromIds(ids);
        const selected = this.getOrgUnitsFromIds(ids, this.userOrgUnitIds);
        const level = this.getLevelsFromIds(ids);
        const group = this.getGroupsFromIds(ids);

        return (
            <Fragment>
                <DialogTitle>{i18n.t('Organisation units')}</DialogTitle>
                <DialogContent>
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
                </DialogContent>
                <DialogActions style={{ padding: '24px' }}>
                    <Button onClick={this.onCloseClick}>{i18n.t('Hide')}</Button>
                    <Button color="primary" onClick={this.onUpdateClick}>
                        {i18n.t('Update')}
                    </Button>
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
    acSetParentGraphMap,
    acSetCurrentFromUi,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrgUnitDimension);
