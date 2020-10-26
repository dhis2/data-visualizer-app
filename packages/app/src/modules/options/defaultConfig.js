import getLinesSection from './sections/lines'
import getVerticalAxisSection from './sections/verticalAxis'
import getHorizontalAxisSection from './sections/horizontalAxis'
import getColorSetSection from './sections/colorSet'
import getSeriesTab from './tabs/series'
import getAxesTab from './tabs/axes'
import getDataTab from './tabs/data'
import getDisplaySection from './sections/display'
import getAdvancedSection from './sections/advanced'
import getStyleTab from './tabs/style'
import getTitlesSection from './sections/titles'
import getChartStyleSection from './sections/chartStyle'
import getLegendTab from './tabs/legend'

export default ({
    hasDisabledSections,
    supportsMultiAxes,
    supportsMultiType,
    isColumnBased,
    isStacked,
    supportsLegends,
} = {}) => [
    getDataTab([
        getDisplaySection(isStacked),
        getLinesSection(hasDisabledSections),
        getAdvancedSection(),
    ]),
    ...(supportsLegends ? [getLegendTab({ hideStyleOptions: true })] : []),
    getAxesTab([
        getVerticalAxisSection(hasDisabledSections),
        getHorizontalAxisSection(),
    ]),
    getSeriesTab({
        showAxisOptions: supportsMultiAxes,
        showTypeOptions: supportsMultiType,
    }),
    getStyleTab([
        getChartStyleSection(isColumnBased),
        getTitlesSection(),
        getColorSetSection(hasDisabledSections),
    ]),
]
