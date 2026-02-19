describe("CreatePost", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/signin");
    cy.get('[data-testid="modal-message"] span').should("be.hidden");
    cy.get("#email").clear();
    cy.get("#email").type("helena.hills@social.com");
    cy.get("#password").type("password789");
    cy.get("form button").click();
  });
  it("should open the create post modal with correct UI", () => {
    cy.get(".create-post button")
      .should("contain.text", "Tell everyone")
      .click();

    cy.get('[data-testid="add-post-form"]').should("be.visible");

    cy.get("#post-title").should("exist");
    cy.get("#post-description").should("exist");
    cy.get("#image").should("exist").and("have.attr", "type", "file");
    cy.get("label.postImg-label").should(
      "contain.text",
      "Select a file or drag and drop here"
    );
    cy.get('[type="submit"]').should("contain.text", "Create");
    cy.get(".post-form-header button").click();
    cy.get('[data-testid="add-post-form"]').should("not.exist");
  });

  it("should show validation errors when submitting empty form", () => {
    cy.get(".create-post button").click();
    cy.get('[type="submit"]').click();
    cy.contains("Title is required").should("be.visible");
    cy.contains("Description is required").should("be.visible");
  });
  it("should create a post successfully", () => {
    cy.get(".create-post button").click();

    cy.get("#post-title").type("My new post");
    cy.get("#post-description").type("This is a test post created by Cypress.");

    const fileName = "test-image.jpg";

    cy.fixture(fileName, "base64").then((fileContent) => {
      cy.get("#image").selectFile(
        {
          contents: Cypress.Buffer.from(fileContent, "base64"),
          fileName,
          mimeType: "image/jpeg",
        },
        { force: true }
      );
    });

    cy.get('[type="submit"]').click();
    cy.contains(".post", "My new post").within(() => {
      cy.get(".post-text p").should(
        "contain.text",
        "This is a test post created by Cypress."
      );
    });

    cy.get(".post figure").should("exist");
    cy.get('[data-testid="add-post-form"]').should("not.exist");
  });

  it("should add a new post to the list", () => {
    cy.get(".post").then((posts) => {
      const initialCount = posts.length;
  
      cy.get(".create-post button").click();
      cy.get("#post-title").type("Count test post");
      cy.get("#post-description").type("Check count increase");
  
      cy.get('[type="submit"]').click();
  
      cy.get(".post").should("have.length", initialCount + 1);
    });
  });

  it("should reset form after successful submit", () => {
    cy.get(".create-post button").click();
  
    cy.get("#post-title").type("Reset test");
    cy.get("#post-description").type("Reset description");
  
    cy.get('[type="submit"]').click();
  
    cy.get(".create-post button").click();
  
    cy.get("#post-title").should("have.value", "");
    cy.get("#post-description").should("have.value", "");
  });

  it("should close modal when clicking overlay", () => {
    cy.get(".create-post button").click();
    cy.get(".overlay").click({ force: true });
  
    cy.get('[data-testid="add-post-form"]').should("not.exist");
  });

  it("should create post without image", () => {
    cy.get(".create-post button").click();
  
    cy.get("#post-title").type("Post without image");
    cy.get("#post-description").type("No image attached");
  
    cy.get('[type="submit"]').click();
  
    cy.contains(".post", "Post without image").should("exist");
  });

});
