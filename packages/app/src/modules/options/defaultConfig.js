import getAdvancedSection from './sections/advanced'
import getChartStyleSection from './sections/chartStyle'
import getColorSetSection from './sections/colorSet'
import getDisplaySection from './sections/display'
import getDomainAxisSection from './sections/domainAxis'
import getLinesSection from './sections/lines'
import getRangeAxisSection from './sections/rangeAxis'
import getTitlesSection from './sections/titles'
import getAxesTab from './tabs/axes'
import getDataTab from './tabs/data'
import getLegendTab from './tabs/legend'
import getLimitValuesTab from './tabs/limitValues'
import getSeriesTab from './tabs/series'
import getStyleTab from './tabs/style'

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
        ...rangeAxisIds.map(id =>
            getRangeAxisSection({
                axisId: `RANGE_${id}`,
                isVertical,
                showLines: hasDisabledSections,
                hasCustomAxes:
                    rangeAxisIds.length > 1 || rangeAxisIds.some(id => id > 0),
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
