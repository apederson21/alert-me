'use strict';

let utils = require('../../utils/utils');

describe('Ribbon:', function () {

    // common assertions
    let assertContent = {
        body: function () {
            cy.get('.alertMe_body')
                .should('be.visible')
                .should('contain', 'Some body text for the ribbon');
        },
        closeX: function () {
            cy.get('div.alertMe_closeX')
                .should('be.visible');
        },
        // automation cannot click the pseudo elements,
        // so instead we can use the global alertMe close()
        closeXConsole: function () {
            cy.window().then((win) => {
                win.alertMe.close();
            });
        }
    }

    beforeEach(function () {
        cy.visit('');
    });

    describe('Round Theme', function () {

        beforeEach(function () {
            utils.selectTheme('round');
        });

        it('Verifies Ribbon with heading, text, closeX', function () {
            cy.get('#ribbon_1').click();

            // asser container
            utils.assertions().container();

            // assert header
            utils.assertions().header();

            // assert body
            assertContent.body();

            // assert closeX and close
            assertContent.closeX();
            assertContent.closeXConsole();

            // assert ribbon is removed from DOM
            utils.assertions().destroyed();
        });

        it('Verifies Error Ribbon with heading, text, closeX', function () {
            cy.get('#ribbon_2').click();

            // asser container
            utils.assertions().container();

            // assert header
            utils.assertions().header();
            cy.get('.alertMe_header')
                .should('have.class', 'alertMe_error');

            // assert body
            assertContent.body();

            // assert closeX and close
            assertContent.closeX();
            assertContent.closeXConsole();

            // assert ribbon is removed from DOM
            utils.assertions().destroyed();
        });

        it('Verifies Success Ribbon with heading, text, closeX', function () {
            cy.get('#ribbon_3').click();

            // asser container
            utils.assertions().container();

            // assert header
            utils.assertions().header();
            cy.get('.alertMe_header')
                .should('have.class', 'alertMe_success');

            // assert body
            assertContent.body();

            // assert closeX and close
            assertContent.closeX();
            assertContent.closeXConsole();

            // assert ribbon is removed from DOM
            utils.assertions().destroyed();
        });

        it('Verifies Warning Ribbon with heading, text, closeX', function () {
            cy.get('#ribbon_4').click();

            // asser container
            utils.assertions().container();

            // assert header
            utils.assertions().header();
            cy.get('.alertMe_header')
                .should('have.class', 'alertMe_warning');

            // assert body
            assertContent.body();

            // assert closeX and close
            assertContent.closeX();
            assertContent.closeXConsole();

            // assert ribbon is removed from DOM
            utils.assertions().destroyed();
        });

        it('Verifies Ribbon with heading and closeX', function () {
            cy.get('#ribbon_5').click();

            // asser container
            utils.assertions().container();

            // assert header
            utils.assertions().header();
            cy.get('.alertMe_header');

            // assert closeX and close
            assertContent.closeX();
            assertContent.closeXConsole();

            // assert ribbon is removed from DOM
            utils.assertions().destroyed();
        });

        it('Verifies Ribbon with heading and autoClose functionality', function () {
            cy.get('#ribbon_6').click();

            // asser container
            utils.assertions().container();

            // assert header
            utils.assertions().header();
            cy.get('.alertMe_header');

            // assert closeX not present
            cy.get('.alertMe_header')
                .should('not.contain', 'div');

            // assert ribbon is removed from DOM
            utils.assertions().destroyed();
        });

        it('Verifies Ribbon not displayed when called with no props', function () {
            cy.get('#ribbon_7').click();

            // assert no element in DOM
            utils.assertions().destroyed();
        });

    });

});
