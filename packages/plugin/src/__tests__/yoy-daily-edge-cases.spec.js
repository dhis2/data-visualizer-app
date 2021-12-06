import { DAILY } from '@dhis2/analytics'
import {
    computeYoYMatrix,
    computeGenericPeriodNamesFromMatrix,
} from '../modules/analytics.js'

// 2020 is a leap year
// counting 7 days backwards from March 1st yelds:
// for 2020: the range 23/02 - 29/02
// for 2021: the range 22/02 - 28/02
const responses20200301 = [
    {
        metaData: {
            dimensions: {
                pe: [
                    '20200223',
                    '20200224',
                    '20200225',
                    '20200226',
                    '20200227',
                    '20200228',
                    '20200229',
                ],
            },
            items: {
                20200223: { name: '2020-02-23' },
                20200224: { name: '2020-02-24' },
                20200225: { name: '2020-02-25' },
                20200226: { name: '2020-02-26' },
                20200227: { name: '2020-02-27' },
                20200228: { name: '2020-02-28' },
                20200229: { name: '2020-02-29' },
            },
        },
    },
    {
        metaData: {
            dimensions: {
                pe: [
                    '20210222',
                    '20210223',
                    '20210224',
                    '20210225',
                    '20210226',
                    '20210227',
                    '20210228',
                ],
            },
            items: {
                20210222: { name: '2021-02-22' },
                20210223: { name: '2021-02-23' },
                20210224: { name: '2021-02-24' },
                20210225: { name: '2021-02-25' },
                20210226: { name: '2021-02-26' },
                20210227: { name: '2021-02-27' },
                20210228: { name: '2021-02-28' },
            },
        },
    },
]

// 2020 is a leap year
// counting 7 days backwards from March 5th yelds:
// for 2020: the range 27/02 - 04/03
// for 2021: the range 26/02 - 04/03
const responses20200305 = [
    {
        metaData: {
            dimensions: {
                pe: [
                    '20200227',
                    '20200228',
                    '20200229',
                    '20200301',
                    '20200302',
                    '20200303',
                    '20200304',
                ],
            },
            items: {
                20200227: { name: '2020-02-27' },
                20200228: { name: '2020-02-28' },
                20200229: { name: '2020-02-29' },
                20200301: { name: '2020-03-01' },
                20200302: { name: '2020-03-02' },
                20200303: { name: '2020-03-03' },
                20200304: { name: '2020-03-04' },
            },
        },
    },
    {
        metaData: {
            dimensions: {
                pe: [
                    '20210226',
                    '20210227',
                    '20210228',
                    '20210301',
                    '20210302',
                    '20210303',
                    '20210304',
                ],
            },
            items: {
                20210226: { name: '2021-02-26' },
                20210227: { name: '2021-02-27' },
                20210228: { name: '2021-02-28' },
                20210301: { name: '2021-03-01' },
                20210302: { name: '2021-03-02' },
                20210303: { name: '2021-03-03' },
                20210304: { name: '2021-03-04' },
            },
        },
    },
]

// 2020 is a leap year
// counting 7 days backwards from March 7th yelds:
// for 2020: the range 29/02 - 06/03
// for 2021: the range 28/02 - 06/03
const responses20200307 = [
    {
        metaData: {
            dimensions: {
                pe: [
                    '20200229',
                    '20200301',
                    '20200302',
                    '20200303',
                    '20200304',
                    '20200305',
                    '20200306',
                ],
            },
            items: {
                20200229: { name: '2020-02-29' },
                20200301: { name: '2020-03-01' },
                20200302: { name: '2020-03-02' },
                20200303: { name: '2020-03-03' },
                20200304: { name: '2020-03-04' },
                20200305: { name: '2020-03-05' },
                20200306: { name: '2020-03-06' },
            },
        },
    },
    {
        metaData: {
            dimensions: {
                pe: [
                    '20210228',
                    '20210301',
                    '20210302',
                    '20210303',
                    '20210304',
                    '20210305',
                    '20210306',
                ],
            },
            items: {
                20210228: { name: '2021-02-28' },
                20210301: { name: '2021-03-01' },
                20210302: { name: '2021-03-02' },
                20210303: { name: '2021-03-03' },
                20210304: { name: '2021-03-04' },
                20210305: { name: '2021-03-05' },
                20210306: { name: '2021-03-06' },
            },
        },
    },
]

describe('YOY edge cases testing: LAST_7_DAYS across february/march with leap years', () => {
    const testCases = [
        {
            responses: responses20200301,
            expectedMatrix: [
                ['20210222'],
                ['20210223', '20200223'],
                ['20210224', '20200224'],
                ['20210225', '20200225'],
                ['20210226', '20200226'],
                ['20210227', '20200227'],
                ['20210228', '20200228'],
                ['20200229'],
            ],
            expectedPeriodNames: [
                '22-02',
                '23-02',
                '24-02',
                '25-02',
                '26-02',
                '27-02',
                '28-02',
                '29-02',
            ],
        },
        {
            responses: responses20200307,
            expectedMatrix: [
                ['20210228'],
                ['20200229'],
                ['20210301', '20200301'],
                ['20210302', '20200302'],
                ['20210303', '20200303'],
                ['20210304', '20200304'],
                ['20210305', '20200305'],
                ['20210306', '20200306'],
            ],
            expectedPeriodNames: [
                '28-02',
                '29-02',
                '01-03',
                '02-03',
                '03-03',
                '04-03',
                '05-03',
                '06-03',
            ],
        },
        {
            responses: responses20200305,
            expectedMatrix: [
                ['20210226'],
                ['20210227', '20200227'],
                ['20210228', '20200228'],
                ['20200229'],
                ['20210301', '20200301'],
                ['20210302', '20200302'],
                ['20210303', '20200303'],
                ['20210304', '20200304'],
            ],
            expectedPeriodNames: [
                '26-02',
                '27-02',
                '28-02',
                '29-02',
                '01-03',
                '02-03',
                '03-03',
                '04-03',
            ],
        },
    ]

    testCases.forEach(testCase =>
        it('generated correct matrix from analytics responses', () => {
            const matrix = computeYoYMatrix(testCase.responses, DAILY)

            expect(matrix).toEqual(testCase.expectedMatrix)
            expect(computeGenericPeriodNamesFromMatrix(matrix, DAILY)).toEqual(
                testCase.expectedPeriodNames
            )
        })
    )
})
