import { apiFetchAlternatives } from '../dimensions';
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
                expect(url).not.toMatch(match.pattern);
            } else {
                expect(url).toMatch(match.pattern);
            }
        });
        done();
    });
};

describe('api: dimensions', () => {
    beforeEach(() => {
        d2lib.getInstance = () => Promise.resolve(mockD2);

        dimensionProps = {
            groupDetail: '',
            nameProp: 'hello',
            groupId: 'ALL',
            page: 1,
        };
        mockGetFn = jest.fn().mockResolvedValue({
            pager: {},
        });

        mockD2 = {
            Api: {
                getApi: () => ({
                    get: mockGetFn,
                }),
            },
        };
    });

    describe('indicators url', () => {
        beforeEach(() => {
            dimensionProps.dataType = 'indicators';
        });

        it('has correct name, filter and page value', done => {
            apiFetchAlternatives(dimensionProps);

            const matches = [
                { pattern: /hello~rename\(name\)/ },
                { pattern: /filter/, not: true },
                { pattern: /page=1/ },
            ];
            asyncCheckMatches(matches, done);
        });

        it('has correct filter text value', done => {
            dimensionProps.filterText = 'rarity';

            apiFetchAlternatives(dimensionProps);

            asyncCheckMatches([{ pattern: /filter=hello:ilike:rarity/ }], done);
        });

        it('has correct filter based on group Id', done => {
            dimensionProps.groupId = 'rarity';

            apiFetchAlternatives(dimensionProps);

            asyncCheckMatches(
                [{ pattern: /filter=indicatorGroups\.id:eq:rarity/ }],
                done
            );
        });
    });

    describe('dataElements url', () => {
        beforeEach(() => {
            dimensionProps.dataType = 'dataElements';
        });

        describe('totals', () => {
            it('fetches dataElements without filter text', done => {
                apiFetchAlternatives(dimensionProps);

                const matches = [
                    { pattern: /fields=id,hello~rename\(name\)/ },
                    { pattern: /filter=domainType:eq:AGGREGATE/ },
                    { pattern: /filter=dataElementGroups/, not: true },
                    { pattern: /page=1/ },
                ];
                asyncCheckMatches(matches, done);
            });

            it('fetches dataElements with filter text', done => {
                dimensionProps.filterText = 'rarity';

                apiFetchAlternatives(dimensionProps);

                asyncCheckMatches(
                    [{ pattern: /filter=hello:ilike:rarity/ }],
                    done
                );
            });

            it('fetches dataElements with group id', done => {
                dimensionProps.groupId = 'rarity';

                apiFetchAlternatives(dimensionProps);

                asyncCheckMatches(
                    [{ pattern: /filter=dataElementGroups\.id:eq:rarity/ }],
                    done
                );
            });
        });

        describe('details', () => {
            beforeEach(() => {
                dimensionProps.groupDetail = 'detail';
            });

            it('fetches dataElements without filter text', done => {
                apiFetchAlternatives(dimensionProps);

                const matches = [
                    { pattern: /fields=id,hello~rename\(name\)/ },
                    { pattern: /filter/, not: true },
                    { pattern: /page=1/ },
                ];
                asyncCheckMatches(matches, done);
            });

            it('fetches dataElements with filter text', done => {
                dimensionProps.filterText = 'rarity';

                apiFetchAlternatives(dimensionProps);

                asyncCheckMatches(
                    [{ pattern: /filter=hello:ilike:rarity/ }],
                    done
                );
            });

            it('fetches dataElements with group id', done => {
                dimensionProps.groupId = 'rarity';

                apiFetchAlternatives(dimensionProps);

                asyncCheckMatches(
                    [
                        {
                            pattern: /filter=dataElement\.dataElementGroups\.id:eq:rarity/,
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
                        { pattern: /filter=hello:ilike:rarity/ },
                        {
                            pattern: /filter=dataElement\.dataElementGroups\.id:eq:rainbow/,
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

        it('fetches dataSets without filter text', done => {
            apiFetchAlternatives(dimensionProps);

            const matches = [
                { pattern: /hello~rename\(name\)/ },
                { pattern: /filter/, not: true },
                { pattern: /page=1/ },
            ];
            asyncCheckMatches(matches, done);
        });

        it('fetches dataSets with filter text', done => {
            dimensionProps.filterText = 'rarity';

            apiFetchAlternatives(dimensionProps);

            asyncCheckMatches([{ pattern: /filter=hello:ilike:rarity/ }], done);
        });
    });

    describe('eventDataItems url', () => {
        beforeEach(() => {
            dimensionProps.dataType = 'eventDataItems';
        });

        it('fetches eventDataItems without filter text', done => {
            dimensionProps.groupId = 'rainbowdash';
            apiFetchAlternatives(dimensionProps);

            const matches = [
                { pattern: /hello~rename\(name\)/ },
                { pattern: /filter/, not: true },
                { pattern: /page=1/ },
                { pattern: /program=rainbowdash/ },
            ];
            asyncCheckMatches(matches, done);
        });

        it('fetches eventDataItems with filter text', done => {
            dimensionProps.filterText = 'rarity';

            apiFetchAlternatives(dimensionProps);

            asyncCheckMatches([{ pattern: /filter=hello:ilike:rarity/ }], done);
        });
    });
});
