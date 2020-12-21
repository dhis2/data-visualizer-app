import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import i18n from '@dhis2/d2-i18n'
import { useDataEngine } from '@dhis2/app-runtime'
import { Divider, FlyoutMenu, MenuItem } from '@dhis2/ui'

import ArrowUpwardIcon from './assets/ArrowUpwardIcon'
import ArrowDownwardIcon from './assets/ArrowDownwardIcon'

import { apiFetchOrganisationUnit } from '@dhis2/analytics'

export const ContextualMenu = ({ config, ouLevels, onClick }) => {
    const engine = useDataEngine()
    const [ouData, setOuData] = useState(undefined)
    const [subLevelData, setSubLevelData] = useState(undefined)

    const lookupLevel = levelId => ouLevels.find(item => item.level === levelId)

    const doFetchOuData = useCallback(
        async ouId => {
            const orgUnit = await apiFetchOrganisationUnit(engine, ouId)

            return orgUnit
        },
        [engine]
    )

    useEffect(() => {
        setOuData(null)

        const doFetch = async () => {
            const orgUnit = await doFetchOuData(config.ouId)

            setOuData(orgUnit)
        }

        if (config.ouId) {
            doFetch()
        }

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [config])

    useEffect(() => {
        setSubLevelData(null)

        if (ouData?.children.length) {
            const levelData = lookupLevel(ouData.children[0].level)

            if (levelData) {
                setSubLevelData(levelData)
            }
        }

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [ouData])

    const menuItemStyle = {
        display: 'inline-block',
        minWidth: 200,
    }

    return (
        <FlyoutMenu>
            {ouData && (
                <MenuItem dense label={i18n.t('Change org unit')}>
                    {ouData?.parent && (
                        <>
                            <MenuItem
                                dense
                                icon={<ArrowUpwardIcon />}
                                label={
                                    <span style={menuItemStyle}>
                                        {ouData.parent.name}
                                    </span>
                                }
                                onClick={() =>
                                    onClick({
                                        ou: { id: ouData.parent.id },
                                    })
                                }
                            />
                            {subLevelData && <Divider />}
                        </>
                    )}
                    {subLevelData && (
                        <MenuItem
                            dense
                            icon={<ArrowDownwardIcon />}
                            label={
                                <span style={menuItemStyle}>
                                    {i18n.t('{{level}} level in {{orgunit}}', {
                                        level: subLevelData.name,
                                        orgunit: ouData.name,
                                    })}
                                </span>
                            }
                            onClick={() =>
                                onClick({
                                    ou: {
                                        id: ouData.id,
                                        path: ouData.path,
                                        level: subLevelData.id,
                                    },
                                })
                            }
                        />
                    )}
                </MenuItem>
            )}
        </FlyoutMenu>
    )
}

ContextualMenu.propTypes = {
    config: PropTypes.object,
    ouLevels: PropTypes.array,
    onClick: PropTypes.func,
}

export default ContextualMenu
