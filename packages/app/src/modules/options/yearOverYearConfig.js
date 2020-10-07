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

export default hasCustomAxes => [
    getDataTab([
        getDisplaySection(),
        getLinesSection(hasCustomAxes),
        getAdvancedSection(),
    ]),
    getAxesTab([
        getVerticalAxisSection(hasCustomAxes),
        getHorizontalAxisSection(),
    ]),
    getSeriesTab(),
    getStyleTab([
        getChartStyleSection(),
        getTitlesSection(),
        getColorSetSection(hasCustomAxes),
    ]),
]
