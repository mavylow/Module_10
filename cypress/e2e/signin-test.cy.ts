describe('SignIn', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:5173/signin')
  })
  it('displaying correct ui for sign in', () => {
   
    cy.get(".sing-up").should("exist")
    cy.get("header").should("exist").should("not.contain.text", "Sign In").should("not.contain.text", "Sign Up")
    cy.get("#email").should("exist")
    cy.get("#password").should("exist")
    cy.get("label").should("exist").should('contain.text', "Email").and("contain.text", "Password")
    cy.get("button").should("contain.text", "Sign In")
    cy.get(".svg-email").should("exist")
    cy.get(".svg-eye").should("exist")
    cy.get("a").should("contain.text", "Sign up")
    cy.get("footer").should("exist").should("contain.text", "© 2026 sidekick")
  })

  it('typing in inputs and send correct form value', () => {
    cy.get('[data-testid="modal-message"] span').should("be.hidden");
    cy.get("#email").clear()
    cy.get("#email").type("helena.hills@social.com")
    cy.get(".check-icon").should("exist")

    cy.get("#password").type("password789")
    cy.get(".thumb-up-icon").should("exist")
    cy.get(".input-message").should('contain.text', "Your password is strong")

    cy.get("form button").click()
    cy.get('[data-testid="modal-message"] span').should("not.be.hidden").should('contain.text', "Signed in successfully");
    cy.location().its('href').should("equal", "http://localhost:5173/");

    cy.get("aside").should("exist")
    cy.get(".create-post").should("exist")
    cy.get(".comments").should("contain.text", "1 comments")
  })

  it('typing in wrong inputs data and try send form value', () => {
    cy.get('[data-testid="modal-message"] span').should("be.hidden");
    cy.get("#email").clear()
    cy.get("#email").type("wrong_email")
    cy.get(".check-icon").should("not.exist")
    cy.get(".error-warning-icon").should("exist")
    cy.get(".input-message").should('contain.text', "Email is not valid")
    cy.get("#password").type("password")
    cy.get(".thumb-up-icon").should("not.exist")
    cy.get(".input-message").should('contain.text', "Password must contain at least one number")

    cy.get("form button").click()
    cy.get('[data-testid="modal-message"] span').should("be.hidden")
    cy.location().its('href').should("not.equal", "http://localhost:5173/");
  })

  it('trying to sign in with mom existing user', () => {
    cy.get('[data-testid="modal-message"] span').should("be.hidden");
    cy.get("#email").clear()
    cy.get("#email").type("wrong_email@gmail.com")

    cy.get("#password").type("password123")

    cy.get("form button").click()
    cy.get('[data-testid="modal-message"] span').should("not.be.hidden").should("contain.text", "Data fetching error")
    cy.location().its('href').should("not.equal", "http://localhost:5173/");
  })

  it('navigating to sign up page', () => {
    cy.get("a").should("contain.text", "Sign up").click()
    cy.location().its('href').should("equal", "http://localhost:5173/signup");
  })
})