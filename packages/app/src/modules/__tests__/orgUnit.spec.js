import {
    convertOuLevelsToUids,
    removeLastPathSegment,
    getOuPath,
} from '../orgUnit';

jest.mock('../../api/organisationUnits', () => ({
    apiFetchOrganisationUnitLevels: () =>
        Promise.resolve([
            {
                level: 2,
                id: '2nd-floor',
            },
        ]),
}));

describe('convertOuLevelsToUids', () => {
    let vis;
    beforeEach(() => {
        vis = {
            other: 'abc',
            filters: [],
            rows: [],
            columns: [],
        };
    });

    it('does nothing when no ou', async () => {
        vis.filters = [
            {
                dimension: 'facility_type',
                items: [
                    {
                        id: 'factype1',
                        name: 'Facility Type 1',
                    },
                ],
            },
        ];

        const updatedVis = await convertOuLevelsToUids(vis);

        expect(updatedVis).toEqual({
            filters: [
                {
                    dimension: 'facility_type',
                    items: [
                        {
                            id: 'factype1',
                            name: 'Facility Type 1',
                        },
                    ],
                },
            ],
            rows: [],
            columns: [],
            other: 'abc',
        });
    });

    it('converts ou filters', async () => {
        vis.filters = [
            {
                dimension: 'ou',
                items: [
                    {
                        id: 'fluttershy',
                        name: 'Fluttershy',
                    },
                    {
                        id: 'LEVEL-2',
                        name: 'LEVEL-2',
                    },
                    {
                        id: 'rainbow',
                        name: 'Rainbow Dash',
                    },
                ],
            },
            {
                dimension: 'facility_type',
                items: [
                    {
                        id: 'factype1',
                        name: 'Facility Type 1',
                    },
                ],
            },
        ];

        const updatedVis = await convertOuLevelsToUids(vis);

        expect(updatedVis).toEqual({
            filters: [
                {
                    dimension: 'ou',
                    items: [
                        { id: 'fluttershy', name: 'Fluttershy' },
                        { id: 'LEVEL-2nd-floor', name: 'LEVEL-2' },
                        { id: 'rainbow', name: 'Rainbow Dash' },
                    ],
                },
                {
                    dimension: 'facility_type',
                    items: [
                        {
                            id: 'factype1',
                            name: 'Facility Type 1',
                        },
                    ],
                },
            ],
            rows: [],
            columns: [],
            other: 'abc',
        });
    });

    it('converts ou rows', async () => {
        vis.rows = [
            {
                dimension: 'ou',
                items: [
                    {
                        id: 'LEVEL-2',
                        name: 'LEVEL-2',
                    },
                ],
            },
        ];

        const updatedVis = await convertOuLevelsToUids(vis);

        expect(updatedVis).toEqual({
            filters: [],
            columns: [],
            rows: [
                {
                    dimension: 'ou',
                    items: [{ id: 'LEVEL-2nd-floor', name: 'LEVEL-2' }],
                },
            ],
            other: 'abc',
        });
    });

    it('converts ou columns', async () => {
        vis.columns = [
            {
                dimension: 'ou',
                items: [
                    {
                        id: 'LEVEL-2',
                        name: 'LEVEL-2',
                    },
                ],
            },
        ];

        const updatedVis = await convertOuLevelsToUids(vis);

        expect(updatedVis).toEqual({
            filters: [],
            rows: [],
            columns: [
                {
                    dimension: 'ou',
                    items: [{ id: 'LEVEL-2nd-floor', name: 'LEVEL-2' }],
                },
            ],
            other: 'abc',
        });
    });
});

describe('removeLastPathSegment', () => {
    it('handles a root path', () => {
        const path = '/';

        expect(removeLastPathSegment(path)).toEqual(path);
    });

    it('handles a path with single segment', () => {
        const path = '/abc';

        expect(removeLastPathSegment(path)).toEqual(path);
    });

    it('handles a path with multiple segments', () => {
        const path = 'ABC/def/GHI';

        expect(removeLastPathSegment(path)).toEqual('ABC/def');
    });
});

describe('getOrgUnitPath', () => {
    it('handles root org units', () => {
        const id = 'ROOT_ID';
        const metadata = {};
        const parentGraphMap = { ROOT_ID: '' };

        expect(getOuPath(id, metadata, parentGraphMap)).toEqual('/ROOT_ID');
    });

    it('returns path for org unit defined in metadata', () => {
        const path = 'path';
        const id = 'ORG_UNIT_ID';
        const metadata = {
            [id]: { path },
        };

        expect(getOuPath(id, metadata)).toEqual(path);
    });

    it('returns proper path for org unit not defined in metadata, but in parent graph', () => {
        const id = 'ORG_UNIT_ID';
        const path = 'path';
        const metadata = {};
        const parentGraphMap = { [id]: path };

        expect(getOuPath(id, metadata, parentGraphMap)).toEqual(
            `/${path}/${id}`
        );
    });
});
