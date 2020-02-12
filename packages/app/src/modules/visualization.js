import options from './options'

export const getVisualizationFromCurrent = current => {
    const nonSavableOptions = Object.keys(options).filter(
        option => !option.savable
    )

    nonSavableOptions.forEach(option => delete current[option])
    console.log('current for saving', current)
    return current
}
