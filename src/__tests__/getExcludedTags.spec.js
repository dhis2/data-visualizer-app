import { getExcludedTags } from '../../cypress/support/getExcludedTags.js'

describe('get excluded Cypress tags', () => {
    test('instanceVersion 2.38', () => {
        expect(getExcludedTags('2.38')).toEqual([
            '<38',
            '>38',
            '>=39',
            '>39',
            '>=40',
            '>40',
            '>=41',
        ])
    })

    test('instanceVersion 2.39', () => {
        expect(getExcludedTags('2.39')).toEqual([
            '<=38',
            '<38',
            '<39',
            '>39',
            '>=40',
            '>40',
            '>=41',
        ])
    })

    test('instanceVersion 2.40', () => {
        expect(getExcludedTags('2.40')).toEqual([
            '<=38',
            '<38',
            '<=39',
            '<39',
            '<40',
            '>40',
            '>=41',
        ])
    })

    test('instanceVersion 2.41-SNAPSHOT', () => {
        expect(getExcludedTags('2.41-SNAPSHOT')).toEqual([
            '<=38',
            '<38',
            '<=39',
            '<39',
            '<40',
            '<=40',
            '<41',
        ])
    })

    test('instanceVersion dev', () => {
        expect(getExcludedTags('dev')).toEqual([
            '<=38',
            '<38',
            '<=39',
            '<39',
            '<40',
            '<=40',
            '<41',
        ])
    })

    test('instanceVersion number 2.38', () => {
        expect(getExcludedTags(2.38)).toEqual([
            '<38',
            '>38',
            '>=39',
            '>39',
            '>=40',
            '>40',
            '>=41',
        ])
    })

    // unexpected argument forms
    test('instanceVersion 38', () => {
        expect(getExcludedTags('38')).toEqual([
            '<38',
            '>38',
            '>=39',
            '>39',
            '>=40',
            '>40',
            '>=41',
        ])
    })

    test('instanceVersion 38-SNAPSHOT.2', () => {
        expect(getExcludedTags('38-SNAPSHOT.2')).toEqual([
            '<38',
            '>38',
            '>=39',
            '>39',
            '>=40',
            '>40',
            '>=41',
        ])
    })

    test('instanceVersion Dev', () => {
        expect(getExcludedTags('Dev')).toEqual([
            '<=38',
            '<38',
            '<=39',
            '<39',
            '<40',
            '<=40',
            '<41',
        ])
    })

    test('instanceVersion 2.37', () => {
        expect(() => {
            getExcludedTags('2.37')
        }).toThrow()
    })
})
