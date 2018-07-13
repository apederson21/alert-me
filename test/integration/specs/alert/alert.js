'use strict';

let utils = require('../../utils/utils');

describe('Alerts:', function () {

    // common assertions
    let assertContent = {
        header: function () {
            cy.get('.alertMe_header')
                .should('be.visible')
                .should('contain', 'My Heading');
        },
        body: function () {
            cy.get('.alertMe_body')
                .should('be.visible')
                .should('contain', 'Some body text for the alert');
        },
        button: function () {
            cy.get('.alertMe_button')
                .should('be.visible')
                .should('contain', 'Click Me')
                .click();
        },
        destroyed: function () {
            cy.get('body')
                .should('not.contain', 'div.alertMe_container');
        }
    }

    beforeEach(function () {
        cy.visit('');
    });

    describe('Round Theme', function () {

        beforeEach(function () {
            utils.selectTheme('round');
        });

        it('Verifies Alert with heading, text, button', function () {
            cy.get('#alert_1').click();

            // assert header
            assertContent.header();

            // assert body
            assertContent.body();

            // assert button and click
            assertContent.button();

            // assert alert is removed from DOM
            assertContent.destroyed();
        });

        it('Verifies Error Alert with heading, text, button', function () {
            cy.get('#alert_2').click();

            // assert header
            assertContent.header();
            cy.get('.alertMe_header')
                .should('have.class', 'alertMe_error')

            // assert body
            assertContent.body();

            // assert button and click
            assertContent.button();

            // assert alert is removed from DOM
            assertContent.destroyed();
        });

        it('Verifies Success Alert with heading, text, button', function () {
            cy.get('#alert_3').click();

            // assert header
            assertContent.header();
            cy.get('.alertMe_header')
                .should('have.class', 'alertMe_success')

            // assert body
            assertContent.body();

            // assert button and click
            assertContent.button();

            // assert alert is removed from DOM
            assertContent.destroyed();
        });

        it('Verifies Warning Alert with heading, text, button', function () {
            cy.get('#alert_4').click();

            // assert header
            assertContent.header();
            cy.get('.alertMe_header')
                .should('have.class', 'alertMe_warning')

            // assert body
            assertContent.body();

            // assert button and click
            assertContent.button();

            // assert alert is removed from DOM
            assertContent.destroyed();
        });

        it('Verifies Alert with heading, text, and default button', function () {
            cy.get('#alert_5').click();

            // assert header
            assertContent.header();

            // assert body
            assertContent.body();

            // assert button and click
            cy.get('.alertMe_button')
                .should('be.visible')
                .should('contain', 'Ok')
                .click();

            // assert alert is removed from DOM
            assertContent.destroyed();
        });

        it('Verifies Alert with heading and default button', function () {
            cy.get('#alert_6').click();

            // assert header
            assertContent.header();

            // assert button and click
            cy.get('.alertMe_button')
                .should('be.visible')
                .should('contain', 'Ok')
                .click();

            // assert alert is removed from DOM
            assertContent.destroyed();
        });

        it('Verifies Alert not displayed when called with no props', function () {
            cy.get('#alert_7').click();

            // assert no element in DOM
            assertContent.destroyed();
        });

    });

});
