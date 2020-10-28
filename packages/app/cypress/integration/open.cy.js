import { openSavedAO } from '../elements/FileMenu'
import {
    expectChartTitleToBeValue,
    expectChartToBeVisible,
} from '../elements/Chart'

describe('open', () => {
    it('loads a saved AO', () => {
        const AOName = 'ANC: 1-3 dropout rate Yearly'

        openSavedAO(AOName)

        expectChartTitleToBeValue(AOName)

        expectChartToBeVisible()
    })
})
