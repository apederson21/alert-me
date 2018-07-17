'use strict';

module.exports = {
    assertions: assertions,
    selectTheme: selectTheme
}

function assertions() {
    return {
        container: function (theme) {
            cy.get(`.alertMe_container.${theme || 'round'}`)
                .should('be.visible')
        },
        header: function () {
            cy.get('.alertMe_header')
                .should('be.visible')
                .should('contain', 'My Heading');
        },
        destroyed: function () {
            cy.get('body')
                .children()
                .should('not.contain', 'div.alertMe_container');
        }
    }
}

function selectTheme(theme) {
    if (!theme || theme === 'round') {
        return cy.get('#theme_round').click();
    }

    return cy.get('#theme_flat').click();
}
