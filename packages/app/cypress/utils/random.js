import { visTypes } from './visTypes'

export const generateRandomChar = () =>
    Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 1)

export const generateRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

export const getRandomVisType = () =>
    visTypes[generateRandomNumber(0, visTypes.length)]
