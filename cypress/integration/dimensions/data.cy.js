import { DIMENSION_ID_DATA } from '@dhis2/analytics'
import {
    clickDimensionModalHideButton,
    expectDimensionModalToContain,
    expectDimensionModalToNotBeVisible,
    unselectItemByDoubleClick,
    selectItemByDoubleClick,
    expectDataDimensionModalToBeVisible,
    expectItemToBeSelected,
    expectDataTypeToBe,
    expectGroupSelectToNotBeVisible,
    expectNoDataItemsToBeSelected,
    expectSelectedItemsAmountToBeLeast,
    expectSelectedItemsAmountToBe,
    expectItemToBeSelectable,
    expectSelectableDataItemsAmountToBe,
    inputSearchTerm,
    switchDataTypeTo,
    clearSearchTerm,
    expectSelectableDataItemsAmountToBeLeast,
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
    expectSourceToNotBeLoading,
    unselectAllItemsByButton,
    selectAllItemsByButton,
    expectDataItemsToBeInSource,
    expectDataItemToShowDataType,
    expectDataItemToShowInfoTable,
} from '../../elements/dimensionModal/index.js'
import { openDimension } from '../../elements/dimensionsPanel.js'
import { goToStartPage } from '../../elements/startScreen.js'
import {
    TEST_DATA_ELEMENTS,
    TEST_DATA_SETS,
    TEST_INDICATORS,
} from '../../utils/data.js'

const PAGE_SIZE = 50
const DATA_ITEMS_URL = '**/dataItems*'

