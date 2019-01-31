import {
    LEVEL_ID_PREFIX,
    GROUP_ID_PREFIX,
    isLevelId,
    isGroupId,
    getOrgUnitPath,
    getOrgUnitsFromIds,
    getLevelsFromIds,
    getGroupsFromIds,
    sortOrgUnitLevels,
    transformOptionsIntoMetadata,
} from '../orgUnitDimensions';

describe('isLevelId', () => {
    it('should return false for empty string', () => {
        expect(isLevelId('')).toBe(false);
    });

    it('should return true for level id', () => {
        const id = `${LEVEL_ID_PREFIX}-ID`;

        expect(isLevelId(id)).toBe(true);
    });

    it('should return false for non-level id', () => {
        const id = 'NON_LEVEL_ID';

        expect(isLevelId(id)).toBe(false);
    });
});

describe('isGroupId', () => {
    it('should return false for empty string', () => {
        expect(isGroupId('')).toBe(false);
    });

    it('should return true for group id', () => {
        const id = `${GROUP_ID_PREFIX}-ID`;

        expect(isGroupId(id)).toBe(true);
    });

    it('should return false for non-group id', () => {
        const id = 'NON_GROUP_ID';

        expect(isGroupId(id)).toBe(false);
    });
});

describe('getOrgUnitPath', () => {
    it('handles root org units', () => {
        const id = 'ROOT_ID';
        const metadata = {};
        const parentGraphMap = { ROOT_ID: '' };

        expect(getOrgUnitPath(id, metadata, parentGraphMap)).toEqual(
            '/ROOT_ID'
        );
    });

    it('returns path for org unit defined in metadata', () => {
        const path = 'path';
        const id = 'ORG_UNIT_ID';
        const metadata = {
            [id]: { path },
        };

        expect(getOrgUnitPath(id, metadata)).toEqual(path);
    });

    it('returns proper path for org unit not defined in metadata, but in parent graph', () => {
        const id = 'ORG_UNIT_ID';
        const path = 'path';
        const metadata = {};
        const parentGraphMap = { [id]: path };

        expect(getOrgUnitPath(id, metadata, parentGraphMap)).toEqual(
            `/${path}/${id}`
        );
    });
});

describe('getOrgUnitsFromIds', () => {
    it('returns org units with ids in given array', () => {
        const ids = [
            'ID1',
            'ID2',
            `${LEVEL_ID_PREFIX}-LEVEL`,
            `${GROUP_ID_PREFIX}-GROUP_ID`,
        ];
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

        const ids = [
            `${LEVEL_ID_PREFIX}-${levelId}`,
            `${GROUP_ID_PREFIX}-${groupId}`,
        ];
        const metadata = {
            [levelId]: { name: 'Level', level: 1 },
            [groupId]: { name: 'Group' },
        };
        const parentGraphMap = {};

        expect(getOrgUnitsFromIds(ids, metadata, parentGraphMap)).toEqual([]);
    });
});

describe('getLevelsFromIds', () => {
    it('returns empty array if there are no level options', () => {
        const ids = [];
        const levelOptions = [];

        expect(getLevelsFromIds(ids, levelOptions)).toEqual([]);
    });

    it('returns levels from ids', () => {
        const levelId1 = 'LEVEL_ID_1';
        const levelId2 = 'LEVEL_ID_2';
        const level1 = 1;
        const level2 = 2;
        const ids = [
            `${LEVEL_ID_PREFIX}-${level1}`,
            `${LEVEL_ID_PREFIX}-${level2}`,
        ];
        const levelOptions = [
            { id: levelId1, level: level1 },
            { id: levelId2, level: level2 },
        ];

        const result = getLevelsFromIds(ids, levelOptions);

        expect(result.length).toEqual(2);
        expect(result.includes(levelId1)).toBe(true);
        expect(result.includes(levelId2)).toBe(true);
    });

    it('returns empty array if ids array is empty', () => {
        const result = getLevelsFromIds([], [{}]);

        expect(result).toEqual([]);
    });
});

