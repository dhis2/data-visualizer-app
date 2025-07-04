import {
    FileMenu,
    HoverMenuBar,
    UpdateButton,
    VIS_TYPE_GROUP_ALL,
    VIS_TYPE_GROUP_CHARTS,
    useCachedDataQuery,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import * as fromActions from '../../actions/index.js'
import { getErrorVariantByStatusCode } from '../../modules/error.js'
import history from '../../modules/history.js'
import {
    visTypes,
    getVisualizationState,
    useVisTypesFilterByVersion,
    STATE_UNSAVED,
    STATE_DIRTY,
} from '../../modules/visualization.js'
import { sGetCurrent } from '../../reducers/current.js'
import { sGetVisualization } from '../../reducers/visualization.js'
import { ToolbarDownloadDropdown } from '../DownloadMenu/ToolbarDownloadDropdown.jsx'
import UpdateVisualizationContainer from '../UpdateButton/UpdateVisualizationContainer.js'
import VisualizationOptionsManager from '../VisualizationOptions/VisualizationOptionsManager.jsx'
import { InterpretationsButton } from './InterpretationsButton.jsx'

const onOpen = (id) => {
    const path = `/${id}`
    if (history.location.pathname === path) {
        history.replace({ pathname: path }, { isOpening: true })
    } else {
        history.push(path)
    }
}
const onNew = () => {
    if (history.location.pathname === '/') {
        history.replace({ pathname: '/' }, { isResetting: true })
    } else {
        history.push('/')
    }
}
const getOnRename = (props, cb) => (details) =>
    props.onRenameVisualization(details, cb)

const getOnSave = (props) => (details) =>
    props.onSaveVisualization(false, details)

const getOnSaveAs = (props) => (details) =>
    props.onSaveVisualization(true, details)

const getOnDelete = (props) => () => props.onDeleteVisualization()

const getOnError = (props) => (error) => props.onError(error)

const UnconnectedMenuBar = ({ dataTest, onFileMenuAction, ...props }) => {
    const { currentUser } = useCachedDataQuery()

    const filterVisTypesByVersion = useVisTypesFilterByVersion()

    const filterVisTypes = [
        { type: VIS_TYPE_GROUP_ALL },
        { type: VIS_TYPE_GROUP_CHARTS, insertDivider: true },
        ...visTypes.filter(filterVisTypesByVersion).map((visType) => ({
            type: visType,
        })),
    ]

    return (
        <>
            <UpdateVisualizationContainer
                renderComponent={(handler) => (
                    <UpdateButton
                        onClick={handler}
                        dataTest={`${dataTest}-update-button`}
                    />
                )}
            />
            <HoverMenuBar>
                <FileMenu
                    currentUser={currentUser}
                    fileType={props.apiObjectName}
                    fileObject={props.current}
                    filterVisTypes={filterVisTypes}
                    defaultFilterVisType={VIS_TYPE_GROUP_ALL}
                    onOpen={onOpen}
                    onNew={onNew}
                    onRename={getOnRename(props, onFileMenuAction)}
                    onSave={
                        [STATE_UNSAVED, STATE_DIRTY].includes(
                            getVisualizationState(
                                props.visualization,
                                props.current
                            )
                        )
                            ? getOnSave(props)
                            : undefined
                    }
                    onSaveAs={getOnSaveAs(props)}
                    onDelete={getOnDelete(props)}
                    onError={getOnError(props)}
                />
                <VisualizationOptionsManager />

                <ToolbarDownloadDropdown />
            </HoverMenuBar>
            <InterpretationsButton />
        </>
    )
}

UnconnectedMenuBar.propTypes = {
    apiObjectName: PropTypes.string,
    current: PropTypes.object,
    dataTest: PropTypes.string,
    visualization: PropTypes.object,
    onFileMenuAction: PropTypes.func,
}

const mapStateToProps = (state) => ({
    current: sGetCurrent(state),
    visualization: sGetVisualization(state),
})

const mapDispatchToProps = (dispatch) => ({
    onRenameVisualization: (details, onRenameComplete) =>
        dispatch(fromActions.tDoRenameVisualization(details, onRenameComplete)),
    onSaveVisualization: (copy, details = {}) =>
        dispatch(fromActions.tDoSaveVisualization(details, copy)),
    onDeleteVisualization: () => dispatch(fromActions.tDoDeleteVisualization()),
    onError: (error) => {
        const message =
            error.errorCode === 'E4030'
                ? i18n.t(
                      "This visualization can't be deleted because it is used on one or more dashboards"
                  )
                : error.message
        const variant = getErrorVariantByStatusCode(error.httpStatusCode)

        dispatch(
            fromActions.fromSnackbar.acReceivedSnackbarMessage({
                variant,
                message,
            })
        )
    },
})

export const MenuBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedMenuBar)
