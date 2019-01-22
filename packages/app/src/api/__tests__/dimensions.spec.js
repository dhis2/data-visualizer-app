import {
    apiFetchAlternatives,
    apiFetchGroups,
    apiFetchDimensions,
    fetchProgramDataElements,
    fetchTrackedEntityAttributes,
} from '../dimensions';
import * as d2lib from 'd2';

let mockD2;
let mockGetFn;
let dimensionProps;

const asyncCheckMatches = (matches, done) => {
    setTimeout(() => {
        expect(mockGetFn).toHaveBeenCalledTimes(1);
        const url = mockGetFn.mock.calls[0][0];

        matches.forEach(match => {
            if (match.not) {
                expect(url).not.toMatch(match.regex);
            } else {
                expect(url).toMatch(match.regex);
            }
        });
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

        describe('eventDataItems url', () => {
            beforeEach(() => {
                dimensionProps.dataType = 'eventDataItems';
            });

            it('has correct fields, filter, and page (data elements)', done => {
                dimensionProps.groupId = 'rainbowdash';
                fetchProgramDataElements(dimensionProps);

                const matches = [
                    { regex: /\/programDataElements\?/ },
                    { regex: /entireName~rename\(name\)/ },
                    { regex: /filter/, not: true },
                    { regex: /page=1/ },
                    { regex: /program=rainbowdash/ },
                ];
                asyncCheckMatches(matches, done);
            });

            it('has correct filter text value', done => {
                dimensionProps.filterText = 'rarity';
                fetchProgramDataElements(dimensionProps);

                asyncCheckMatches(
                    [{ regex: /filter=entireName:ilike:rarity/ }],
                    done
                );
            });

            it('has correct fields and filter (attributes)', done => {
                dimensionProps.groupId = 'rainbowdash';
                fetchTrackedEntityAttributes(dimensionProps);

                const matches = [
                    { regex: /\/programs\/rainbowdash/ },
                    { regex: /entireName~rename\(name\)/ },
                    { regex: /filter/, not: true },
                ];
                asyncCheckMatches(matches, done);
            });

            it('has correct filter text value', done => {
                dimensionProps.filterText = 'rarity';
                fetchTrackedEntityAttributes(dimensionProps);

                asyncCheckMatches(
                    [{ regex: /filter=entireName:ilike:rarity/ }],
                    done
                );
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