describe('getGroupsFromIds', () => {
    it('returns empty array if there are no group options', () => {
        const ids = [];
        const groupOptions = [];

        expect(getGroupsFromIds(ids, groupOptions)).toEqual([]);
    });

    it('returns groups from ids', () => {
        const groupId1 = 'GROUP_ID_1';
        const groupId2 = 'GROUP_ID_2';
        const ids = [
            `${GROUP_ID_PREFIX}-${groupId1}`,
            `${GROUP_ID_PREFIX}-${groupId2}`,
            'ANOTHER_ID',
            'SOME_OTHER_ID',
        ];
        const groupOptions = [{ id: groupId1 }, { id: groupId2 }];

        const result = getGroupsFromIds(ids, groupOptions);

        expect(result.length).toEqual(2);
        expect(result.includes(groupId1)).toBe(true);
        expect(result.includes(groupId2)).toBe(true);
    });

    it('returns empty array if ids array is empty', () => {
        const result = getGroupsFromIds([], [{}]);

        expect(result).toEqual([]);
    });
});

describe('sortOrgUnitLevels', () => {
    it('returns empty array on empty input', () => {
        expect(sortOrgUnitLevels([])).toEqual([]);
    });

    it('sorts array by level ASC', () => {
        const options = [
            { level: 3 },
            { level: 4 },
            { level: 1 },
            { level: 2 },
        ];
        const sortedOptions = [
            { level: 1 },
            { level: 2 },
            { level: 3 },
            { level: 4 },
        ];

        expect(sortOrgUnitLevels(options)).toEqual(sortedOptions);
    });
});

describe('transformOptionsIntoMetadata', () => {
    it('returns appropriate result for empty options', () => {
        const options = [];
        const metadata = {};

        const result = transformOptionsIntoMetadata(options, metadata);

        expect(result.options.length).toEqual(0);
        expect(Object.keys(result.metadata).length).toEqual(0);
    });

    it('transforms options into metadata', () => {
        const options = [
            { id: 'OPTION_ID_1', name: 'Option 1', displayName: 'Option 1' },
            { id: 'OPTION_ID_2', name: 'Option 2', displayName: 'Option 2' },
        ];
        const metadata = {};

        const result = transformOptionsIntoMetadata(options, metadata);

        expect(Object.keys(result.metadata).length).toEqual(2);
        expect(result.options).toEqual(options);

        options.forEach(option => {
            expect(result.metadata[option.id]).toEqual(option);
        });
    });

    it('skips options which are already in metadata', () => {
        const options = [
            { id: 'OPTION_ID_1', name: 'Option 1', displayName: 'Option 1' },
            { id: 'OPTION_ID_2', name: 'Option 2', displayName: 'Option 2' },
            { id: 'OPTION_ID_3', name: 'Option 3', displayName: 'Option 3' },
            { id: 'OPTION_ID_4', name: 'Option 4', displayName: 'Option 4' },
        ];
        const metadata = {
            OPTION_ID_3: {
                id: 'OPTION_ID_3',
                name: 'Option 3',
                displayName: 'Option 3',
            },
            OPTION_ID_4: {
                id: 'OPTION_ID_4',
                name: 'Option 4',
                displayName: 'Option 4',
            },
        };

        const result = transformOptionsIntoMetadata(options, metadata);

        expect(Object.keys(result.metadata).length).toEqual(2);
        expect(result.options).toEqual(options);

        const metadataIds = Object.keys(metadata).map(id => id);
        const resultMetadataIds = Object.keys(result.metadata).map(id => id);

        metadataIds.forEach(id =>
            expect(resultMetadataIds.includes(id)).toBe(false)
        );
    });

    it('transforms using custom fields', () => {
        const options = [
            { id: 'OPTION_ID_1', customProperty: 'Custom property 1' },
            { id: 'OPTION_ID_2', customProperty: 'Custom property 2' },
        ];
        const metadata = {};

        const result = transformOptionsIntoMetadata(options, metadata, [
            'id',
            'customProperty',
        ]);

        expect(result.options).toEqual(options);
        expect(Object.keys(result.metadata).length).toEqual(options.length);

        Object.keys(result.metadata).forEach(id => {
            expect(result.metadata[id]).toEqual(
                options.find(option => option.id === id)
            );
        });
    });
});