describe('Data dimension', () => {
    it('has correct initial state', () => {
        // navigates to the start page
        goToStartPage()

        // opens the data dimension modal
        cy.intercept('GET', DATA_ITEMS_URL).as('request')
        openDimension(DIMENSION_ID_DATA)
        cy.wait('@request').then(({ request, response }) => {
            expect(request.url).to.contain('page=1')
            expect(response.statusCode).to.eq(200)
            expect(response.body.dataItems.length).to.eq(PAGE_SIZE)
        })
        expectDataDimensionModalToBeVisible()

        // modal has a title
        expectDimensionModalToContain('Data')

        // no items are selected
        expectNoDataItemsToBeSelected()

        // data type is 'All'
        expectDataTypeToBe('All')

        // group select is not visible
        expectGroupSelectToNotBeVisible()

        // an item can be selected by double click
        const firstPageItemName = TEST_INDICATORS[0].name
        selectItemByDoubleClick(firstPageItemName)
        expectItemToBeSelected(firstPageItemName)

        // an item can be unselected by double click
        unselectItemByDoubleClick(firstPageItemName)
        expectNoDataItemsToBeSelected()

        // an item can be selected by button
        selectItemByButton(firstPageItemName)
        expectItemToBeSelected(firstPageItemName)

        // an item can be unselected by button
        unselectItemByButton(firstPageItemName)
        expectNoDataItemsToBeSelected()
    })
    it('can select all and fetch more', () => {
        goToStartPage()
        openDimension(DIMENSION_ID_DATA)
        expectDataDimensionModalToBeVisible()
        expectSelectableDataItemsAmountToBeLeast(PAGE_SIZE)

        const secondPageItemName = 'BCG doses'
        // all items can be selected
        cy.intercept('GET', DATA_ITEMS_URL).as('request')
        selectAllItemsByButton()
        expectSelectedItemsAmountToBeLeast(PAGE_SIZE)
        cy.wait('@request').then(({ request, response }) => {
            expect(request.url).to.contain('page=2')
            expect(response.statusCode).to.eq(200)
            expect(response.body.dataItems.length).to.eq(PAGE_SIZE)
        })
        expectSourceToNotBeLoading()

        // more items are fetched
        expectSelectableDataItemsAmountToBeLeast(PAGE_SIZE)
        expectItemToBeSelectable(secondPageItemName)

        // all items can be unselected
        unselectAllItemsByButton()
        expectNoDataItemsToBeSelected()

        // more items are fetched when scrolling down
        cy.intercept('GET', DATA_ITEMS_URL).as('request')
        scrollSourceToBottom()
        cy.wait('@request').then(({ request, response }) => {
            expect(request.url).to.contain('page=3')
            expect(response.statusCode).to.eq(200)
            expect(response.body.dataItems.length).to.eq(PAGE_SIZE)
        })
        expectSourceToNotBeLoading()
        expectSelectableDataItemsAmountToBeLeast(PAGE_SIZE * 3)
    })
    it('can use global search', () => {
        goToStartPage()
        openDimension(DIMENSION_ID_DATA)
        expectDataDimensionModalToBeVisible()
        expectSelectableDataItemsAmountToBeLeast(PAGE_SIZE)

        const testSearchTerm = 'Dispenser' // Use a data element for the third step to work
        // receives a search term
        cy.intercept('GET', DATA_ITEMS_URL).as('request')
        inputSearchTerm(testSearchTerm)
        cy.wait('@request').then(({ request, response }) => {
            expect(request.url).to.contain('page=1')
            expect(request.url).to.contain(testSearchTerm)
            expect(response.statusCode).to.eq(200)
            expect(response.body.dataItems.length).to.eq(1)
        })
        expectSourceToNotBeLoading()

        // TODO: Test that the search is only called once, i.e. debounce works
        // search result is displayed
        expectSelectableDataItemsAmountToBe(1)
        expectItemToBeSelectable(testSearchTerm)

        // search result is maintained when switching data type
        cy.intercept('GET', '**/dataElements*').as('dataElements')
        switchDataTypeTo('Data elements')
        cy.wait('@dataElements').then(({ request, response }) => {
            expect(request.url).to.contain('page=1')
            expect(response.statusCode).to.eq(200)
            expect(response.body.dataElements.length).to.be.eq(1)
        })
        expectSourceToNotBeLoading()
        expectSelectableDataItemsAmountToBe(1)
        expectItemToBeSelectable(testSearchTerm)
        clearSearchTerm()
        cy.wait('@dataElements').then(({ request, response }) => {
            expect(request.url).to.contain('page=1')
            expect(response.statusCode).to.eq(200)
            expect(response.body.dataElements.length).to.be.eq(PAGE_SIZE)
        })
        expectSourceToNotBeLoading()
        cy.intercept('GET', DATA_ITEMS_URL).as('dataItems')
        switchDataTypeToAll()
        cy.wait('@dataItems').then(({ request, response }) => {
            expect(request.url).to.contain('page=1')
            expect(response.statusCode).to.eq(200)
            expect(response.body.dataItems.length).to.eq(PAGE_SIZE)
        })
        expectSelectableDataItemsAmountToBeLeast(PAGE_SIZE)
        expectSourceToNotBeLoading()

        // search displays a correct error message
        const testSearchTermWithNoMatch = 'nomatch'
        cy.intercept('GET', DATA_ITEMS_URL).as('requestNoMatch')
        inputSearchTerm(testSearchTermWithNoMatch)
        cy.wait('@requestNoMatch').then(({ request, response }) => {
            expect(request.url).to.contain('page=1')
            expect(request.url).to.contain(testSearchTermWithNoMatch)
            expect(response.statusCode).to.eq(200)
            expect(response.body.dataItems.length).to.eq(0)
        })
        expectSourceToNotBeLoading()
        expectEmptySourceMessageToBe(
            `Nothing found for "${testSearchTermWithNoMatch}"`
        )

        // search result can be cleared
        cy.intercept('GET', DATA_ITEMS_URL).as('requestClear')
        clearSearchTerm()
        cy.wait('@requestClear').then(({ request, response }) => {
            expect(request.url).to.contain('page=1')
            expect(response.statusCode).to.eq(200)
            expect(response.body.dataItems.length).to.be.eq(PAGE_SIZE)
        })
        expectSourceToNotBeLoading()
        expectSelectableDataItemsAmountToBeLeast(PAGE_SIZE)
    })
    const testDataTypes = [
        {
            name: 'Indicators',
            testGroup: { name: 'Facility infrastructure', itemAmount: 3 },
            testItem: { ...TEST_INDICATORS[2], type: 'Indicator' },
            defaultGroup: { name: 'All groups' },
            endpoint: {
                hasMultiplePages: true,
                requestUrl: '**/indicators*',
                responseBody: 'indicators',
            },
        },
        {
            name: 'Data elements',
            testGroup: { name: 'Measles', itemAmount: 3 },
            testSubGroup: {
                name: 'Details only',
                itemAmount: 10,
                endpoint: {
                    hasMultiplePages: true,
                    requestUrl: '**/dataElementOperands*',
                    responseBody: 'dataElementOperands',
                },
            },
            testItem: {
                ...TEST_DATA_ELEMENTS[2],
                type: 'Data element',
            },
            defaultGroup: { name: 'All groups' },
            defaultSubGroup: { name: 'Totals only' },
            endpoint: {
                hasMultiplePages: true,
                requestUrl: '**/dataElements*',
                responseBody: 'dataElements',
            },
        },
        {
            name: 'Data sets',
            testGroup: { name: 'Child Health', itemAmount: 5 },
            testSubGroup: { name: 'Actual reports', itemAmount: 1 },
            testItem: { ...TEST_DATA_SETS[2], type: 'Data set' },
            defaultGroup: { name: 'All data sets' },
            defaultSubGroup: { name: 'All metrics' },
            endpoint: {
                hasMultiplePages: false,
                requestUrl: '**/dataSets*',
                responseBody: 'dataSets',
            },
        },
        {
            name: 'Event data items',
            testGroup: { name: 'Information Campaign', itemAmount: 6 },
            testItem: {
                id: 'V4xUtHrsVaK.w75KJ2mc4zz',
                name: 'E2E TE program 1 First name',
                type: 'Event data item',
            },
            defaultGroup: { name: 'All programs' },
            endpoint: {
                hasMultiplePages: true,
                requestUrl: DATA_ITEMS_URL,
                responseBody: 'dataItems',
            },
        },
        {
            name: 'Program indicators',
            testGroup: { name: 'Malaria focus investigation', itemAmount: 6 },
            testItem: {
                id: 'Thkx2BnO5Kq',
                name: 'BMI male',
                type: 'Program indicator',
            },
            defaultGroup: { name: 'All programs' },
            endpoint: {
                hasMultiplePages: true,
                requestUrl: DATA_ITEMS_URL,
                responseBody: 'dataItems',
            },
        },
    ]
    testDataTypes.forEach((testDataType) => {
        it(`displays ${testDataType.name} correctly`, () => {
            // opens the data dimension modal
            goToStartPage()
            openDimension(DIMENSION_ID_DATA)
            expectDataDimensionModalToBeVisible()

            // switches to type
            cy.log(`type: ${testDataType.name}`)
            cy.intercept('GET', testDataType.endpoint.requestUrl).as('request')
            switchDataTypeTo(testDataType.name)
            cy.wait('@request').then(({ response }) => {
                expect(response.statusCode).to.eq(200)
                expect(
                    response.body[testDataType.endpoint.responseBody].length
                ).to.be.least(1)
            })
            expectSourceToNotBeLoading()
            expectSelectableDataItemsAmountToBeLeast(PAGE_SIZE)

            // group select is visible
            expectGroupSelectToBeVisible()
            expectGroupSelectToBe(testDataType.defaultGroup.name)

            if (testDataType.endpoint.hasMultiplePages) {
                // more items are fetched when scrolling down
                cy.intercept('GET', testDataType.endpoint.requestUrl).as(
                    'requestSecondPage'
                )
                scrollSourceToBottom()
                cy.wait('@requestSecondPage').then(({ request, response }) => {
                    expect(request.url).to.contain('page=2')
                    expect(response.statusCode).to.eq(200)
                    expect(
                        response.body[testDataType.endpoint.responseBody].length
                    ).to.be.least(1)
                })
                expectSourceToNotBeLoading()
                expectSelectableDataItemsAmountToBeLeast(PAGE_SIZE + 1)
            }

            // data type is shown
            expectDataItemToShowDataType(
                testDataType.testItem.id,
                testDataType.testItem.type
            )

            expectDataItemToShowInfoTable(testDataType.testItem.id)

            // an item can be selected
            expectDataItemsToBeInSource([testDataType.testItem.name])
            selectItemByDoubleClick(testDataType.testItem.name)
            expectItemToBeSelected(testDataType.testItem.name)

            // group can be changed
            cy.log(`group: ${testDataType.testGroup.name}`)
            cy.intercept('GET', testDataType.endpoint.requestUrl).as(
                'requestWithGroup'
            )
            switchGroupTo(testDataType.testGroup.name)
            cy.wait('@requestWithGroup').then(({ request, response }) => {
                expect(request.url).to.contain('page=1')
                expect(response.statusCode).to.eq(200)
            })
            expectSourceToNotBeLoading()
            expectGroupSelectToBe(testDataType.testGroup.name)
            cy.getBySel('data-dimension-transfer-sourceoptions').trigger(
                'mouseover'
            ) // seems to trigger Cypress to refretch the list and update the result so it's no longer stale
            expectSelectableDataItemsAmountToBe(
                testDataType.testGroup.itemAmount
            )
            expectItemToBeSelected(testDataType.testItem.name)

            // the first item can be selected
            selectFirstDataItem()
            expectSelectedItemsAmountToBe(2)
            expectSelectableDataItemsAmountToBe(
                testDataType.testGroup.itemAmount - 1
            )

            if (['Data elements', 'Data sets'].includes(testDataType.name)) {
                // sub group select is visible
                expectSubGroupSelectToBeVisible()
                expectSubGroupSelectToBe(testDataType.defaultSubGroup.name)

                // sub group can be changed
                cy.log(`sub group: ${testDataType.testSubGroup.name}`)
                cy.intercept(
                    'GET',
                    testDataType.testSubGroup.endpoint?.requestUrl ||
                        testDataType.endpoint.requestUrl
                ).as('requestWithSubGroup')
                switchSubGroupTo(testDataType.testSubGroup.name)
                cy.wait('@requestWithSubGroup').then(
                    ({ request, response }) => {
                        expect(request.url).to.contain('page=1')
                        expect(response.statusCode).to.eq(200)
                        expect(
                            response.body[
                                testDataType.testSubGroup.endpoint
                                    ?.responseBody ||
                                    testDataType.endpoint.responseBody
                            ].length
                        ).to.be.eq(testDataType.testSubGroup.itemAmount)
                    }
                )
                expectSourceToNotBeLoading()
                expectSubGroupSelectToBe(testDataType.testSubGroup.name)
                expectSelectableDataItemsAmountToBe(
                    testDataType.testSubGroup.itemAmount
                )
                expectItemToBeSelected(testDataType.testItem.name)

                // sub group can be changed back to default
                cy.log(
                    `default sub group: ${testDataType.defaultSubGroup.name}`
                )
                cy.intercept('GET', testDataType.endpoint.requestUrl).as(
                    'requestDefaultSubGroup'
                )
                switchSubGroupTo(testDataType.defaultSubGroup.name)
                cy.wait('@requestDefaultSubGroup').then(
                    ({ request, response }) => {
                        expect(request.url).to.contain('page=1')
                        expect(response.statusCode).to.eq(200)
                    }
                )
                expectSourceToNotBeLoading()
                expectSubGroupSelectToBe(testDataType.defaultSubGroup.name)
                expectSelectableDataItemsAmountToBe(
                    testDataType.testGroup.itemAmount - 1
                )
                expectItemToBeSelected(testDataType.testItem.name)
            }
            // search displays a correct error message
            const testSearchTermWithNoMatch = 'nomatch'
            cy.intercept('GET', testDataType.endpoint.requestUrl).as(
                'requestNoMatch'
            )
            inputSearchTerm(testSearchTermWithNoMatch)
            cy.wait('@requestNoMatch').then(({ request, response }) => {
                expect(request.url).to.contain('page=1')
                expect(request.url).to.contain(testSearchTermWithNoMatch)
                expect(response.statusCode).to.eq(200)
                expect(
                    response.body[testDataType.endpoint.responseBody].length
                ).to.eq(0)
            })
            expectSourceToNotBeLoading()
            expectEmptySourceMessageToBe(
                `No ${testDataType.name.toLowerCase()} found for "${testSearchTermWithNoMatch}"`
            )

            // selection and filter can be reset
            unselectAllItemsByButton()
            expectNoDataItemsToBeSelected()
            cy.intercept('GET', testDataType.endpoint.requestUrl).as(
                testDataType.endpoint.requestUrl
            )
            clearSearchTerm()
            cy.wait(`@${testDataType.endpoint.requestUrl}`).then(
                ({ request, response }) => {
                    expect(request.url).to.contain('page=1')
                    expect(response.statusCode).to.eq(200)
                }
            )
            expectSourceToNotBeLoading()
            expectSelectableDataItemsAmountToBe(
                testDataType.testGroup.itemAmount
            )
            switchGroupToAll()
            cy.wait(`@${testDataType.endpoint.requestUrl}`).then(
                ({ request, response }) => {
                    expect(request.url).to.contain('page=1')
                    expect(response.statusCode).to.eq(200)
                }
            )
            expectSourceToNotBeLoading()
            expectSelectableDataItemsAmountToBeLeast(PAGE_SIZE)
            if (testDataType.endpoint.requestUrl !== DATA_ITEMS_URL) {
                cy.intercept('GET', DATA_ITEMS_URL).as('**/dataItems*')
            }
            switchDataTypeToAll()
            cy.wait('@**/dataItems*').then(({ request, response }) => {
                expect(request.url).to.contain('page=1')
                expect(response.statusCode).to.eq(200)
                expect(response.body.dataItems.length).to.eq(PAGE_SIZE)
            })
            expectSourceToNotBeLoading()
            expectSelectableDataItemsAmountToBeLeast(PAGE_SIZE)

            // modal is closed
            clickDimensionModalHideButton()
            expectDimensionModalToNotBeVisible()
        })
    })
})
