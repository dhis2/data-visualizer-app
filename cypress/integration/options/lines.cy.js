import { DIMENSION_ID_DATA, VIS_TYPE_COLUMN } from '@dhis2/analytics'

//import { createNewAO } from '../elements/FileMenu'
import { openDimension } from '../../elements/DimensionsPanel'
import {
    selectDataElements,
    clickDimensionModalUpdateButton,
} from '../../elements/DimensionModal'
import { goToStartPage } from '../../elements/StartScreen'
import {
    expectStoreConfigSeriesToHaveTrendline,
    expectStoreConfigSeriesToNotHaveTrendline,
} from '../../utils/store'
import { expectVisualizationToBeVisible } from '../../elements/Chart'
import { TEST_DATA_ELEMENTS } from '../../utils/data'
import { clickMenuBarOptionsButton } from '../../elements/MenuBar'
import {
    clickOptionsModalUpdateButton,
    clickOptionsTab,
    enableTrendLine,
    OPTIONS_TAB_DATA,
    selectTrendLineType,
} from '../../elements/OptionsModal'
import { CONFIG_DEFAULT_TREND_LINE } from '../../utils/config'

const dimensionId = DIMENSION_ID_DATA
const dataElements = TEST_DATA_ELEMENTS.slice(3, 5).map(item => item.name)

describe('Options - Lines', () => {
    it('navigates to the start page', () => {
        goToStartPage()
    })
    it('adds dimensions', () => {
        openDimension(dimensionId)

        selectDataElements(dataElements)

        clickDimensionModalUpdateButton()

        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
    })
    describe('trendline', () => {
        const optionsTab = OPTIONS_TAB_DATA
        const trendLineTypes = [
            { name: 'Polynomial', type: 'spline' },
            { name: 'Loess', type: 'spline' },
            { name: 'Linear', type: 'line' },
        ]

        it('has default value', () => {
            expectStoreConfigSeriesToNotHaveTrendline()
        })

        trendLineTypes.forEach(trendLineType => {
            describe(trendLineType.name, () => {
                it(`opens Options -> ${optionsTab}`, () => {
                    clickMenuBarOptionsButton()
                    clickOptionsTab(optionsTab)
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
                dataElements.forEach(dataElement => {
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
    // TODO: Base line and target line
})
