/* global cy */

describe('Data visualizer', function() {
    it('Selects a data dimension and generates the chart', function() {
        cy.visit('/');
        cy.get('#label-dx').click();
        //choose indicator group
        //double-click specific item
        //click Update
        //check that chart is generated
    });

    // it('Does not do much!', function() {
    //     expect(true).to.equal(true);
    // });
});
