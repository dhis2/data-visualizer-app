import getAdvancedSection from './sections/advanced.jsx'
import getChartStyleSection from './sections/chartStyle.jsx'
import getColorSetSection from './sections/colorSet.jsx'
import getDisplaySection from './sections/display.jsx'
import getDomainAxisSection from './sections/domainAxis.jsx'
import getLinesSection from './sections/lines.jsx'
import getRangeAxisSection from './sections/rangeAxis.jsx'
import getTitlesSection from './sections/titles.jsx'
import getAxesTab from './tabs/axes.jsx'
import getDataTab from './tabs/data.js'
import getLegendTab from './tabs/legend.jsx'
import getLimitValuesTab from './tabs/limitValues.jsx'
import getSeriesTab from './tabs/series.jsx'
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
