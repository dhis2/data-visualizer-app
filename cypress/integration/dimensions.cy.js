import { DIMENSION_ID_DATA } from '@dhis2/analytics'
import {
    clickDimensionModalHideButton,
    expectDimensionModalToContain,
    expectDimensionModalToNotBeVisible,
    unselectItemByDoubleClick,
    selectItemByDoubleClick,
    expectDataDimensionModalToBeVisible,
    expectDataItemToBeSelected,
    expectDataTypeToBe,
    expectGroupSelectToNotBeVisible,
    expectNoDataItemsToBeSelected,
    selectAllDataItems,
    unselectAllDataItems,
    expectDataItemsSelectedAmountToBeLeast,
    expectDataItemsSelectedAmountToBe,
    expectDataItemToBeSelectable,
    expectDataItemsSelectableAmountToBe,
    inputSearchTerm,
    switchDataTypeTo,
    clearSearchTerm,
    expectDataItemsSelectableAmountToBeLeast,
    expectGroupSelectToBeVisible,
    switchGroupTo,
    selectFirstDataItem,
    expectGroupSelectToBe,
    expectEmptySourceMessageToBe,
    switchGroupToAll,
    switchDataTypeToAll,
    scrollSourceToBottom,
    unselectItemByButton,
    selectItemByButton,
    expectSubGroupSelectToBeVisible,
    expectSubGroupSelectToBe,
    switchSubGroupTo,
} from '../elements/dimensionModal'
import { openDimension } from '../elements/dimensionsPanel'
import { goToStartPage } from '../elements/startScreen'
import {
    TEST_DATA_ELEMENTS,
    TEST_DATA_SETS,
    TEST_INDICATORS,
} from '../utils/data'

const PAGE_SIZE = 50

