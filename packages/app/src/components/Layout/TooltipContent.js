import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LockIcon from '@material-ui/icons/Lock'
import WarningIcon from '@material-ui/icons/Warning'

import i18n from '@dhis2/d2-i18n'
import { ouIdHelper } from '@dhis2/analytics'

import { sGetMetadata } from '../../reducers/metadata'
import { styles } from './styles/Tooltip.style'

const labels = {
    noneSelected: i18n.t('None selected'),
    onlyOneInUse: name => i18n.t("Only '{{- name}}' in use", { name }),
    onlyLimitedNumberInUse: number =>
        i18n.t("Only '{{number}}' in use", { number }),
}

export const TooltipContent = ({
    dimensionId,
    itemIds,
    metadata,
    displayLimitedAmount,
    lockedLabel,
}) => {
    const getWarningLabel = () => {
        const warningLabel =
            itemIds.length === 1
                ? labels.onlyOneInUse(
                      metadata[itemIds[0]]
                          ? metadata[itemIds[0]].name
                          : itemIds[0]
                  )
                : labels.onlyLimitedNumberInUse(itemIds.length)
        return displayLimitedAmount ? warningLabel : null
    }

    const getNameList = (idList, label, metadata) =>
        idList.reduce(
            (levelString, levelId, index) =>
                `${levelString}${index > 0 ? `, ` : ``}${
                    metadata[levelId] ? metadata[levelId].name : levelId
                }`,
            `${label}: `
        )

    const getItemDisplayNames = () => {
        const levelIds = []
        const groupIds = []
        const itemDisplayNames = []

        if (!displayLimitedAmount) {
            itemIds.forEach(id => {
                if (ouIdHelper.hasLevelPrefix(id)) {
                    levelIds.push(ouIdHelper.removePrefix(id))
                } else if (ouIdHelper.hasGroupPrefix(id)) {
                    groupIds.push(ouIdHelper.removePrefix(id))
                } else {
                    itemDisplayNames.push(metadata[id] ? metadata[id].name : id)
                }
            })

            levelIds.length &&
                itemDisplayNames.push(
                    getNameList(levelIds, i18n.t('Levels'), metadata)
                )

            groupIds.length &&
                itemDisplayNames.push(
                    getNameList(groupIds, i18n.t('Groups'), metadata)
                )
        }

        return itemDisplayNames
    }

    const renderWarningLabel = warningLabel => (
        <li style={styles.item}>
            <div style={styles.iconWrapper}>
                <WarningIcon style={styles.icon} />
                <span style={styles.warningLabel}>{warningLabel}</span>
            </div>
        </li>
    )

    const renderItems = itemDisplayNames => {
        const renderLimit = 5

        const itemsToRender = itemDisplayNames
            .slice(0, renderLimit)
            .map(name => (
                <li
                    key={`${dimensionId}-${name}`}
                    style={styles.item}
                >
                    {name}
                </li>
            ))

        if (itemDisplayNames.length > renderLimit) {
            itemsToRender.push(
                <li
                    key={`${dimensionId}-render-limit`}
                    style={styles.item}
                >
                    {itemDisplayNames.length - renderLimit === 1
                        ? i18n.t('And 1 other...')
                        : i18n.t('And {{numberOfItems}} others...', {
                              numberOfItems:
                                  itemDisplayNames.length - renderLimit,
                          })}
                </li>
            )
        }

        return itemsToRender
    }

    const renderLockedLabel = () => (
        <li style={styles.item}>
            <div style={styles.iconWrapper}>
                <LockIcon style={styles.icon} />
                <span>{lockedLabel}</span>
            </div>
        </li>
    )

    const renderNoItemsLabel = () => (
        <li key={`${dimensionId}-${labels.noneSelected}`} style={styles.item}>
            {labels.noneSelected}
        </li>
    )

    const itemDisplayNames = getItemDisplayNames()
    const warningLabel = getWarningLabel()
    const hasNoItemsLabel = !itemDisplayNames.length && !warningLabel

    return (
        <ul style={styles.list}>
            {warningLabel && renderWarningLabel(warningLabel)}
            {lockedLabel && renderLockedLabel()}
            {itemDisplayNames && renderItems(itemDisplayNames)}
            {hasNoItemsLabel && renderNoItemsLabel()}
        </ul>
    )
}

TooltipContent.propTypes = {
    dimensionId: PropTypes.string.isRequired,
    metadata: PropTypes.object.isRequired,
    displayLimitedAmount: PropTypes.bool,
    itemIds: PropTypes.array,
    lockedLabel: PropTypes.string,
}

const mapStateToProps = state => ({
    metadata: sGetMetadata(state),
})

export default connect(mapStateToProps)(TooltipContent)
