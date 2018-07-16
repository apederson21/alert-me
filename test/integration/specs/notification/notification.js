'use strict';

let utils = require('../../utils/utils');

describe('Notifications:', function () {

    // common assertions
    let assertContent = {
        container: function (){
            cy.get('.alertMe_container')
                .should('be.visible')
        },
        header: function () {
            cy.get('.alertMe_header')
                .should('be.visible')
                .should('contain', 'My Heading');
        },
        body: function () {
            cy.get('.alertMe_body')
                .should('be.visible')
                .should('contain', 'Some body text for the notification');
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
        },
        destroyed: function () {
            // todo
        }
    }

    beforeEach(function () {
        cy.visit('');
    });

    describe('Round Theme', function () {

        beforeEach(function () {
            utils.selectTheme('round');
        });

        it('Verifies Notification with heading, text, closeX', function () {
            cy.get('#notification_1').click();

            // asser container
            assertContent.container();

            // assert header
            assertContent.header();

            // assert body
            assertContent.body();

            // assert closeX and close
            assertContent.closeX();
            assertContent.closeXConsole();

            // assert notification is removed from DOM
            assertContent.destroyed();
        });

        it('Verifies Error Notification with heading, text, closeX', function () {
            cy.get('#notification_2').click();

            // asser container
            assertContent.container();

            // assert header
            assertContent.header();
            cy.get('.alertMe_header')
                .should('have.class', 'alertMe_error');

            // assert body
            assertContent.body();

            // assert closeX and close
            assertContent.closeX();
            assertContent.closeXConsole();

            // assert notification is removed from DOM
            assertContent.destroyed();
        });

        it('Verifies Success Notification with heading, text, closeX', function () {
            cy.get('#notification_3').click();

            // asser container
            assertContent.container();

            // assert header
            assertContent.header();
            cy.get('.alertMe_header')
                .should('have.class', 'alertMe_success');

            // assert body
            assertContent.body();

            // assert closeX and close
            assertContent.closeX();
            assertContent.closeXConsole();

            // assert notification is removed from DOM
            assertContent.destroyed();
        });

        it('Verifies Warning Notification with heading, text, closeX', function () {
            cy.get('#notification_4').click();

            // asser container
            assertContent.container();

            // assert header
            assertContent.header();
            cy.get('.alertMe_header')
                .should('have.class', 'alertMe_warning');

            // assert body
            assertContent.body();

            // assert closeX and close
            assertContent.closeX();
            assertContent.closeXConsole();

            // assert notification is removed from DOM
            assertContent.destroyed();
        });

        it('Verifies Notification with heading and closeX', function () {
            cy.get('#notification_5').click();

            // asser container
            assertContent.container();

            // assert header
            assertContent.header();
            cy.get('.alertMe_header');

            // assert closeX and close
            assertContent.closeX();
            assertContent.closeXConsole();

            // assert notification is removed from DOM
            assertContent.destroyed();
        });

        it('Verifies Notification with heading and autoClose functionality', function () {
            cy.get('#notification_6').click();

            // asser container
            assertContent.container();

            // assert header
            assertContent.header();
            cy.get('.alertMe_header');

            // assert closeX not present
            cy.get('.alertMe_header')
                .should('not.contain', 'div');

            // assert notification is removed from DOM
            assertContent.destroyed();
        });

        it('Verifies Notification not displayed when called with no props', function () {
            cy.get('#notification_7').click();

            // assert no element in DOM
            assertContent.destroyed();
        });

    });

});