describe('Data dimension', () => {
    describe('initial state', () => {
        it('navigates to the start page', () => {
            goToStartPage()
        })
        it('opens the data dimension modal', () => {
            cy.intercept('GET', '/dataItems').as('dataItems')
            openDimension(DIMENSION_ID_DATA)
            cy.wait('@dataItems').then(({ request, response }) => {
                expect(request.url).to.contain('page=1')
                expect(response.statusCode).to.eq(200)
                expect(response.body.dataItems.length).to.eq(PAGE_SIZE)
            })
            expectDataDimensionModalToBeVisible()
        })
        it('modal has a title', () => {
            expectDimensionModalToContain('Data')
        })
        it('no items are selected', () => {
            expectNoDataItemsToBeSelected()
        })
        it("data type is 'All'", () => {
            expectDataTypeToBe('All')
        })
        it('group select is not visible', () => {
            expectGroupSelectToNotBeVisible()
        })
        const firstPageItemName = TEST_INDICATORS[0].name
        it('an item can be selected by double click', () => {
            selectItemByDoubleClick(firstPageItemName)
            expectDataItemToBeSelected(firstPageItemName)
        })
        it('an item can be unselected by double click', () => {
            unselectItemByDoubleClick(firstPageItemName)
            expectNoDataItemsToBeSelected()
        })
        it('an item can be selected by button', () => {
            selectItemByButton(firstPageItemName)
            expectDataItemToBeSelected(firstPageItemName)
        })
        it('an item can be unselected by button', () => {
            unselectItemByButton(firstPageItemName)
            expectNoDataItemsToBeSelected()
        })
    })
    describe('selecting all and fetching more', () => {
        const secondPageItemName = 'BCG doses'
        it('all items can be selected', () => {
            cy.intercept('GET', '/dataItems').as('dataItems')
            selectAllDataItems()
            expectDataItemsSelectedAmountToBeLeast(PAGE_SIZE)
            cy.wait('@dataItems').then(({ request, response }) => {
                expect(request.url).to.contain('page=2')
                expect(response.statusCode).to.eq(200)
                expect(response.body.dataItems.length).to.eq(PAGE_SIZE)
            })
        })
        it('more items are fetched', () => {
            expectDataItemsSelectableAmountToBeLeast(PAGE_SIZE)
            expectDataItemToBeSelectable(secondPageItemName)
        })
        it('all items can be unselected', () => {
            unselectAllDataItems()
            expectNoDataItemsToBeSelected()
        })
        it('more items are fetched when scrolling down', () => {
            cy.intercept('GET', '/dataItems').as('request')
            scrollSourceToBottom()
            cy.wait('@request').then(({ request, response }) => {
                expect(request.url).to.contain('page=3')
                expect(response.statusCode).to.eq(200)
                expect(response.body.dataItems.length).to.eq(PAGE_SIZE)
            })
            expectDataItemsSelectableAmountToBeLeast(PAGE_SIZE * 3)
        })
    })
    describe('global search', () => {
        const testSearchTerm = 'Dispenser' // Use a data element for the third step to work
        it('recieves a search term', () => inputSearchTerm(testSearchTerm))
        // TODO: Test that the search is only called once, i.e. debounce works
        it('search result is displayed', () => {
            expectDataItemsSelectableAmountToBe(1)
            expectDataItemToBeSelectable(testSearchTerm)
        })
        it('search result is maintained when switching data type', () => {
            switchDataTypeTo('Data elements')
            expectDataItemsSelectableAmountToBe(1)
            expectDataItemToBeSelectable(testSearchTerm)
            clearSearchTerm()
            switchDataTypeToAll()
            expectDataItemsSelectableAmountToBeLeast(PAGE_SIZE)
        })
        it('search displays a correct error message', () => {
            const testSearchTermWithNoMatch = 'nomatch'
            inputSearchTerm(testSearchTermWithNoMatch)
            expectEmptySourceMessageToBe(
                `Nothing found for "${testSearchTermWithNoMatch}"`
            )
        })
        it('search result can be cleared', () => {
            clearSearchTerm()
            expectDataItemsSelectableAmountToBeLeast(PAGE_SIZE)
        })
        it('modal is closed', () => {
            clickDimensionModalHideButton()
            expectDimensionModalToNotBeVisible()
        })
    })
    const testDataTypes = [
        {
            name: 'Indicators',
            testGroup: { name: 'Facility infrastructure', itemAmount: 3 },
            testItem: { name: TEST_INDICATORS[2].name },
            defaultGroup: { name: 'All groups' },
            endpoint: {
                hasMultiplePages: true,
                requestUrl: '/indicators',
                responseBody: 'indicators',
            },
        },
        {
            name: 'Data elements',
            testGroup: { name: 'Measles', itemAmount: 3 },
            testSubGroup: { name: 'Details only', itemAmount: '10' },
            testItem: { name: TEST_DATA_ELEMENTS[2].name },
            defaultGroup: { name: 'All groups' },
            defaultSubGroup: { name: 'Totals only' },
            endpoint: {
                hasMultiplePages: true,
                requestUrl: '/dataElements',
                responseBody: 'dataElements',
            },
        },
        {
            name: 'Data sets',
            testGroup: { name: 'Child Health', itemAmount: 5 },
            testSubGroup: { name: 'Actual reports', itemAmount: 1 },
            testItem: { name: TEST_DATA_SETS[2].name },
            defaultGroup: { name: 'All data sets' },
            defaultSubGroup: { name: 'All metrics' },
            endpoint: {
                hasMultiplePages: false,
                requestUrl: '/dataSets',
                responseBody: 'dataSets',
            },
        },
        {
            name: 'Event data items',
            testGroup: { name: 'Information Campaign', itemAmount: 6 },
            testItem: { name: 'Diagnosis (ICD-10)' },
            defaultGroup: { name: 'All programs' },
            endpoint: {
                hasMultiplePages: true,
                requestUrl: '/dataItems',
                responseBody: 'dataItems',
            },
        },
        {
            name: 'Program indicators',
            testGroup: { name: 'Malaria focus investigation', itemAmount: 3 },
            testItem: { name: 'BMI male' },
            defaultGroup: { name: 'All programs' },
            endpoint: {
                hasMultiplePages: true,
                requestUrl: '/dataItems',
                responseBody: 'dataItems',
            },
        },
    ]
    testDataTypes.forEach(testDataType => {
        describe(`${testDataType.name}`, () => {
            it('opens the data dimension modal', () => {
                openDimension(DIMENSION_ID_DATA)
                expectDataDimensionModalToBeVisible()
            })
            it(`switches to ${testDataType.name}`, () => {
                switchDataTypeTo(testDataType.name)
                expectDataItemsSelectableAmountToBeLeast(PAGE_SIZE)
            })
            it('group select is visible', () => {
                expectGroupSelectToBeVisible()
                expectGroupSelectToBe(testDataType.defaultGroup.name)
            })
            if (testDataType.endpoint.hasMultiplePages) {
                it('more items are fetched when scrolling down', () => {
                    cy.intercept('GET', testDataType.endpoint.requestUrl).as(
                        'request'
                    )
                    scrollSourceToBottom()
                    cy.wait('@request').then(({ request, response }) => {
                        expect(request.url).to.contain('page=2')
                        expect(response.statusCode).to.eq(200)
                        expect(
                            response.body[testDataType.endpoint.responseBody]
                                .length
                        ).to.be.least(1)
                    })
                    expectDataItemsSelectableAmountToBeLeast(PAGE_SIZE + 1)
                })
            }
            it('an item can be selected', () => {
                selectItemByDoubleClick(testDataType.testItem.name)
                expectDataItemToBeSelected(testDataType.testItem.name)
            })
            it(`group can be changed to "${testDataType.testGroup.name}"`, () => {
                switchGroupTo(testDataType.testGroup.name)
                expectGroupSelectToBe(testDataType.testGroup.name)
                expectDataItemsSelectableAmountToBe(
                    testDataType.testGroup.itemAmount
                )
                expectDataItemToBeSelected(testDataType.testItem.name)
            })
            it('the first item can be selected', () => {
                selectFirstDataItem()
                expectDataItemsSelectedAmountToBe(2)
                expectDataItemsSelectableAmountToBe(
                    testDataType.testGroup.itemAmount - 1
                )
            })
            if (['Data elements', 'Data sets'].includes(testDataType.name)) {
                it('sub group select is visible', () => {
                    expectSubGroupSelectToBeVisible()
                    expectSubGroupSelectToBe(testDataType.defaultSubGroup.name)
                })

                it(`sub group can be changed to "${testDataType.testSubGroup.name}"`, () => {
                    switchSubGroupTo(testDataType.testSubGroup.name)
                    expectSubGroupSelectToBe(testDataType.testSubGroup.name)
                    expectDataItemsSelectableAmountToBe(
                        testDataType.testSubGroup.itemAmount
                    )
                    expectDataItemToBeSelected(testDataType.testItem.name)
                })
                it(`sub group can be changed back to "${testDataType.defaultSubGroup.name}"`, () => {
                    switchSubGroupTo(testDataType.defaultSubGroup.name)
                    expectSubGroupSelectToBe(testDataType.defaultSubGroup.name)
                    expectDataItemsSelectableAmountToBe(
                        testDataType.testGroup.itemAmount - 1
                    )
                    expectDataItemToBeSelected(testDataType.testItem.name)
                })
            }
            it('search displays a correct error message', () => {
                const testSearchTermWithNoMatch = 'nomatch'
                inputSearchTerm(testSearchTermWithNoMatch)
                expectEmptySourceMessageToBe(
                    `No ${testDataType.name.toLowerCase()} found for "${testSearchTermWithNoMatch}"`
                )
            })
            it('selection and filter can be reset', () => {
                unselectAllDataItems()
                expectNoDataItemsToBeSelected()
                clearSearchTerm()
                expectDataItemsSelectableAmountToBe(
                    testDataType.testGroup.itemAmount
                )
                switchGroupToAll()
                expectDataItemsSelectableAmountToBeLeast(PAGE_SIZE)
                switchDataTypeToAll()
                expectDataItemsSelectableAmountToBeLeast(PAGE_SIZE)
            })
            it('modal is closed', () => {
                clickDimensionModalHideButton()
                expectDimensionModalToNotBeVisible()
            })
        })
    })
})
