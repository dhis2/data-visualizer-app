import i18n from '@dhis2/d2-i18n'
import { DropdownButton, FlyoutMenu, MenuDivider, MenuItem } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import {
    getPaletteColors,
    getPaletteLabels,
    PALETTE_BY_AXIS,
    PALETTE_IDS,
} from '../../../../modules/seriesColors.js'
import styles from '../../styles/Colours.module.css'

const PalettePreview = ({ paletteId }) => (
    <span className={styles.menuPalettePreview}>
        {getPaletteColors(paletteId)
            .slice(0, 6)
            .map((color) => (
                <span key={color} style={{ backgroundColor: color }} />
            ))}
    </span>
)

PalettePreview.propTypes = { paletteId: PropTypes.string.isRequired }

const ApplyColorsMenu = ({ showByAxis, showResetToAuto, onApply, onReset }) => {
    const [open, setOpen] = useState(false)
    const labels = getPaletteLabels()
    const apply = (paletteId) => {
        setOpen(false)
        onApply(paletteId)
    }

    return (
        <DropdownButton
            small
            secondary
            open={open}
            onClick={({ open }) => setOpen(open)}
            component={
                <FlyoutMenu dense>
                    {showByAxis && (
                        <MenuItem
                            label={i18n.t('By axis')}
                            onClick={() => apply(PALETTE_BY_AXIS)}
                        />
                    )}
                    {showByAxis && <MenuDivider dense />}
                    {PALETTE_IDS.map((paletteId) => (
                        <MenuItem
                            key={paletteId}
                            label={
                                <span>
                                    {labels[paletteId]}
                                    <PalettePreview paletteId={paletteId} />
                                </span>
                            }
                            onClick={() => apply(paletteId)}
                        />
                    ))}
                    <MenuDivider dense />
                    <MenuItem
                        label={
                            showResetToAuto
                                ? i18n.t('Reset to Auto')
                                : i18n.t('Reset colours')
                        }
                        onClick={() => {
                            setOpen(false)
                            onReset()
                        }}
                    />
                </FlyoutMenu>
            }
        >
            {i18n.t('Apply colours')}
        </DropdownButton>
    )
}

ApplyColorsMenu.propTypes = {
    onApply: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    showByAxis: PropTypes.bool,
    showResetToAuto: PropTypes.bool,
}

export default ApplyColorsMenu
