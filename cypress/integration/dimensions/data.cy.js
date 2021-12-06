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
    expectSelectableItemsAmountToBe,
    inputSearchTerm,
    switchDataTypeTo,
    clearSearchTerm,
    expectSelectableItemsAmountToBeLeast,
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
    expectSourceToBeLoading,
    expectSourceToNotBeLoading,
    unselectAllItemsByButton,
    selectAllItemsByButton,
} from '../../elements/dimensionModal'
import { openDimension } from '../../elements/dimensionsPanel'
import { goToStartPage } from '../../elements/startScreen'
import {
    TEST_DATA_ELEMENTS,
    TEST_DATA_SETS,
    TEST_INDICATORS,
} from '../../utils/data'

const PAGE_SIZE = 50
const DATA_ITEMS_URL = '/dataItems'

describe('Data dimension', () => {
    describe('initial state', () => {
        it('navigates to the start page', () => {
            goToStartPage()
        })
        it('opens the data dimension modal', () => {
            cy.intercept('GET', DATA_ITEMS_URL).as('request')
            openDimension(DIMENSION_ID_DATA)
            cy.wait('@request').then(({ request, response }) => {
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
            expectItemToBeSelected(firstPageItemName)
        })
        it('an item can be unselected by double click', () => {
            unselectItemByDoubleClick(firstPageItemName)
            expectNoDataItemsToBeSelected()
        })
        it('an item can be selected by button', () => {
            selectItemByButton(firstPageItemName)
            expectItemToBeSelected(firstPageItemName)
        })
        it('an item can be unselected by button', () => {
            unselectItemByButton(firstPageItemName)
            expectNoDataItemsToBeSelected()
        })
    })
    describe('selecting all and fetching more', () => {
        const secondPageItemName = 'BCG doses'
        it('all items can be selected', () => {
            cy.intercept('GET', DATA_ITEMS_URL).as('request')
            selectAllItemsByButton()
            expectSelectedItemsAmountToBeLeast(PAGE_SIZE)
            cy.wait('@request').then(({ request, response }) => {
                expect(request.url).to.contain('page=2')
                expect(response.statusCode).to.eq(200)
                expect(response.body.dataItems.length).to.eq(PAGE_SIZE)
            })
            expectSourceToNotBeLoading()
        })
        it('more items are fetched', () => {
            expectSelectableItemsAmountToBeLeast(PAGE_SIZE)
            expectItemToBeSelectable(secondPageItemName)
        })
        it('all items can be unselected', () => {
            unselectAllItemsByButton()
            expectNoDataItemsToBeSelected()
        })
        it('more items are fetched when scrolling down', () => {
            cy.intercept('GET', DATA_ITEMS_URL).as('request')
            scrollSourceToBottom()
            cy.wait('@request').then(({ request, response }) => {
                expect(request.url).to.contain('page=3')
                expect(response.statusCode).to.eq(200)
                expect(response.body.dataItems.length).to.eq(PAGE_SIZE)
            })
            expectSourceToNotBeLoading()
            expectSelectableItemsAmountToBeLeast(PAGE_SIZE * 3)
        })
    })
    describe('global search', () => {
        const testSearchTerm = 'Dispenser' // Use a data element for the third step to work
        it('recieves a search term', () => {
            cy.intercept('GET', DATA_ITEMS_URL).as('request')
            inputSearchTerm(testSearchTerm)
            cy.wait('@request').then(({ request, response }) => {
                expect(request.url).to.contain('page=1')
                expect(request.url).to.contain(testSearchTerm)
                expect(response.statusCode).to.eq(200)
                expect(response.body.dataItems.length).to.eq(1)
            })
            expectSourceToNotBeLoading()
        })
        // TODO: Test that the search is only called once, i.e. debounce works
        it('search result is displayed', () => {
            expectSelectableItemsAmountToBe(1)
            expectItemToBeSelectable(testSearchTerm)
        })
        it('search result is maintained when switching data type', () => {
            cy.intercept('GET', '/dataElements').as('dataElements')
            switchDataTypeTo('Data elements')
            cy.wait('@dataElements').then(({ request, response }) => {
                expect(request.url).to.contain('page=1')
                expect(response.statusCode).to.eq(200)
                expect(response.body.dataElements.length).to.be.eq(1)
            })
            expectSourceToNotBeLoading()
            expectSelectableItemsAmountToBe(1)
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
            expectSourceToNotBeLoading()
            expectSelectableItemsAmountToBeLeast(PAGE_SIZE)
        })
        it('search displays a correct error message', () => {
            const testSearchTermWithNoMatch = 'nomatch'
            cy.intercept('GET', DATA_ITEMS_URL).as('request')
            inputSearchTerm(testSearchTermWithNoMatch)
            cy.wait('@request').then(({ request, response }) => {
                expect(request.url).to.contain('page=1')
                expect(request.url).to.contain(testSearchTermWithNoMatch)
                expect(response.statusCode).to.eq(200)
                expect(response.body.dataItems.length).to.eq(0)
            })
            expectSourceToNotBeLoading()
            expectEmptySourceMessageToBe(
                `Nothing found for "${testSearchTermWithNoMatch}"`
            )
        })
        it('search result can be cleared', () => {
            cy.intercept('GET', DATA_ITEMS_URL).as('request')
            clearSearchTerm()
            cy.wait('@request').then(({ request, response }) => {
                expect(request.url).to.contain('page=1')
                expect(response.statusCode).to.eq(200)
                expect(response.body.dataItems.length).to.be.eq(PAGE_SIZE)
            })
            expectSourceToNotBeLoading()
            expectSelectableItemsAmountToBeLeast(PAGE_SIZE)
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
            testSubGroup: {
                name: 'Details only',
                itemAmount: 10,
                endpoint: {
                    hasMultiplePages: true,
                    requestUrl: '/dataElementOperands',
                    responseBody: 'dataElementOperands',
                },
            },
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
                requestUrl: DATA_ITEMS_URL,
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
                requestUrl: DATA_ITEMS_URL,
                responseBody: 'dataItems',
            },
        },
    ]
    testDataTypes.forEach((testDataType) => {
        describe(`${testDataType.name}`, () => {
            it('opens the data dimension modal', () => {
                openDimension(DIMENSION_ID_DATA)
                expectDataDimensionModalToBeVisible()
            })
            it(`switches to ${testDataType.name}`, () => {
                cy.intercept('GET', testDataType.endpoint.requestUrl).as(
                    'request'
                )
                switchDataTypeTo(testDataType.name)
                cy.wait('@request').then(({ response }) => {
                    expect(response.statusCode).to.eq(200)
                    expect(
                        response.body[testDataType.endpoint.responseBody].length
                    ).to.be.least(1)
                })
                expectSourceToNotBeLoading()
                expectSelectableItemsAmountToBeLeast(PAGE_SIZE)
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
                    expectSourceToNotBeLoading()
                    expectSelectableItemsAmountToBeLeast(PAGE_SIZE + 1)
                })
            }
            it('an item can be selected', () => {
                selectItemByDoubleClick(testDataType.testItem.name)
                expectItemToBeSelected(testDataType.testItem.name)
            })
            it(`group can be changed to "${testDataType.testGroup.name}"`, () => {
                cy.intercept('GET', testDataType.endpoint.requestUrl).as(
                    'request'
                )
                switchGroupTo(testDataType.testGroup.name)
                cy.wait('@request').then(({ request, response }) => {
                    expect(request.url).to.contain('page=1')
                    expect(response.statusCode).to.eq(200)
                })
                expectSourceToNotBeLoading()
                expectGroupSelectToBe(testDataType.testGroup.name)
                expectSelectableItemsAmountToBe(
                    testDataType.testGroup.itemAmount
                )
                expectItemToBeSelected(testDataType.testItem.name)
            })
            it('the first item can be selected', () => {
                selectFirstDataItem()
                expectSelectedItemsAmountToBe(2)
                expectSelectableItemsAmountToBe(
                    testDataType.testGroup.itemAmount - 1
                )
            })
            if (['Data elements', 'Data sets'].includes(testDataType.name)) {
                it('sub group select is visible', () => {
                    expectSubGroupSelectToBeVisible()
                    expectSubGroupSelectToBe(testDataType.defaultSubGroup.name)
                })

                it(`sub group can be changed to "${testDataType.testSubGroup.name}"`, () => {
                    cy.intercept(
                        'GET',
                        testDataType.testSubGroup.endpoint?.requestUrl ||
                            testDataType.endpoint.requestUrl
                    ).as('request')
                    switchSubGroupTo(testDataType.testSubGroup.name)
                    cy.wait('@request').then(({ request, response }) => {
                        expect(request.url).to.contain('page=1')
                        expect(response.statusCode).to.eq(200)
                        expect(
                            response.body[
                                testDataType.testSubGroup.endpoint
                                    ?.responseBody ||
                                    testDataType.endpoint.responseBody
                            ].length
                        ).to.be.eq(testDataType.testSubGroup.itemAmount)
                    })
                    expectSourceToNotBeLoading()
                    expectSubGroupSelectToBe(testDataType.testSubGroup.name)
                    expectSelectableItemsAmountToBe(
                        testDataType.testSubGroup.itemAmount
                    )
                    expectItemToBeSelected(testDataType.testItem.name)
                })
                it(`sub group can be changed back to "${testDataType.defaultSubGroup.name}"`, () => {
                    cy.intercept('GET', testDataType.endpoint.requestUrl).as(
                        'request'
                    )
                    switchSubGroupTo(testDataType.defaultSubGroup.name)
                    cy.wait('@request').then(({ request, response }) => {
                        expect(request.url).to.contain('page=1')
                        expect(response.statusCode).to.eq(200)
                    })
                    expectSourceToNotBeLoading()
                    expectSubGroupSelectToBe(testDataType.defaultSubGroup.name)
                    expectSelectableItemsAmountToBe(
                        testDataType.testGroup.itemAmount - 1
                    )
                    expectItemToBeSelected(testDataType.testItem.name)
                })
            }
            it('search displays a correct error message', () => {
                const testSearchTermWithNoMatch = 'nomatch'
                cy.intercept('GET', testDataType.endpoint.requestUrl).as(
                    'request'
                )
                inputSearchTerm(testSearchTermWithNoMatch)
                cy.wait('@request').then(({ request, response }) => {
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
            })
            it('selection and filter can be reset', () => {
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
                expectSelectableItemsAmountToBe(
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
                expectSelectableItemsAmountToBeLeast(PAGE_SIZE)
                if (testDataType.endpoint.requestUrl !== DATA_ITEMS_URL) {
                    cy.intercept('GET', DATA_ITEMS_URL).as('/dataItems')
                }
                switchDataTypeToAll()
                expectSourceToBeLoading()
                cy.wait('@/dataItems').then(({ request, response }) => {
                    expect(request.url).to.contain('page=1')
                    expect(response.statusCode).to.eq(200)
                    expect(response.body.dataItems.length).to.eq(PAGE_SIZE)
                })
                expectSourceToNotBeLoading()
                expectSelectableItemsAmountToBeLeast(PAGE_SIZE)
            })
            it('modal is closed', () => {
                clickDimensionModalHideButton()
                expectDimensionModalToNotBeVisible()
            })
        })
    })
})
