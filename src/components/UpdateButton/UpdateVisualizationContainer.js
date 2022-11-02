import { connect } from 'react-redux'
import * as fromActions from '../../actions/index.js'
import {
    acSetLoadError,
    acClearLoadError,
    acSetPluginLoading,
} from '../../actions/loader.js'
import { CURRENT_AO_KEY } from '../../api/userDataStore.js'
import { GenericClientError } from '../../modules/error.js'
import history from '../../modules/history.js'
import { validateLayout } from '../../modules/layoutValidation.js'
import { sGetCurrent, sGetCurrentFromUi } from '../../reducers/current.js'

const UpdateVisualizationContainer = ({
    renderComponent,
    getCurrent,
    getCurrentFromUi,
    onUpdate,
    acSetLoadError,
    acClearLoadError,
    onLoadingStart,
}) => {
    // validate layout on update
    // validation error message will be shown without loading the plugin first

    const onClick = () => {
        try {
            validateLayout(getCurrentFromUi())
            acClearLoadError()
        } catch (error) {
            acSetLoadError(error || new GenericClientError())
        }

        onLoadingStart()

        onUpdate()

        const urlContainsCurrentAOKey =
            history.location.pathname === '/' + CURRENT_AO_KEY

        const current = getCurrent()

        const pathWithoutInterpretation =
            current && current.id ? `/${current.id}` : '/'

        if (
            !urlContainsCurrentAOKey &&
            history.location.pathname !== pathWithoutInterpretation
        ) {
            history.push(pathWithoutInterpretation)
        }
    }

    return renderComponent(onClick)
}

const mapDispatchToProps = {
    getCurrent: () => (dispatch, getState) => sGetCurrent(getState()),
    getCurrentFromUi: () => (dispatch, getState) =>
        sGetCurrentFromUi(getState()),
    onUpdate: fromActions.fromCurrent.tSetCurrentFromUi,
    acSetLoadError,
    acClearLoadError,
    onLoadingStart: () => acSetPluginLoading(true),
}

export default connect(null, mapDispatchToProps)(UpdateVisualizationContainer)
