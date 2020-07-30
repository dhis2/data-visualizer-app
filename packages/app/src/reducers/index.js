import { combineReducers } from 'redux'
import visualization, * as fromVisualization from './visualization'
import current, * as fromCurrent from './current'
import dimensions, * as fromDimensions from './dimensions'
import recommendedIds, * as fromRecommendedIds from './recommendedIds'
import ui, * as fromUi from './ui'
import metadata, * as fromMetadata from './metadata'
import settings, * as fromSettings from './settings'
import user, * as fromUser from './user'
import snackbar, * as fromSnackbar from './snackbar'
import loader, * as fromLoader from './loader'
import chart, * as fromChart from './chart'

// Reducers

export default combineReducers({
    visualization,
    current,
    dimensions,
    recommendedIds,
    ui,
    metadata,
    settings,
    user,
    snackbar,
    loader,
    chart,
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
    fromUser,
    fromSnackbar,
    fromLoader,
    fromChart,
}

export const sGetSeriesSetupItems = state =>
    fromUi.sGetAxisSetup(state).map(item => ({
        dimensionItem: item.id,
        axis: item.axis,
        name: fromMetadata.sGetMetadata(state)[item.id]?.name,
    }))
