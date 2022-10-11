import { apiFetchOrganisationUnit } from '@dhis2/analytics'
import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Divider, FlyoutMenu, MenuItem, Popper } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect, useState, useCallback } from 'react'
import ArrowDownwardIcon from '../../assets/ArrowDownwardIcon.js'
import ArrowUpwardIcon from '../../assets/ArrowUpwardIcon.js'

const ContextualMenu = ({ config, ouLevels, onClick, reference, dataTest }) => {
    const engine = useDataEngine()
    const [ouData, setOuData] = useState(undefined)
    const [subLevelData, setSubLevelData] = useState(undefined)

    const lookupLevel = (levelId) =>
        ouLevels.find((item) => item.level === levelId)

    const doFetchOuData = useCallback(
        async (ouId) => {
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

    return ouData ? (
        <Popper
            reference={reference}
            placement="right-start"
            dataTest={dataTest}
        >
            <FlyoutMenu>
                <MenuItem
                    dense
                    label={i18n.t('Change org unit')}
                    dataTest={`${dataTest}-org-unit`}
                >
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
                                dataTest={`${dataTest}-org-unit-drill-up`}
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
                            dataTest={`${dataTest}-org-unit-drill-down`}
                        />
                    )}
                </MenuItem>
            </FlyoutMenu>
        </Popper>
    ) : null
}

ContextualMenu.propTypes = {
    config: PropTypes.object,
    dataTest: PropTypes.string,
    ouLevels: PropTypes.array,
    reference: PropTypes.object,
    onClick: PropTypes.func,
}

export default ContextualMenu
