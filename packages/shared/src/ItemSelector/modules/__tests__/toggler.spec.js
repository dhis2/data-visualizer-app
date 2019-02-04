import { toggler } from '../toggler';

describe('using the toggler ', () => {
    let id;
    let isCtrlPressed;
    let isShiftPressed;
    let index;
    let lastClickedIndex;
    let highlightedIds;
    let items;

    describe('with only mouse click', () => {
        beforeEach(() => {
            id = 'id';
            isCtrlPressed = false;
            isShiftPressed = false;
            index = 1;
            lastClickedIndex = 0;
            highlightedIds = ['stuff', 'here'];
            items = ['some', 'id', 'strings'];
        });

        it('should not add duplicate items', () => {
            id = 'some';

            const expectedResult = {
                ids: [id],
                lastClickedIndex: index,
            };

            const actualResult = toggler(
                id,
                isCtrlPressed,
                isShiftPressed,
                index,
                lastClickedIndex,
                highlightedIds,
                items
            );

            expect(actualResult).toStrictEqual(expectedResult);
        });

        it('should update the lastClickedIndex', () => {
            const expectedResult = {
                ids: id,
                lastClickedIndex: index,
            };

            const actualResult = toggler(
                id,
                isCtrlPressed,
                isShiftPressed,
                index,
                lastClickedIndex,
                highlightedIds,
                items
            );

            expect(actualResult.lastClickedIndex).toEqual(
                expectedResult.lastClickedIndex
            );
        });

        it('should remove all items and replace the contens with only the given value (id)', () => {
            const expectedResult = {
                ids: [id],
                lastClickedIndex: index,
            };

            const actualResult = toggler(
                id,
                isCtrlPressed,
                isShiftPressed,
                index,
                lastClickedIndex,
                highlightedIds,
                items
            );

            expect(actualResult).toEqual(expectedResult);
        });
    });

    describe('with shift key pressed', () => {
        beforeEach(() => {
            id = 'ones';
            isCtrlPressed = false;
            isShiftPressed = true;
            index = 1;
            lastClickedIndex = 0;
            highlightedIds = ['ones', 'stuff', 'here'];
            items = [
                'ones',
                'some',
                'id',
                'strings',
                'stuff',
                'here',
                'as',
                'well',
            ];
        });

        it('should not update the lastClickedIndex', () => {
            const expectedResult = {
                ids: items,
                lastClickedIndex: lastClickedIndex,
            };

            const actualResult = toggler(
                id,
                isCtrlPressed,
                isShiftPressed,
                index,
                lastClickedIndex,
                highlightedIds,
                items
            );

            expect(actualResult.lastClickedIndex).toStrictEqual(
                expectedResult.lastClickedIndex
            );
        });

        it('should keep the highlighted ids and not add duplicate items', () => {
            const expectedResult = {
                ids: ['some', 'ones', 'stuff', 'here'],
                lastClickedIndex: lastClickedIndex,
            };

            const actualResult = toggler(
                id,
                isCtrlPressed,
                isShiftPressed,
                index,
                lastClickedIndex,
                highlightedIds,
                items
            );

            expect(actualResult).toEqual(expectedResult);
        });

        it('should add items from lastClickedIndex to current index into the array', () => {
            const expectedResult = {
                ids: ['some', 'ones', 'stuff', 'here'],
                lastClickedIndex: lastClickedIndex,
            };

            const actualResult = toggler(
                id,
                isCtrlPressed,
                isShiftPressed,
                index,
                lastClickedIndex,
                highlightedIds,
                items
            );

            expect(actualResult).toEqual(expectedResult);
        });
    });

    describe('with meta key pressed', () => {
        beforeEach(() => {
            id = 'ones';
            isCtrlPressed = true;
            isShiftPressed = false;
            index = 0;
            lastClickedIndex = 2;
            highlightedIds = ['stuff', 'here'];
            items = ['ones', 'stuff', 'here'];
        });

        it('should not add duplicate items', () => {
            id = 'stuff';

            const expectedResult = {
                ids: ['here'],
                lastClickedIndex: lastClickedIndex,
            };

            const actualResult = toggler(
                id,
                isCtrlPressed,
                isShiftPressed,
                index,
                lastClickedIndex,
                highlightedIds,
                items
            );

            expect(actualResult).toStrictEqual(expectedResult);
        });

        it('should be able to add one item and update the lastClickedIndex', () => {
            const expectedResult = {
                ids: highlightedIds.concat(id),
                lastClickedIndex: index,
            };

            const actualResult = toggler(
                id,
                isCtrlPressed,
                isShiftPressed,
                index,
                lastClickedIndex,
                highlightedIds,
                items
            );

            expect(actualResult).toStrictEqual(expectedResult);
        });

        it('should be able to remove one item without updating lastClickedIndex', () => {
            id = 'here';

            const expectedResult = {
                ids: ['stuff'],
                lastClickedIndex: lastClickedIndex,
            };

            const actualResult = toggler(
                id,
                isCtrlPressed,
                isShiftPressed,
                index,
                lastClickedIndex,
                highlightedIds,
                items
            );

            expect(actualResult).toStrictEqual(expectedResult);
        });
    });
});
