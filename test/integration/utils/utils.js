'use strict';

module.exports = {
    selectTheme: selectTheme
}

function selectTheme(theme) {
    if (!theme || theme === 'round') {
        return cy.get('#theme_round').click();
    }

    return cy.get('#theme_flat').click();
}
