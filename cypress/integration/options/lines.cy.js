import { DIMENSION_ID_DATA, VIS_TYPE_COLUMN } from '@dhis2/analytics'

//import { createNewAO } from '../elements/fileMenu'
import { openDimension } from '../../elements/dimensionsPanel'
import {
    selectDataElements,
    clickDimensionModalUpdateButton,
} from '../../elements/dimensionModal'
import { goToStartPage } from '../../elements/startScreen'
import {
    expectStoreConfigSeriesToHaveTrendline,
    expectStoreConfigSeriesToNotHaveTrendline,
} from '../../utils/store'
import { expectVisualizationToBeVisible } from '../../elements/chart'
import { TEST_DATA_ELEMENTS } from '../../utils/data'
import { clickMenuBarOptionsButton } from '../../elements/menuBar'
import {
    clickOptionsModalUpdateButton,
    clickOptionsTab,
    enableTrendLine,
    OPTIONS_TAB_DATA,
    selectTrendLineType,
} from '../../elements/optionsModal'
import { CONFIG_DEFAULT_TREND_LINE } from '../../utils/config'

const TEST_DATA_ELEMENT_NAMES = TEST_DATA_ELEMENTS.slice(2, 4).map(
    item => item.name
)

describe('Options - Lines', () => {
    it('navigates to the start page and adds data items', () => {
        goToStartPage()
        openDimension(DIMENSION_ID_DATA)
        selectDataElements(TEST_DATA_ELEMENT_NAMES)
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
    })
    describe('trendline', () => {
        const trendLineTypes = [
            { name: 'Polynomial', type: 'spline' },
            { name: 'Loess', type: 'spline' },
            { name: 'Linear', type: 'line' },
        ]

        it('has no trend line', () => {
            expectStoreConfigSeriesToNotHaveTrendline()
        })

        trendLineTypes.forEach(trendLineType => {
            describe(trendLineType.name, () => {
                it('opens Options -> Data', () => {
                    clickMenuBarOptionsButton()
                    clickOptionsTab(OPTIONS_TAB_DATA)
                })
                it('enable trendline', () => {
                    enableTrendLine()
                })
                it('select trendline type', () => {
                    selectTrendLineType(trendLineType.name)
                })
                it('click the modal update button', () => {
                    clickOptionsModalUpdateButton()
                })
                TEST_DATA_ELEMENT_NAMES.forEach(dataElement => {
                    it(`config has ${dataElement} trendline`, () => {
                        const trendline = {
                            ...CONFIG_DEFAULT_TREND_LINE,
                            type: trendLineType.type,
                            name: `${dataElement} (trend)`,
                        }
                        expectStoreConfigSeriesToHaveTrendline(trendline)
                    })
                })
            })
        })
    })
    /*  TODO: 
        - Test base line and target line like trend line (above)
        - Pie, PT, SV shouldn't have the lines section in options
        - Gauge should only display base and target line (no trend line)
    */
})
