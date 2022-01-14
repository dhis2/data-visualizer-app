import {
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_COLUMN,
    VIS_TYPE_STACKED_COLUMN,
    VIS_TYPE_BAR,
    VIS_TYPE_STACKED_BAR,
    VIS_TYPE_LINE,
    VIS_TYPE_AREA,
    VIS_TYPE_STACKED_AREA,
    VIS_TYPE_PIE,
    VIS_TYPE_RADAR,
    VIS_TYPE_GAUGE,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_SCATTER,
} from '@dhis2/analytics'

const visTypes = [
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_COLUMN,
    VIS_TYPE_STACKED_COLUMN,
    VIS_TYPE_BAR,
    VIS_TYPE_STACKED_BAR,
    VIS_TYPE_LINE,
    VIS_TYPE_AREA,
    VIS_TYPE_STACKED_AREA,
    VIS_TYPE_PIE,
    VIS_TYPE_RADAR,
    VIS_TYPE_GAUGE,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_SCATTER,
]

export const generateRandomChar = () =>
    Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 1)

export const generateRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

export const getRandomArrayItem = (array) =>
    array[generateRandomNumber(0, array.length - 1)]

export const getRandomVisType = () => getRandomArrayItem(visTypes)

export const generateRandomBool = () => Math.random() < 0.5
