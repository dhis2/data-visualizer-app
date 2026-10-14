import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { acSetUiOptions } from '../../../../actions/ui.js'
import {
    OPTION_COLOR_MODE,
    OPTION_COLOR_SET,
    OPTION_SERIES,
} from '../../../../modules/options.js'
import { getInitialColourOptions } from '../../../../modules/seriesColors.js'
import { sGetUiOptions } from '../../../../reducers/ui.js'
import { sGetVisualization } from '../../../../reducers/visualization.js'

// Both colour tabs call this; it fills in colour options whenever a chart has none
// (first open, or another chart loaded while the tab stays open)
export const useColourOptionsInit = ({ enabled = true } = {}) => {
    const dispatch = useDispatch()
    const options = useSelector(sGetUiOptions)
    const colorMode = options[OPTION_COLOR_MODE]
    const isSaved = useSelector((state) =>
        Boolean(sGetVisualization(state)?.id)
    )

    useEffect(() => {
        if (enabled && !colorMode) {
            dispatch(
                acSetUiOptions(
                    getInitialColourOptions({
                        colorSet: options[OPTION_COLOR_SET],
                        series: options[OPTION_SERIES],
                        isSaved,
                    })
                )
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, colorMode])
}
