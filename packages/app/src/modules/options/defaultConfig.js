import getAdvancedSection from './sections/advanced.js'
import getChartStyleSection from './sections/chartStyle.js'
import getColorSetSection from './sections/colorSet.js'
import getDisplaySection from './sections/display.js'
import getDomainAxisSection from './sections/domainAxis.js'
import getLinesSection from './sections/lines.js'
import getRangeAxisSection from './sections/rangeAxis.js'
import getTitlesSection from './sections/titles.js'
import getAxesTab from './tabs/axes.js'
import getDataTab from './tabs/data.js'
import getLegendTab from './tabs/legend.js'
import getLimitValuesTab from './tabs/limitValues.js'
import getSeriesTab from './tabs/series.js'
import getStyleTab from './tabs/style.js'

export default ({
    hasDisabledSections,
    supportsMultiAxes,
    supportsMultiType,
    isColumnBased,
    isStacked,
    supportsLegends,
    rangeAxisIds = [],
    isVertical,
} = {}) => [
    getDataTab([
        getDisplaySection(isStacked),
        getLinesSection(hasDisabledSections, 'RANGE_0'),
        getAdvancedSection(),
    ]),
    ...(supportsLegends ? [getLegendTab({ hideStyleOptions: true })] : []),
    getAxesTab([
        ...rangeAxisIds.map((id) =>
            getRangeAxisSection({
                axisId: `RANGE_${id}`,
                isVertical,
                showLines: hasDisabledSections,
                hasCustomAxes:
                    rangeAxisIds.length > 1 ||
                    rangeAxisIds.some((id) => id > 0),
            })
        ),
        getDomainAxisSection({ axisId: 'DOMAIN_0', isVertical }),
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
    getLimitValuesTab(),
]
