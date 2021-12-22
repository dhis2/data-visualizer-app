import { ALL_DYNAMIC_DIMENSION_ITEMS, ouIdHelper } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { IconWarningFilled16, IconLock16 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { sGetMetadata } from '../../reducers/metadata.js'
import { styles } from './styles/Tooltip.style.js'

const labels = {
    noneSelected: () => i18n.t('None selected'),
    onlyOneInUse: (name) => i18n.t("Only '{{- name}}' in use", { name }),
    onlyLimitedNumberInUse: (number) =>
        i18n.t("Only '{{number}}' in use", { number }),
    allItems: () => i18n.t('All items are selected'),
}

export const TooltipContent = ({
    dimensionId,
    itemIds,
    metadata,
    displayLimitedAmount,
    lockedLabel,
}) => {
    const hasAllItemsSelected = itemIds.includes(ALL_DYNAMIC_DIMENSION_ITEMS)
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

        if (!displayLimitedAmount && !hasAllItemsSelected) {
            itemIds.forEach((id) => {
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

    const renderWarningLabel = (warningLabel) => (
        <li style={styles.item}>
            <div style={styles.iconWrapper}>
                <IconWarningFilled16 />
                <span style={styles.label}>{warningLabel}</span>
            </div>
        </li>
    )

    const renderItems = (itemDisplayNames) => {
        const renderLimit = 5

        const itemsToRender = itemDisplayNames
            .slice(0, renderLimit)
            .map((name) => (
                <li key={`${dimensionId}-${name}`} style={styles.item}>
                    {name}
                </li>
            ))

        if (itemDisplayNames.length > renderLimit) {
            itemsToRender.push(
                <li key={`${dimensionId}-render-limit`} style={styles.item}>
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
                <IconLock16 />
                <span style={styles.label}>{lockedLabel}</span>
            </div>
        </li>
    )

    const renderNoItemsLabel = () => (
        <li key={`${dimensionId}-${labels.noneSelected()}`} style={styles.item}>
            {labels.noneSelected()}
        </li>
    )

    const renderAllItemsLabel = () => (
        <li key={`${dimensionId}-${labels.allItems()}`} style={styles.item}>
            {labels.allItems()}
        </li>
    )

    const itemDisplayNames = getItemDisplayNames()
    const warningLabel = getWarningLabel()
    const hasNoItemsLabel =
        !itemDisplayNames.length && !warningLabel && !hasAllItemsSelected

    return (
        <ul style={styles.list}>
            {warningLabel && renderWarningLabel(warningLabel)}
            {lockedLabel && renderLockedLabel()}
            {hasAllItemsSelected && renderAllItemsLabel()}
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

const mapStateToProps = (state) => ({
    metadata: sGetMetadata(state),
})

export default connect(mapStateToProps)(TooltipContent)
