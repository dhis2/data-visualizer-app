import getColorSetSection from './sections/colorSet'
import getSeriesTab from './tabs/series'
import getDataTab from './tabs/data'
import getAdvancedSection from './sections/advanced'
import getStyleTab from './tabs/style'
import getTitlesSection from './sections/titles'

export default () => [
    getDataTab([getAdvancedSection()]),
    getSeriesTab(),
    getStyleTab([getTitlesSection(), getColorSetSection()]),
]
