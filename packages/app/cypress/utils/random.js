import { visTypes } from './visTypes'

export const generateRandomChar = () =>
    Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 1)

export const generateRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

export const getRandomArrayItem = array =>
    array[generateRandomNumber(0, array.length - 1)]

export const getRandomVisType = () => getRandomArrayItem(visTypes)
