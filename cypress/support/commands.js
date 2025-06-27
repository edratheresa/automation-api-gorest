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
Cypress.Commands.add('apiRequest', (method, endpoint, options = {}) => {
    cy.request({
        method,
        url: `${Cypress.env('baseUrl') || 'https://gorest.co.in/'}${endpoint}`,
        headers: {
            'x-api-key' : 'reqres-free-v1',
            'Authorization' : 'Bearer 845cb6c5343e027e3f4b1cba32c7c16916ce966b7aa01af5c711a20510e8aa06',
            ...options.headers,
        },
        body: options.body,
        ...options,
    });
});