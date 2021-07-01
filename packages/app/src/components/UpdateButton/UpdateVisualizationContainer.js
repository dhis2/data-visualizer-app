import { connect } from 'react-redux'
import * as fromActions from '../../actions'
import {
    acSetLoadError,
    acClearLoadError,
    acSetPluginLoading,
} from '../../actions/loader'
import { CURRENT_AO_KEY } from '../../api/userDataStore'
import { GenericClientError } from '../../modules/error'
import history from '../../modules/history'
import { validateLayout } from '../../modules/layoutValidation'
import { sGetCurrent, sGetCurrentFromUi } from '../../reducers/current'

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
