import { VIS_TYPE_PIVOT_TABLE, VIS_TYPE_OUTLIER_TABLE } from '@dhis2/analytics'
import { useConfig } from '@dhis2/app-runtime'
import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { DOWNLOAD_TYPE_PLAIN, ID_SCHEME_UID } from '../constants.js'
import { DownloadMenu } from '../DownloadMenu.js'

jest.mock('@dhis2/app-runtime', () => ({
    useConfig: jest.fn(() => ({
        serverVersion: { minor: 42 },
    })),
    useDhis2ConnectionStatus: jest.fn(() => ({
        isDisconnected: false,
    })),
}))

describe('DownloadMenu component', () => {
    const downloadDataFn = jest.fn()
    const downloadImageFn = jest.fn()

    it('renders the correct menu items for Pivot Table download', () => {
        const { getByText } = render(
            <DownloadMenu
                visType={VIS_TYPE_PIVOT_TABLE}
                onDownloadData={downloadDataFn}
                onDownloadImage={downloadImageFn}
            />
        )

        Array(
            'Excel (.xlsx)',
            'CSV (.csv)',
            'HTML (.html)',
            'JSON',
            'XML',
            'Microsoft Excel',
            'CSV',
            'Advanced'
        ).forEach((label) => expect(getByText(label)).toBeTruthy())
    })

    it('renders the correct menu items for Outlier Table download', () => {
        const { getByText } = render(
            <DownloadMenu
                visType={VIS_TYPE_OUTLIER_TABLE}
                onDownloadData={downloadDataFn}
                onDownloadImage={downloadImageFn}
            />
        )

        Array('JSON', 'Microsoft Excel', 'CSV').forEach((label) =>
            expect(getByText(label)).toBeTruthy()
        )
    })

    test.each(
        [VIS_TYPE_PIVOT_TABLE, VIS_TYPE_OUTLIER_TABLE],
        'uses the correct format for Excel in 42',
        async (visType) => {
            const { getByText, findByText } = render(
                <DownloadMenu
                    visType={visType}
                    onDownloadData={downloadDataFn}
                    onDownloadImage={downloadImageFn}
                />
            )

            visType === VIS_TYPE_PIVOT_TABLE &&
                expect(getByText('Excel (.xlsx)')).toBeTruthy()

            fireEvent.click(getByText('Microsoft Excel'))

            await findByText('ID')

            expect(getByText('ID')).toBeTruthy()

            fireEvent.click(getByText('ID'))

            expect(downloadDataFn).toHaveBeenCalledWith({
                type: DOWNLOAD_TYPE_PLAIN,
                format: 'xlsx',
                idScheme: ID_SCHEME_UID,
            })
        }
    )

    // VERSION-TOGGLE: remove when 42 is the lowest supported version
    test.each(
        [VIS_TYPE_PIVOT_TABLE, VIS_TYPE_OUTLIER_TABLE],
        'uses the correct format for Excel in 41',
        async (visType) => {
            useConfig.mockReturnValue({ serverVersion: { minor: 41 } })

            const { getByText, findByText } = render(
                <DownloadMenu
                    visType={visType}
                    onDownloadData={downloadDataFn}
                    onDownloadImage={downloadImageFn}
                />
            )

            visType === VIS_TYPE_PIVOT_TABLE &&
                expect(getByText('Excel (.xls)')).toBeTruthy()

            fireEvent.click(getByText('Microsoft Excel'))

            await findByText('ID')

            expect(getByText('ID')).toBeTruthy()

            fireEvent.click(getByText('ID'))

            expect(downloadDataFn).toHaveBeenCalledWith({
                type: DOWNLOAD_TYPE_PLAIN,
                format: 'xls',
                idScheme: ID_SCHEME_UID,
            })
        }
    )
})
