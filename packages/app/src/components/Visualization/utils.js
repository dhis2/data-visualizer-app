export const matchVisualizationWithType = (
    visualizations,
    visualizationsWithType
) => {
    const result = []
    visualizations.forEach((visualization) => {
        const type = visualizationsWithType.find(
            (visWithType) => visWithType.id === visualization.id
        )?.type
        if (type) {
            result.push({
                ...visualization,
                type,
            })
        }
    })
    return result
}
