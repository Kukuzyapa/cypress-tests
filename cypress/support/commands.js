// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-iframe';


Cypress.Commands.add('getNumber', (el) => {
    return parseInt(el.replace(/,/g, '').match(/\d+/)[0])
})

Cypress.Commands.add('isCheckboxChecked', (checkboxName) => {
    cy.get(`div[data-loc="${checkboxName}"]`).invoke('attr', 'class').then((cls) => {
        expect(cls).to.contain('checked')
    })
})


// Cypress.Commands.addQuery('getNum', (txt) => {
//     return parseInt(txt.replace(/,/g, '').match(/\d+/)[0])
// })