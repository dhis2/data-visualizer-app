import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ImageIcon from '@material-ui/icons/Image'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import ListIcon from '@material-ui/icons/List'
import ListAltIcon from '@material-ui/icons/ListAlt'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import i18n from '@dhis2/d2-i18n'

import { VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics'

import { styles } from './styles/DownloadMenu.style'

import {
    sGetUiType,
    sGetUiLayout,
    sGetUiInterpretation,
} from '../../reducers/ui'
import { sGetCurrent } from '../../reducers/current'
import { sGetChart } from '../../reducers/chart'
import {
    apiDownloadImage,
    apiDownloadData,
    apiDownloadTable,
} from '../../api/analytics'

export class DownloadMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            anchorEl: null,
            schemeSubmenu: {
                anchorEl: null,
                dataType: null,
            },
            advancedSubmenu: {
                anchorEl: null,
            },
        }
    }

    toggleMenu = target => this.setState({ anchorEl: target || null })

    toggleSubmenu = (id, target, dataType) => {
        const key = `${id}Submenu`

        const payload = { anchorEl: target || null }

        if (id === 'scheme') {
            payload.dataType = dataType || null
        }

        this.setState({ [key]: payload })
    }

    downloadImage = format => async () => {
        const { current, chart } = this.props

        const formData = new URLSearchParams()

        formData.append('filename', current.name)

        if (chart) {
            formData.append('svg', chart)
        }

        const blob = await apiDownloadImage(format, formData)
        const url = URL.createObjectURL(blob)

        this.toggleMenu()

        window.open(url, '_blank')
    }

    downloadData = (format, idScheme, path) => async () => {
        const { current, relativePeriodDate } = this.props

        const url = await apiDownloadData({
            current,
            format,
            options: { relativePeriodDate },
            idScheme,
            path,
        })

        if (idScheme) {
            this.toggleSubmenu('scheme')
        } else {
            this.toggleSubmenu('advanced')
        }

        this.toggleMenu()

        window.open(url, format.match(/(xls|csv)/) ? '_top' : '_blank')
    }

    downloadTable = format => async () => {
        const { current, rows, columns, relativePeriodDate } = this.props

        const url = await apiDownloadTable({
            current,
            format,
            options: { relativePeriodDate },
            rows,
            columns,
        })

        window.open(url, format === 'html' ? '_blank' : '_top')
    }

    graphicsMenuSection = () => (
        <div>
            <ListSubheader component="div">{i18n.t('Graphics')}</ListSubheader>
            <MenuItem onClick={this.downloadImage('png')}>
                <ListItemIcon>
                    <ImageIcon />
                </ListItemIcon>
                <ListItemText>{i18n.t('Image (.png)')}</ListItemText>
            </MenuItem>
            <MenuItem onClick={this.downloadImage('pdf')}>
                <ListItemIcon>
                    <PictureAsPdfIcon />
                </ListItemIcon>
                <ListItemText>{i18n.t('PDF (.pdf)')}</ListItemText>
            </MenuItem>
        </div>
    )

    tableMenuSection = () => (
        <div>
            <ListSubheader component="div">{i18n.t('Table')}</ListSubheader>
            <MenuItem onClick={this.downloadTable('xls')}>
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText>{i18n.t('Excel (.xls)')}</ListItemText>
            </MenuItem>
            <MenuItem onClick={this.downloadTable('csv')}>
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText>{i18n.t('CSV (.csv)')}</ListItemText>
            </MenuItem>
            <MenuItem onClick={this.downloadTable('html')}>
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText>{i18n.t('HTML (.html)')}</ListItemText>
            </MenuItem>
        </div>
    )

    render() {
        return (
            <Fragment>
                <Button
                    className={this.props.className}
                    onClick={event => this.toggleMenu(event.currentTarget)}
                    disableRipple={true}
                    disableFocusRipple={true}
                    disabled={!this.props.current}
                >
                    {i18n.t('Download')}
                </Button>
                <Menu
                    open={Boolean(this.state.anchorEl)}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={styles.menuAnchorOrigin}
                    getContentAnchorEl={null}
                    onClose={() => this.toggleMenu()}
                >
                    {this.props.visType === VIS_TYPE_PIVOT_TABLE
                        ? this.tableMenuSection()
                        : this.graphicsMenuSection()}
                    <Divider />
                    <ListSubheader component="div">
                        {i18n.t('Plain data source')}
                    </ListSubheader>
                    <MenuItem
                        onClick={event =>
                            this.toggleSubmenu(
                                'scheme',
                                event.currentTarget,
                                'json'
                            )
                        }
                    >
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText>JSON</ListItemText>
                        <ArrowRightIcon style={styles.arrowIcon} />
                    </MenuItem>
                    <MenuItem
                        onClick={event =>
                            this.toggleSubmenu(
                                'scheme',
                                event.currentTarget,
                                'xml'
                            )
                        }
                    >
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText>XML</ListItemText>
                        <ArrowRightIcon style={styles.arrowIcon} />
                    </MenuItem>
                    <MenuItem
                        onClick={event =>
                            this.toggleSubmenu(
                                'scheme',
                                event.currentTarget,
                                'xls'
                            )
                        }
                    >
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText>Excel</ListItemText>
                        <ArrowRightIcon style={styles.arrowIcon} />
                    </MenuItem>
                    <MenuItem
                        onClick={event =>
                            this.toggleSubmenu(
                                'scheme',
                                event.currentTarget,
                                'csv'
                            )
                        }
                    >
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText>CSV</ListItemText>
                        <ArrowRightIcon style={styles.arrowIcon} />
                    </MenuItem>
                    <MenuItem
                        onClick={event =>
                            this.toggleSubmenu('advanced', event.currentTarget)
                        }
                    >
                        <ListItemIcon>
                            <MoreHorizIcon />
                        </ListItemIcon>
                        <ListItemText>{i18n.t('Advanced')}</ListItemText>
                        <ArrowRightIcon style={styles.arrowIcon} />
                    </MenuItem>
                </Menu>
                <Menu
                    open={Boolean(this.state.schemeSubmenu.anchorEl)}
                    anchorEl={this.state.schemeSubmenu.anchorEl}
                    anchorOrigin={styles.submenuAnchorOrigin}
                    onClose={() => this.toggleSubmenu('scheme')}
                >
                    <ListSubheader component="div">
                        {i18n.t('Metadata ID scheme')}
                    </ListSubheader>
                    <MenuItem
                        onClick={this.downloadData(
                            this.state.schemeSubmenu.dataType,
                            'UID'
                        )}
                    >
                        ID
                    </MenuItem>
                    <MenuItem
                        onClick={this.downloadData(
                            this.state.schemeSubmenu.dataType,
                            'CODE'
                        )}
                    >
                        Code
                    </MenuItem>
                    <MenuItem
                        onClick={this.downloadData(
                            this.state.schemeSubmenu.dataType,
                            'NAME'
                        )}
                    >
                        Name
                    </MenuItem>
                </Menu>
                <Menu
                    open={Boolean(this.state.advancedSubmenu.anchorEl)}
                    anchorEl={this.state.advancedSubmenu.anchorEl}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    onClose={() => this.toggleSubmenu('advanced')}
                >
                    <ListSubheader component="div">
                        {i18n.t('Data value set')}
                    </ListSubheader>
                    <MenuItem
                        onClick={this.downloadData(
                            'json',
                            null,
                            'dataValueSet'
                        )}
                    >
                        JSON
                    </MenuItem>
                    <MenuItem
                        onClick={this.downloadData('xml', null, 'dataValueSet')}
                    >
                        XML
                    </MenuItem>
                    <Divider />
                    <ListSubheader component="div">
                        {i18n.t('Other formats')}
                    </ListSubheader>
                    <MenuItem onClick={this.downloadData('jrxml')}>
                        JRXML
                    </MenuItem>
                    <MenuItem
                        onClick={this.downloadData('sql', null, 'debug/sql')}
                    >
                        Raw data SQL
                    </MenuItem>
                </Menu>
            </Fragment>
        )
    }
}

const relativePeriodDateSelector = createSelector(
    [sGetUiInterpretation],
    interpretation => interpretation.created || undefined
)

DownloadMenu.propTypes = {
    chart: PropTypes.string,
    className: PropTypes.string,
    columns: PropTypes.array,
    current: PropTypes.object,
    relativePeriodDate: PropTypes.string,
    rows: PropTypes.array,
    visType: PropTypes.string,
}

const mapStateToProps = state => ({
    current: sGetCurrent(state),
    relativePeriodDate: relativePeriodDateSelector(state),
    rows: sGetUiLayout(state).rows,
    columns: sGetUiLayout(state).columns,
    chart: sGetChart(state),
    visType: sGetUiType(state),
})

export default connect(mapStateToProps, {})(DownloadMenu)
