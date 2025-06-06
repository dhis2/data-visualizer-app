import { combineReducers } from 'redux'
import current, * as fromCurrent from './current.js'
import dimensions, * as fromDimensions from './dimensions.js'
import loader, * as fromLoader from './loader.js'
import metadata, * as fromMetadata from './metadata.js'
import recommendedIds, * as fromRecommendedIds from './recommendedIds.js'
import settings, * as fromSettings from './settings.js'
import snackbar, * as fromSnackbar from './snackbar.js'
import ui, * as fromUi from './ui.js'
import visualization, * as fromVisualization from './visualization.js'

// Reducers

export default combineReducers({
    visualization,
    current,
    dimensions,
    recommendedIds,
    ui,
    metadata,
    settings,
    snackbar,
    loader,
})

// Selectors

export {
    fromVisualization,
    fromCurrent,
    fromDimensions,
    fromRecommendedIds,
    fromUi,
    fromMetadata,
    fromSettings,
    fromSnackbar,
    fromLoader,
}

export const sGetSeriesSetupItems = (state) =>
    fromUi.sGetAxisSetup(state).map((item) => ({
        dimensionItem: item.id,
        axis: item.axis,
        name: fromMetadata.sGetMetadata(state)[item.id]?.name,
    }))
