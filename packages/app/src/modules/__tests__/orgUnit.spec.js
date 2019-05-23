import { getOrgUnitsFromIds, removeLastPathSegment } from '../orgUnit';

describe('getOrgUnitsFromIds', () => {
    it('returns org units with ids in given array', () => {
        const ids = ['ID1', 'ID2', 'LEVEL-LEVEL', 'GROUP-GROUP_ID'];
        const metadata = {
            ID1: {
                id: 'ID1',
                name: 'Org unit 1',
                path: '/ID1',
            },
            ID2: {
                id: 'ID2',
                name: 'Org unit 2',
                path: '/ID2',
            },
        };
        const parentGraphMap = {};

        const orgUnits = getOrgUnitsFromIds(ids, metadata, parentGraphMap);

        // test that it only extracts org units, not levels/groups
        expect(orgUnits.length).toEqual(2);

        orgUnits.forEach(orgUnit => {
            expect(orgUnit.id).toEqual(metadata[orgUnit.id].id);
            expect(orgUnit.name).toEqual(metadata[orgUnit.id].name);
            expect(orgUnit.path).toEqual(metadata[orgUnit.id].path);
        });
    });

    it('returns empty array if there no org units in ou dimension', () => {
        const ids = [];
        const metadata = {};
        const parentGraphMap = {};

        expect(getOrgUnitsFromIds(ids, metadata, parentGraphMap)).toEqual([]);
    });

    it('only extracts org unit ids, not groups/levels', () => {
        const levelId = 'LEVEL_ID';
        const groupId = 'GROUP_ID';

        const ids = [`LEVEL-${levelId}`, `GROUP-${groupId}`];
        const metadata = {
            [levelId]: { name: 'Level', level: 1 },
            [groupId]: { name: 'Group' },
        };
        const parentGraphMap = {};

        expect(getOrgUnitsFromIds(ids, metadata, parentGraphMap)).toEqual([]);
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
