import {
    apiFetchAlternatives,
    apiFetchGroups,
    apiFetchDimensions,
} from '../dimensions';
import * as d2lib from 'd2/lib/d2';

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
            apiFetchDimensions('hello');

            asyncCheckMatches(
                [
                    { regex: /\/dimensions\?/ },
                    { regex: /hello~rename\(name\)/ },
                ],
                done
            );
        });
    });

    describe('apiFetchGroups', () => {
        beforeEach(() => {
            dimensionProps = {
                groupDetail: '',
                nameProp: 'hello',
                groupId: 'ALL',
                page: 1,
            };
        });

        it('has correct endpoint and page value for indicators', done => {
            apiFetchGroups('indicators');

            const matches = [
                { regex: /\/indicatorGroups\?/ },
                { regex: /paging=false/ },
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
                nameProp: 'hello',
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
                    { regex: /hello~rename\(name\)/ },
                    { regex: /filter/, not: true },
                    { regex: /page=1/ },
                ];
                asyncCheckMatches(matches, done);
            });

            it('has correct filter text value', done => {
                dimensionProps.filterText = 'rarity';

                apiFetchAlternatives(dimensionProps);

                asyncCheckMatches(
                    [{ regex: /filter=hello:ilike:rarity/ }],
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
                        { regex: /fields=id,hello~rename\(name\)/ },
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
                        [{ regex: /filter=hello:ilike:rarity/ }],
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
                        { regex: /fields=id,hello~rename\(name\)/ },
                        { regex: /filter/, not: true },
                        { regex: /page=1/ },
                    ];
                    asyncCheckMatches(matches, done);
                });

                it('has correct filter text value', done => {
                    dimensionProps.filterText = 'rarity';

                    apiFetchAlternatives(dimensionProps);

                    asyncCheckMatches(
                        [{ regex: /filter=hello:ilike:rarity/ }],
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
                            { regex: /filter=hello:ilike:rarity/ },
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
                    { regex: /hello~rename\(name\)/ },
                    { regex: /filter/, not: true },
                    { regex: /page=1/ },
                ];
                asyncCheckMatches(matches, done);
            });

            it('has correct filter text value', done => {
                dimensionProps.filterText = 'rarity';

                apiFetchAlternatives(dimensionProps);

                asyncCheckMatches(
                    [{ regex: /filter=hello:ilike:rarity/ }],
                    done
                );
            });
        });

        describe('eventDataItems url', () => {
            beforeEach(() => {
                dimensionProps.dataType = 'eventDataItems';
            });

            it('has correct fields, filter, and page', done => {
                dimensionProps.groupId = 'rainbowdash';
                apiFetchAlternatives(dimensionProps);

                const matches = [
                    { regex: /\/programDataElements\?/ },
                    { regex: /hello~rename\(name\)/ },
                    { regex: /filter/, not: true },
                    { regex: /page=1/ },
                    { regex: /program=rainbowdash/ },
                ];
                asyncCheckMatches(matches, done);
            });

            it('has correct filter text value', done => {
                dimensionProps.filterText = 'rarity';

                apiFetchAlternatives(dimensionProps);

                asyncCheckMatches(
                    [{ regex: /filter=hello:ilike:rarity/ }],
                    done
                );
            });
        });
    });
});
