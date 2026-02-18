describe('SignIn', () => {
  it('ui tests', () => {
    cy.visit('http://localhost:5173/signin')
    cy.get(".sing-up").should("exist")

    cy.get("#email").should("exist")
    cy.get("#password").should("exist")
    cy.get("label").should("exist").should('contain.text', "Email").and("contain.text", "Password")
  })
})