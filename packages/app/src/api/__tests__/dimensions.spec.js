import {
    apiFetchAlternatives,
    apiFetchGroups,
    apiFetchDimensions,
} from '../dimensions';
import * as d2lib from 'd2';

let mockD2;
let mockGetFn;
let dimensionProps;

const checkMatches = (url, matches) => {
    matches.forEach(match => {
        if (match.not) {
            expect(url).not.toMatch(match.regex);
        } else {
            expect(url).toMatch(match.regex);
        }
    });
};

const asyncCheckMatches = (matches, done) => {
    setTimeout(() => {
        expect(mockGetFn).toHaveBeenCalledTimes(1);
        const url = mockGetFn.mock.calls[0][0];

        checkMatches(url, matches);
        done();
    });
};

describe('api: dimensions', () => {
    beforeEach(() => {
        mockGetFn = jest.fn().mockResolvedValue({ pager: {} });
        mockD2 = { Api: { getApi: () => ({ get: mockGetFn }) } };
        d2lib.getInstance = () => Promise.resolve(mockD2);
    });

    describe('apiFetchDimensions', () => {
        it('has correct entity and name property', done => {
            apiFetchDimensions('entireName');

            asyncCheckMatches(
                [
                    { regex: /\/dimensions\?/ },
                    { regex: /entireName~rename\(name\)/ },
                ],
                done
            );
        });
    });

    describe('apiFetchGroups', () => {
        beforeEach(() => {
            dimensionProps = {
                groupDetail: '',
                nameProp: 'entireName',
                groupId: 'ALL',
                page: 1,
            };
        });

        it('has correct endpoint, name prop, and page value for indicators', done => {
            apiFetchGroups('indicators', 'entireName');

            const matches = [
                { regex: /\/indicatorGroups\?/ },
                { regex: /displayName~rename\(name\)/ },
                { regex: /paging=false/ },
            ];

            asyncCheckMatches(matches, done);
        });

        it('has correct name prop for dataElements', done => {
            apiFetchGroups('dataElements', 'entireName');

            const matches = [
                { regex: /\/dataElementGroups\?/ },
                { regex: /entireName~rename\(name\)/ },
            ];

            asyncCheckMatches(matches, done);
        });

        it('does not make an api request for dataSets', done => {
            apiFetchGroups('dataSets');

            setTimeout(() => {
                expect(mockGetFn).not.toHaveBeenCalled();
                done();
            });
        });
    });

    describe('apiFetchAlternatives', () => {
        beforeEach(() => {
            dimensionProps = {
                groupDetail: '',
                nameProp: 'entireName',
                groupId: 'ALL',
                page: 1,
            };
        });

        describe('indicators url', () => {
            beforeEach(() => {
                dimensionProps.dataType = 'indicators';
            });

            it('has correct name, filter and page value', done => {
                apiFetchAlternatives(dimensionProps);

                const matches = [
                    { regex: /\/indicators\?/ },
                    { regex: /entireName~rename\(name\)/ },
                    { regex: /filter/, not: true },
                    { regex: /page=1/ },
                ];
                asyncCheckMatches(matches, done);
            });

            it('has correct filter text value', done => {
                dimensionProps.filterText = 'rarity';

                apiFetchAlternatives(dimensionProps);

                asyncCheckMatches(
                    [{ regex: /filter=entireName:ilike:rarity/ }],
                    done
                );
            });

            it('has correct filter based on group Id', done => {
                dimensionProps.groupId = 'rarity';

                apiFetchAlternatives(dimensionProps);

                asyncCheckMatches(
                    [{ regex: /filter=indicatorGroups\.id:eq:rarity/ }],
                    done
                );
            });
        });

        describe('dataElements url', () => {
            beforeEach(() => {
                dimensionProps.dataType = 'dataElements';
            });

            describe('totals', () => {
                it('has correct fields, filter, and page', done => {
                    apiFetchAlternatives(dimensionProps);

                    const matches = [
                        { regex: /\/dataElements\?/ },
                        { regex: /fields=id,entireName~rename\(name\)/ },
                        { regex: /filter=domainType:eq:AGGREGATE/ },
                        { regex: /filter=dataElementGroups/, not: true },
                        { regex: /page=1/ },
                    ];
                    asyncCheckMatches(matches, done);
                });

                it('has correct filter text value', done => {
                    dimensionProps.filterText = 'rarity';

                    apiFetchAlternatives(dimensionProps);

                    asyncCheckMatches(
                        [{ regex: /filter=entireName:ilike:rarity/ }],
                        done
                    );
                });

                it('has correct filter based on group Id', done => {
                    dimensionProps.groupId = 'rarity';

                    apiFetchAlternatives(dimensionProps);

                    asyncCheckMatches(
                        [{ regex: /filter=dataElementGroups\.id:eq:rarity/ }],
                        done
                    );
                });
            });

            describe('details', () => {
                beforeEach(() => {
                    dimensionProps.groupDetail = 'detail';
                });

                it('has correct fields, filter, and page', done => {
                    apiFetchAlternatives(dimensionProps);

                    const matches = [
                        { regex: /\/dataElementOperands\?/ },
                        { regex: /fields=id,entireName~rename\(name\)/ },
                        { regex: /filter/, not: true },
                        { regex: /page=1/ },
                    ];
                    asyncCheckMatches(matches, done);
                });

                it('has correct filter text value', done => {
                    dimensionProps.filterText = 'rarity';

                    apiFetchAlternatives(dimensionProps);

                    asyncCheckMatches(
                        [{ regex: /filter=entireName:ilike:rarity/ }],
                        done
                    );
                });

                it('has correct filter based on group Id', done => {
                    dimensionProps.groupId = 'rarity';

                    apiFetchAlternatives(dimensionProps);

                    asyncCheckMatches(
                        [
                            {
                                regex: /filter=dataElement\.dataElementGroups\.id:eq:rarity/,
                            },
                        ],
                        done
                    );
                });

                it('has correct url params for filterText and group Id', done => {
                    dimensionProps.filterText = 'rarity';
                    dimensionProps.groupId = 'rainbow';

                    apiFetchAlternatives(dimensionProps);

                    asyncCheckMatches(
                        [
                            { regex: /filter=entireName:ilike:rarity/ },
                            {
                                regex: /filter=dataElement\.dataElementGroups\.id:eq:rainbow/,
                            },
                        ],
                        done
                    );
                });
            });
        });

        describe('dataSets url', () => {
            beforeEach(() => {
                dimensionProps.dataType = 'dataSets';
            });

            it('has correct fields, filter, and page', done => {
                apiFetchAlternatives(dimensionProps);

                const matches = [
                    { regex: /\/dataSets\?/ },
                    { regex: /entireName~rename\(name\)/ },
                    { regex: /filter/, not: true },
                    { regex: /page=1/ },
                ];
                asyncCheckMatches(matches, done);
            });

            it('has correct filter text value', done => {
                dimensionProps.filterText = 'rarity';

                apiFetchAlternatives(dimensionProps);

                asyncCheckMatches(
                    [{ regex: /filter=entireName:ilike:rarity/ }],
                    done
                );
            });
        });

        describe('eventDataItems', () => {
            beforeEach(() => {
                dimensionProps.dataType = 'eventDataItems';
                mockGetFn = jest.fn().mockImplementation(url => {
                    if (url.includes('programDataElements')) {
                        return Promise.resolve({
                            programDataElements: [
                                {
                                    id: 'cc',
                                    name: 'Chocolate cake',
                                    valueType: 'NUMBER',
                                },
                                {
                                    id: 'em',
                                    name: 'English muffin',
                                    valueType: 'TEXT',
                                },
                            ],
                            pager: {},
                        });
                    } else if (url.includes('programs/')) {
                        return Promise.resolve({
                            name: 'Veggies',
                            programTrackedEntityAttributes: [
                                {
                                    trackedEntityAttribute: {
                                        id: 'spin',
                                        name: 'Spinach',
                                        valueType: 'TEXT',
                                    },
                                },
                                {
                                    trackedEntityAttribute: {
                                        id: 'broc',
                                        name: 'Broccoli',
                                        valueType: 'NUMBER',
                                    },
                                },
                            ],
                        });
                    }

                    return Promise.resolve({ pager: {} });
                });
            });

            it('returns the correct dimension items', done => {
                dimensionProps.groupId = 'rainbowdash';

                const expectedResult = {
                    dimensionItems: [
                        {
                            id: 'cc',
                            name: 'Chocolate cake',
                            valueType: 'NUMBER',
                        },
                        {
                            id: 'rainbowdash.broc',
                            name: 'Veggies Broccoli',
                            valueType: 'NUMBER',
                        },
                    ],
                    nextPage: null,
                };

                setTimeout(() => {
                    expect(
                        apiFetchAlternatives(dimensionProps)
                    ).resolves.toEqual(expectedResult);

                    done();
                });
            });

            it('has correct fields, filter, and page (data elements) in request url', done => {
                dimensionProps.groupId = 'rainbowdash';

                const matches = [
                    { regex: /\/programDataElements\?/ },
                    { regex: /entireName~rename\(name\)/ },
                    { regex: /filter/, not: true },
                    { regex: /page=1/ },
                    { regex: /program=rainbowdash/ },
                ];
                apiFetchAlternatives(dimensionProps);

                setTimeout(() => {
                    expect(mockGetFn).toHaveBeenCalledTimes(2);
                    const url = mockGetFn.mock.calls[0][0];

                    checkMatches(url, matches);
                    done();
                });
            });

            it('has correct filter text value in request url', done => {
                dimensionProps.filterText = 'rarity';

                const matches = [{ regex: /filter=entireName:ilike:rarity/ }];
                apiFetchAlternatives(dimensionProps);

                setTimeout(() => {
                    expect(mockGetFn).toHaveBeenCalledTimes(2);
                    const url = mockGetFn.mock.calls[0][0];

                    checkMatches(url, matches);
                    done();
                });
            });

            it('has correct fields and filter (attributes) in request url', done => {
                dimensionProps.groupId = 'rainbowdash';
                apiFetchAlternatives(dimensionProps);

                const matches = [
                    { regex: /\/programs\/rainbowdash/ },
                    { regex: /entireName~rename\(name\)/ },
                    { regex: /filter/, not: true },
                ];
                setTimeout(() => {
                    expect(mockGetFn).toHaveBeenCalledTimes(2);
                    const url = mockGetFn.mock.calls[1][0];

                    checkMatches(url, matches);
                    done();
                });
            });
        });

        describe('programIndicators url', () => {
            beforeEach(() => {
                dimensionProps.dataType = 'programIndicators';
            });

            it('has correct fields, filter, and page', done => {
                dimensionProps.groupId = 'rainbowdash';
                apiFetchAlternatives(dimensionProps);

                const matches = [
                    { regex: /\/programIndicators\?/ },
                    { regex: /entireName~rename\(name\)/ },
                    { regex: /page=1/ },
                    { regex: /filter=program.id:eq:rainbowdash/ },
                ];
                asyncCheckMatches(matches, done);
            });

            it('has correct filter text value', done => {
                dimensionProps.filterText = 'rarity';
                apiFetchAlternatives(dimensionProps);

                asyncCheckMatches(
                    [{ regex: /filter=entireName:ilike:rarity/ }],
                    done
                );
            });
        });
    });
});
