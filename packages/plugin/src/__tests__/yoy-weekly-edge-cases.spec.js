import { WEEKLY } from '@dhis2/analytics'
import {
    computeYoYMatrix,
    computeGenericPeriodNamesFromMatrix,
} from '../modules/analytics.js'

// 1st january 2021 is in week 53, so last 4 weeks from that date are
// all in 2020, starting from W52 and counting 4 weeks backwards
// to avoid the 2 series to refer to the same year (2020), data for the same 4 weeks of 2019
// is fetched for the 2nd serie (2020)
// no gaps in this case
const responses20210101 = [
    {
        metaData: {
            dimensions: {
                pe: ['2020W49', '2020W50', '2020W51', '2020W52'],
            },
            items: {
                '2020W49': { name: 'Week 49 2020' },
                '2020W50': { name: 'Week 50 2020' },
                '2020W51': { name: 'Week 51 2020' },
                '2020W52': { name: 'Week 52 2020' },
            },
        },
    },
    {
        metaData: {
            dimensions: {
                pe: ['2019W49', '2019W50', '2019W51', '2019W52'],
            },
            items: {
                '2019W49': { name: 'Week 49 2019' },
                '2019W50': { name: 'Week 50 2019' },
                '2019W51': { name: 'Week 51 2019' },
                '2019W52': { name: 'Week 52 2019' },
            },
        },
    },
]

// 2020 has 53 weeks, while 2019 52
// last 4 weeks from 27th january 2021 are different for the 2 years
// for 2021: W53 of 2020 and weeks 1 to 3 of 2021
// for 2020: W52 of 2019 and weeks 1 to 3 of 2020
const responses20210127 = [
    {
        metaData: {
            dimensions: {
                pe: ['2020W53', '2021W1', '2021W2', '2021W3'],
            },
            items: {
                '2020W53': { name: 'Week 53 2020' },
                '2021W1': { name: 'Week 1 2021' },
                '2021W2': { name: 'Week 2 2021' },
                '2021W3': { name: 'Week 3 2021' },
            },
        },
    },
    {
        metaData: {
            dimensions: {
                pe: ['2019W52', '2020W1', '2020W2', '2020W3'],
            },
            items: {
                '2019W52': { name: 'Week 52 2019' },
                '2020W1': { name: 'Week 1 2020' },
                '2020W2': { name: 'Week 2 2020' },
                '2020W3': { name: 'Week 3 2020' },
            },
        },
    },
]

// 4th january 2016 is in week 1, and 2015 has 53 weeks
// last 4 weeks from the date are then weeks 50 to 53 of 2015
// 2014 does not have W53, so weeks for that year are 49 to 52
const responses20160104 = [
    {
        metaData: {
            dimensions: {
                pe: ['2015W50', '2015W51', '2015W52', '2015W53'],
            },
            items: {
                '2015W50': { name: 'Week 50 2015' },
                '2015W51': { name: 'Week 51 2015' },
                '2015W52': { name: 'Week 52 2015' },
                '2015W53': { name: 'Week 53 2015' },
            },
        },
    },
    {
        metaData: {
            dimensions: {
                pe: ['2014W49', '2014W50', '2014W51', '2014W52'],
            },
            items: {
                '2014W49': { name: 'Week 49 2014' },
                '2014W50': { name: 'Week 50 2014' },
                '2014W51': { name: 'Week 51 2014' },
                '2014W52': { name: 'Week 52 2014' },
            },
        },
    },
]

// both periods end with week 1, but they start at a different week
// due to 2015 having the extra week 53
const responses20160111 = [
    {
        metaData: {
            dimensions: {
                pe: ['2015W51', '2015W52', '2015W53', '2016W1'],
            },
            items: {
                '2015W51': { name: 'Week 51 2015' },
                '2015W52': { name: 'Week 52 2015' },
                '2015W53': { name: 'Week 53 2015' },
                '2016W1': { name: 'Week 1 2016' },
            },
        },
    },
    {
        metaData: {
            dimensions: {
                pe: ['2014W50', '2014W51', '2014W52', '2015W1'],
            },
            items: {
                '2014W50': { name: 'Week 50 2014' },
                '2014W51': { name: 'Week 51 2014' },
                '2014W52': { name: 'Week 52 2014' },
                '2015W1': { name: 'Week 1 2015' },
            },
        },
    },
]

describe('YOY edge cases testing: LAST_4_WEEKS across 2 years', () => {
    const testCases = [
        {
            responses: responses20210101,
            expectedMatrix: [
                ['2020W49', '2019W49'],
                ['2020W50', '2019W50'],
                ['2020W51', '2019W51'],
                ['2020W52', '2019W52'],
            ],
            expectedPeriodNames: ['W49', 'W50', 'W51', 'W52'],
        },
        {
            responses: responses20210127,
            expectedMatrix: [
                ['2019W52'],
                ['2020W53'],
                ['2021W1', '2020W1'],
                ['2021W2', '2020W2'],
                ['2021W3', '2020W3'],
            ],
            expectedPeriodNames: ['W52', 'W53', 'W1', 'W2', 'W3'],
        },
        {
            responses: responses20160104,
            expectedMatrix: [
                ['2014W49'],
                ['2015W50', '2014W50'],
                ['2015W51', '2014W51'],
                ['2015W52', '2014W52'],
                ['2015W53'],
            ],

            expectedPeriodNames: ['W49', 'W50', 'W51', 'W52', 'W53'],
        },
        {
            responses: responses20160111,
            expectedMatrix: [
                ['2014W50'],
                ['2015W51', '2014W51'],
                ['2015W52', '2014W52'],
                ['2015W53'],
                ['2016W1', '2015W1'],
            ],
            expectedPeriodNames: ['W50', 'W51', 'W52', 'W53', 'W1'],
        },
    ]

    testCases.forEach((testCase) =>
        it('generated correct matrix from analytics responses', () => {
            const matrix = computeYoYMatrix(testCase.responses, WEEKLY)

            expect(matrix).toEqual(testCase.expectedMatrix)
            expect(computeGenericPeriodNamesFromMatrix(matrix, WEEKLY)).toEqual(
                testCase.expectedPeriodNames
            )
        })
    )
})
