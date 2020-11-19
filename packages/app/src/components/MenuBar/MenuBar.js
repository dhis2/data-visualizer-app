import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FileMenu from '@dhis2/d2-ui-file-menu'
import i18n from '@dhis2/d2-i18n'

import UpdateButton from '../UpdateButton/UpdateButton'
import DownloadMenu from '../DownloadMenu/DownloadMenu'
import InterpretationsButton from '../Interpretations/InterpretationsButton'
import VisualizationOptionsManager from '../VisualizationOptions/VisualizationOptionsManager'
import UpdateVisualizationContainer from '../UpdateButton/UpdateVisualizationContainer'
import * as fromActions from '../../actions'
import { sGetCurrent } from '../../reducers/current'
import history from '../../modules/history'
import { getErrorVariantByStatusCode } from '../../modules/error'

import styles from './styles/MenuBar.module.css'

const onOpen = id => {
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
const getOnRename = props => details => props.onRenameVisualization(details)
const getOnSave = props => details => props.onSaveVisualization(details, false)
const getOnSaveAs = props => details => props.onSaveVisualization(details, true)
const getOnDelete = props => () => props.onDeleteVisualization()
const getOnError = props => error => props.onError(error)

export const MenuBar = ({ dataTest, ...props }, context) => (
    <div className={styles.menuBar} data-test={dataTest}>
        <UpdateVisualizationContainer
            renderComponent={handler => (
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
            fileId={props.id || null}
            fileType={props.apiObjectName}
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

MenuBar.propTypes = {
    apiObjectName: PropTypes.string,
    dataTest: PropTypes.string,
    id: PropTypes.string,
}

MenuBar.contextTypes = {
    d2: PropTypes.object,
}

const mapStateToProps = state => ({
    id: (sGetCurrent(state) || {}).id,
})

const mapDispatchToProps = dispatch => ({
    onRenameVisualization: details =>
        dispatch(fromActions.tDoRenameVisualization(details)),
    onSaveVisualization: (details, copy) =>
        dispatch(fromActions.tDoSaveVisualization(details, copy)),
    onDeleteVisualization: () => dispatch(fromActions.tDoDeleteVisualization()),
    onError: error => {
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
