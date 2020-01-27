import { connect } from 'react-redux'

import { sGetCurrent, sGetCurrentFromUi } from '../../reducers/current'
import * as fromActions from '../../actions'
import { validateLayout } from '../../modules/layoutValidation'
import { acSetLoadError, acClearLoadError } from '../../actions/loader'
import history from '../../modules/history'
import { CURRENT_AO_KEY } from '../../api/userDataStore'
import { GenericClientError } from '../../modules/error'

const UpdateVisualizationContainer = ({
    renderComponent,
    getCurrent,
    getCurrentFromUi,
    onUpdate,
    acSetLoadError,
    acClearLoadError,
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
}

export default connect(null, mapDispatchToProps)(UpdateVisualizationContainer)
