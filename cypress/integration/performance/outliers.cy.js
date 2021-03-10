import {
    DIMENSION_ID_DATA,
    DIMENSION_ID_ORGUNIT,
    visTypeDisplayNames,
    VIS_TYPE_SCATTER,
} from '@dhis2/analytics'

import { openDimension } from '../../elements/dimensionsPanel'
import {
    selectIndicators,
    switchDataTab,
    expectOrgUnitDimensionModalToBeVisible,
    selectOrgUnitLevel,
    clickDimensionModalHideButton,
    expectDimensionModalToNotBeVisible,
    selectItemByDoubleClick,
} from '../../elements/dimensionModal'
import { changeVisType } from '../../elements/visualizationTypeSelector'
import { goToStartPage } from '../../elements/startScreen'
import { expectVisualizationToBeVisible } from '../../elements/chart'
import { TEST_INDICATORS } from '../../utils/data'
import {
    clickMenuBarOptionsButton,
    clickMenuBarUpdateButton,
} from '../../elements/menuBar'
import {
    expectOptionsModalToNotBeVisible,
    clickOptionsTab,
    clickOutliersCheckbox,
    OPTIONS_TAB_OUTLIERS,
    clickOptionsModalHideButton,
} from '../../elements/optionsModal'

import { expectAppToNotBeLoading } from '../../elements/common'
import { generateRandomNumber } from '../../utils/random'
import { enableTimer } from '../../support/timer'

const TEST_ITEMS = TEST_INDICATORS.slice(0, 2)
const STUB_METADATA_ITEMS = {}
const STUB_ROWS = []

// settings
const STUB_SIZE = 200
const USE_TIMER = false
const USE_NEGATIVE_VALUES = true

describe(`using Scatter and outliers with ${STUB_SIZE} org units`, () => {
    before(() => {
        if (USE_TIMER) {
            enableTimer()
        }

        for (let i = 0; i < STUB_SIZE; i++) {
            const id = 'STUB' + i
            STUB_METADATA_ITEMS[id] = {
                code: id,
                dimensionItemType: 'ORGANISATION_UNIT',
                name: id,
                totalAggregationType: 'SUM',
                uid: id,
                valueType: 'NUMBER',
            }
        }

        TEST_ITEMS.forEach(testItem =>
            Object.values(STUB_METADATA_ITEMS).forEach((stubItem, index) => {
                const outlier = generateRandomNumber(0, 100) > 99 ? 5 : 1
                const min = USE_NEGATIVE_VALUES ? -10 : 1
                STUB_ROWS.push([
                    testItem.id,
                    stubItem.uid,
                    generateRandomNumber(
                        min * index * outlier,
                        10 * index * outlier
                    ).toString(),
                ])
            })
        )
    })
    it('navigates to a new Scatter chart', () => {
        goToStartPage()
        changeVisType(visTypeDisplayNames[VIS_TYPE_SCATTER])
    })
    it('adds vertical and horizontal items', () => {
        openDimension(DIMENSION_ID_DATA)
        selectIndicators([TEST_ITEMS[0].name])
        switchDataTab('Horizontal')
        selectItemByDoubleClick(TEST_ITEMS[1].name)
        clickDimensionModalHideButton()
        expectDimensionModalToNotBeVisible()
    })
    it('Options -> Outliers -> enables outliers', () => {
        clickMenuBarOptionsButton()
        clickOptionsTab(OPTIONS_TAB_OUTLIERS)
        clickOutliersCheckbox()
        // TODO: Set more outlier options
        clickOptionsModalHideButton()
        expectOptionsModalToNotBeVisible()
    })
    const TEST_ORG_UNIT_LEVEL = 'District'
    it(`selects org unit level ${TEST_ORG_UNIT_LEVEL}`, () => {
        openDimension(DIMENSION_ID_ORGUNIT)
        expectOrgUnitDimensionModalToBeVisible()
        selectOrgUnitLevel(TEST_ORG_UNIT_LEVEL)
        expectOrgUnitDimensionModalToBeVisible()
        clickDimensionModalHideButton()
        expectDimensionModalToNotBeVisible()
    })
    it('clicks Update', () => {
        cy.intercept('GET', /analytics(\S)*skipData=true/, req => {
            req.reply(res => {
                res.body.metaData.items = {
                    ...res.body.metaData.items,
                    ...STUB_METADATA_ITEMS,
                }
                res.send({ body: res.body })
            })
        })

        cy.intercept('GET', /analytics(\S)*skipData=false/, req => {
            req.reply(res => {
                res.body.rows = [...res.body.rows, ...STUB_ROWS]
                res.send({ body: res.body })
            })
        })

        clickMenuBarUpdateButton()

        expectVisualizationToBeVisible(VIS_TYPE_SCATTER)
        expectAppToNotBeLoading()
    })
})
