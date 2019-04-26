import { apiFetchDimensions } from '../dimensions';
import * as d2lib from 'd2';

let mockD2;
let mockGetFn;

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
});
