/// <reference types="cypress" />

context("Main", () => {
   beforeEach(() => {
      cy.visit("http://localhost:3000")
   })

   it("has title", () => {
      cy.get("h1").should("be.visible")
   })

})