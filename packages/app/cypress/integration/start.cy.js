import { expectChartToNotBeVisible } from '../elements/Chart'
import { expectStartScreenToBeVisible } from '../elements/StartScreen'
import { expectVisTypeToBeDefault } from '../elements/VisualizationTypeSelector'
import { expectWindowTitleToBeDefault } from '../elements/Window'
import { expectStoreCurrentToBeEmpty } from '../utils/store'

describe('start screen', () => {
    it('loads', () => {
        expectWindowTitleToBeDefault()
        expectStoreCurrentToBeEmpty()
        expectChartToNotBeVisible()
        expectStartScreenToBeVisible()
        expectVisTypeToBeDefault()

        // TODO: Check that 'Your most viewed charts and tables' contains 6 items
    })
})
