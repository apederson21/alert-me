'use strict';

let utils = require('../../utils/utils');

describe('Alerts:', function () {

    // common assertions
    let assertContent = {
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

            // asser container
            utils.assertions().container();

            // assert header
            utils.assertions().header();

            // assert body
            assertContent.body();

            // assert button and click
            assertContent.button();

            // assert alert is removed from DOM
            utils.assertions().destroyed();
        });

        it('Verifies Error Alert with heading, text, button', function () {
            cy.get('#alert_2').click();

            // asser container
            utils.assertions().container();

            // assert header
            utils.assertions().header();
            cy.get('.alertMe_header')
                .should('have.class', 'alertMe_error');

            // assert body
            assertContent.body();

            // assert button and click
            assertContent.button();

            // assert alert is removed from DOM
            utils.assertions().destroyed();
        });

        it('Verifies Success Alert with heading, text, button', function () {
            cy.get('#alert_3').click();

            // asser container
            utils.assertions().container();

            // assert header
            utils.assertions().header();
            cy.get('.alertMe_header')
                .should('have.class', 'alertMe_success');

            // assert body
            assertContent.body();

            // assert button and click
            assertContent.button();

            // assert alert is removed from DOM
            utils.assertions().destroyed();
        });

        it('Verifies Warning Alert with heading, text, button', function () {
            cy.get('#alert_4').click();

            // asser container
            utils.assertions().container();

            // assert header
            utils.assertions().header();
            cy.get('.alertMe_header')
                .should('have.class', 'alertMe_warning');

            // assert body
            assertContent.body();

            // assert button and click
            assertContent.button();

            // assert alert is removed from DOM
            utils.assertions().destroyed();
        });

        it('Verifies Alert with heading, text, and default button', function () {
            cy.get('#alert_5').click();

            // asser container
            utils.assertions().container();

            // assert header
            utils.assertions().header();

            // assert body
            assertContent.body();

            // assert button and click
            cy.get('.alertMe_button')
                .should('be.visible')
                .should('contain', 'Ok')
                .click();

            // assert alert is removed from DOM
            utils.assertions().destroyed();
        });

        it('Verifies Alert with heading and default button', function () {
            cy.get('#alert_6').click();

            // asser container
            utils.assertions().container();

            // assert header
            utils.assertions().header();

            // assert button and click
            cy.get('.alertMe_button')
                .should('be.visible')
                .should('contain', 'Ok')
                .click();

            // assert alert is removed from DOM
            utils.assertions().destroyed();
        });

        it('Verifies Alert not displayed when called with no props', function () {
            cy.get('#alert_7').click();

            // assert no element in DOM
            utils.assertions().destroyed();
        });

    });

    describe('Flat Theme', function () {

        beforeEach(function () {
            utils.selectTheme('flat');
        });

        it('Verifies Alert with heading, text, button', function () {
            cy.get('#alert_1').click();

            // asser container
            utils.assertions().container('flat');

            // assert header
            utils.assertions().header();

            // assert body
            assertContent.body();

            // assert button and click
            assertContent.button();

            // assert alert is removed from DOM
            utils.assertions().destroyed();
        });

        it('Verifies Error Alert with heading, text, button', function () {
            cy.get('#alert_2').click();

            // asser container
            utils.assertions().container('flat');

            // assert header
            utils.assertions().header();
            cy.get('.alertMe_header')
                .should('have.class', 'alertMe_error');

            // assert body
            assertContent.body();

            // assert button and click
            assertContent.button();

            // assert alert is removed from DOM
            utils.assertions().destroyed();
        });

        it('Verifies Success Alert with heading, text, button', function () {
            cy.get('#alert_3').click();

            // asser container
            utils.assertions().container('flat');

            // assert header
            utils.assertions().header();
            cy.get('.alertMe_header')
                .should('have.class', 'alertMe_success');

            // assert body
            assertContent.body();

            // assert button and click
            assertContent.button();

            // assert alert is removed from DOM
            utils.assertions().destroyed();
        });

        it('Verifies Warning Alert with heading, text, button', function () {
            cy.get('#alert_4').click();

            // asser container
            utils.assertions().container('flat');

            // assert header
            utils.assertions().header();
            cy.get('.alertMe_header')
                .should('have.class', 'alertMe_warning');

            // assert body
            assertContent.body();

            // assert button and click
            assertContent.button();

            // assert alert is removed from DOM
            utils.assertions().destroyed();
        });

        it('Verifies Alert with heading, text, and default button', function () {
            cy.get('#alert_5').click();

            // asser container
            utils.assertions().container('flat');

            // assert header
            utils.assertions().header();

            // assert body
            assertContent.body();

            // assert button and click
            cy.get('.alertMe_button')
                .should('be.visible')
                .should('contain', 'Ok')
                .click();

            // assert alert is removed from DOM
            utils.assertions().destroyed();
        });

        it('Verifies Alert with heading and default button', function () {
            cy.get('#alert_6').click();

            // asser container
            utils.assertions().container('flat');

            // assert header
            utils.assertions().header();

            // assert button and click
            cy.get('.alertMe_button')
                .should('be.visible')
                .should('contain', 'Ok')
                .click();

            // assert alert is removed from DOM
            utils.assertions().destroyed();
        });

        it('Verifies Alert not displayed when called with no props', function () {
            cy.get('#alert_7').click();

            // assert no element in DOM
            utils.assertions().destroyed();
        });

    });

});
