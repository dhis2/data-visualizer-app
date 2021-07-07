import { visTypeDisplayNames, VIS_TYPE_SCATTER } from '@dhis2/analytics'

export const generateRandomChar = () =>
    Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 1)

export const generateRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

export const getRandomArrayItem = array =>
    array[generateRandomNumber(0, array.length - 1)]

export const getRandomVisType = (includeScatter = true) => {
    const names = Object.assign({}, visTypeDisplayNames)
    if (!includeScatter) {
        delete names[VIS_TYPE_SCATTER]
    }
    return getRandomArrayItem(Object.keys(names))
}

export const generateRandomBool = () => Math.random() < 0.5
