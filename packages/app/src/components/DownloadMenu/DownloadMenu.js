import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { default as MuiButton } from '@material-ui/core/Button'

import ImageIcon from '@material-ui/icons/Image'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import ListIcon from '@material-ui/icons/List'
import ListAltIcon from '@material-ui/icons/ListAlt'

import MoreHorizontalIcon from '../../assets/MoreHorizontalIcon'

import { Menu, MenuItem, Divider, colors } from '@dhis2/ui-core'

import i18n from '@dhis2/d2-i18n'

import { VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics'

import styles from './styles/DownloadMenu.module.css'

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
import MenuButton from '../MenuButton/MenuButton'

const DenseMenuItem = ({ Icon, children, ...rest }) => (
    <MenuItem
        dense
        icon={Icon && <Icon style={{ color: colors.grey600 }} />}
        {...rest}
    >
        {children}
    </MenuItem>
)

DenseMenuItem.propTypes = {
    Icon: PropTypes.element,
    children: PropTypes.element,
}

export class DownloadMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dialogIsOpen: false,
        }
    }

    toggleMenu = () => this.setState({ dialogIsOpen: !this.state.dialogIsOpen })

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

        this.toggleMenu()

        window.open(url, format === 'html' ? '_blank' : '_top')
    }

    graphicsMenuSection = () => (
        <>
            <div className={styles.menuSectionTitle}>{i18n.t('Graphics')}</div>
            <DenseMenuItem
                Icon={ImageIcon}
                label={i18n.t('Image (.png)')}
                onClick={this.downloadImage('png')}
            />
            <DenseMenuItem
                Icon={PictureAsPdfIcon}
                label={i18n.t('PDF (.pdf)')}
                onClick={this.downloadImage('pdf')}
            />
        </>
    )

    tableMenuSection = () => (
        <>
            <div className={styles.menuSectionTitle}>
                {i18n.t('Table layout')}
            </div>
            <DenseMenuItem
                Icon={ListAltIcon}
                label={i18n.t('Excel (.xls)')}
                onClick={this.downloadTable('xls')}
            />
            <DenseMenuItem
                Icon={ListAltIcon}
                label={i18n.t('CSV (.csv)')}
                onClick={this.downloadTable('csv')}
            />
            <DenseMenuItem
                Icon={ListAltIcon}
                label={i18n.t('HTML (.html)')}
                onClick={this.downloadTable('html')}
            />
        </>
    )

    plainDataSourceSubLevel = format => (
        <Menu>
            <div className={styles.menuSectionTitle}>
                {i18n.t('Metadata ID scheme')}
            </div>
            <DenseMenuItem
                label="ID"
                onClick={this.downloadData(format, 'UID')}
            />
            <DenseMenuItem
                label="Code"
                onClick={this.downloadData(format, 'CODE')}
            />
            <DenseMenuItem
                label="Name"
                onClick={this.downloadData(format, 'NAME')}
            />
        </Menu>
    )

    render() {
        return (
            <div>
                <MuiButton
                    className={this.props.className}
                    onClick={this.toggleMenu}
                    style={{ position: 'relative' }}
                >
                    {i18n.t('Download')}
                </MuiButton>
                {this.state.dialogIsOpen && (
                    <div className={styles.menuDiv}>
                        <Menu>
                            {this.props.visType === VIS_TYPE_PIVOT_TABLE
                                ? this.tableMenuSection()
                                : this.graphicsMenuSection()}
                            <Divider />
                            <div className={styles.menuSectionTitle}>
                                {i18n.t('Plain data source')}
                            </div>
                            <DenseMenuItem Icon={ListIcon} label="JSON">
                                {this.plainDataSourceSubLevel('json')}
                            </DenseMenuItem>
                            <DenseMenuItem Icon={ListIcon} label="XML">
                                {this.plainDataSourceSubLevel('xml')}
                            </DenseMenuItem>
                            <DenseMenuItem Icon={ListIcon} label="Excel">
                                {this.plainDataSourceSubLevel('xls')}
                            </DenseMenuItem>
                            <DenseMenuItem Icon={ListIcon} label="CSV">
                                {this.plainDataSourceSubLevel('csv')}
                            </DenseMenuItem>
                            <DenseMenuItem
                                Icon={MoreHorizontalIcon}
                                label="Advanced"
                            >
                                <Menu>
                                    <div className={styles.menuSectionTitle}>
                                        {i18n.t('Data value set')}
                                    </div>
                                    <DenseMenuItem
                                        label="JSON"
                                        onClick={this.downloadData(
                                            'json',
                                            null,
                                            'dataValueSet'
                                        )}
                                    />
                                    <DenseMenuItem
                                        label="XML"
                                        onClick={this.downloadData(
                                            'xml',
                                            null,
                                            'dataValueSet'
                                        )}
                                    />
                                    <Divider />
                                    <div className={styles.menuSectionTitle}>
                                        {i18n.t('Other formats')}
                                    </div>
                                    <DenseMenuItem
                                        label="JRXML"
                                        onClick={this.downloadData('jrxml')}
                                    />
                                    <DenseMenuItem
                                        label={i18n.t('Raw data SQL')}
                                        onClick={this.downloadData(
                                            'sql',
                                            null,
                                            'debug/sql'
                                        )}
                                    />
                                </Menu>
                            </DenseMenuItem>
                        </Menu>
                    </div>
                )}
            </div>
        )
    }
}

const relativePeriodDateSelector = createSelector(
    [sGetUiInterpretation],
    interpretation => interpretation.created || undefined
)

DownloadMenu.propTypes = {
    chart: PropTypes.string,
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
