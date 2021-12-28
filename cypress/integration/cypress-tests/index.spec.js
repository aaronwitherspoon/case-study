/// <reference types="cypress" />

context("Main", () => {
   beforeEach(() => {
      cy.visit("http://localhost:3000")
   })

   it("has title", () => {
      cy.get("h1").should("be.visible")
      cy.get("h1").should("contain", "Real-time Departures")
   })

   it("populates routes in select", () => {
      cy.get("select").find("option").should("have.length.above", 1)
   })

   it("populates directions in select after selecting route", () => {
      cy.get("select").select(1)
      cy.get("select").eq(1).find("option").should("have.length.above", 1)
   })

   it("populates stop in select after selecting route and direction", () => {
      cy.get("select").select(1)
      cy.get("select").eq(1).select(1)
      cy.get("select").eq(2).find("option").should("have.length.above", 1)
   })

   it("displays departures table only after selecting route, direction, and stop", () => {
      cy.get("table").should("not.exist")
      cy.get("select").select(1)
      cy.get("table").should("not.exist")
      cy.get("select").eq(1).select(1)
      cy.get("table").should("not.exist")
      cy.get("select").eq(2).select(1)
      cy.get("table").should("exist")
      cy.get("table").should("be.visible")
   })

})