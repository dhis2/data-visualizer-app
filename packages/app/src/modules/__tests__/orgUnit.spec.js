import {
    getOrgUnitsFromIds,
    removeLastPathSegment,
    getOuPath,
} from '../orgUnit';

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

// describe('getOrgUnitsFromIds', () => {
//     it('returns org unit objects with id, name and path', () => {
//         const levelUid = '2nd-floor'
//         const groupUid = 'fruit-group'
//         const ids = [
//             'ID0',
//             'ID1',
//             `${LEVEL_ID_PREFIX}-${levelUid}`,
//             `${GROUP_ID_PREFIX}-${groupUid}`,
//         ]
//         const metadata = {
//             [ids[0]]: {
//                 id: ids[0],
//                 name: 'Org unit 0',
//                 path: `/${ids[0]}`,
//             },
//             [ids[1]]: {
//                 id: ids[1],
//                 name: 'Org unit 1',
//                 path: `/${ids[1]}`,
//             },
//             [levelUid]: {
//                 id: levelUid,
//                 name: '2nd Floor',
//             },
//             [groupUid]: {
//                 id: groupUid,
//                 name: 'Fruit Group',
//             },
//         }
//         const metadataVals = Object.values(metadata)

//         const orgUnits = getOrgUnitsFromIds(ids, metadata, {})

//         expect(orgUnits.length).toEqual(4)

//         orgUnits.forEach((orgUnit, i) => {
//             expect(orgUnit.id).toEqual(ids[i])
//             expect(orgUnit.name).toEqual(metadataVals[i].name)
//             expect(orgUnit.path).toEqual(metadataVals[i].path)
//         })
//     })

//     it('returns empty array if there no org units in ou dimension', () => {
//         const ids = []
//         const metadata = {}
//         const parentGraphMap = {}

//         expect(getOrgUnitsFromIds(ids, metadata, parentGraphMap)).toEqual([])
//     })
// })
