import { FileMenu } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import * as fromActions from '../../actions/index.js'
import { getErrorVariantByStatusCode } from '../../modules/error.js'
import history from '../../modules/history.js'
import { sGetCurrent } from '../../reducers/current.js'
import { DownloadMenu } from '../DownloadMenu/DownloadMenu.js'
import { InterpretationsButton } from '../Interpretations/InterpretationsButton.js'
import UpdateButton from '../UpdateButton/UpdateButton.js'
import UpdateVisualizationContainer from '../UpdateButton/UpdateVisualizationContainer.js'
import VisualizationOptionsManager from '../VisualizationOptions/VisualizationOptionsManager.js'
import styles from './styles/MenuBar.module.css'

const onOpen = (id) => {
    const path = `/${id}`
    if (history.location.pathname === path) {
        history.replace({ pathname: path, state: { isOpening: true } })
    } else {
        history.push(path)
    }
}
const onNew = () => {
    if (history.location.pathname === '/') {
        history.replace({ pathname: '/', state: { isResetting: true } })
    } else {
        history.push('/')
    }
}
const getOnRename = (props) => (details) => props.onRenameVisualization(details)
const getOnSave = (props) => (details) =>
    props.onSaveVisualization(details, false)
const getOnSaveAs = (props) => (details) =>
    props.onSaveVisualization(details, true)
const getOnDelete = (props) => () => props.onDeleteVisualization()
const getOnError = (props) => (error) => props.onError(error)

const UnconnectedMenuBar = ({ dataTest, ...props }, context) => (
    <div className={styles.menuBar} data-test={dataTest}>
        <UpdateVisualizationContainer
            renderComponent={(handler) => (
                <UpdateButton
                    className={styles.updateButton}
                    small
                    onClick={handler}
                    dataTest={`${dataTest}-update-button`}
                />
            )}
        />
        <FileMenu
            d2={context.d2}
            fileType={props.apiObjectName}
            fileObject={props.current}
            onOpen={onOpen}
            onNew={onNew}
            onRename={getOnRename(props)}
            onSave={getOnSave(props)}
            onSaveAs={getOnSaveAs(props)}
            onDelete={getOnDelete(props)}
            onError={getOnError(props)}
        />
        <VisualizationOptionsManager />
        <DownloadMenu />
        <div className={styles.grow} />
        <InterpretationsButton />
    </div>
)

UnconnectedMenuBar.propTypes = {
    apiObjectName: PropTypes.string,
    current: PropTypes.object,
    dataTest: PropTypes.string,
}

UnconnectedMenuBar.contextTypes = {
    d2: PropTypes.object,
}

const mapStateToProps = (state) => ({
    current: sGetCurrent(state),
})

const mapDispatchToProps = (dispatch) => ({
    onRenameVisualization: (details) =>
        dispatch(fromActions.tDoRenameVisualization(details)),
    onSaveVisualization: (details = {}, copy) =>
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
