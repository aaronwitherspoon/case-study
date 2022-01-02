/// <reference types="cypress" />

context("Main", () => {
   const url = "http://localhost:3000/"
   beforeEach(() => {
      cy.visit(url)
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
      cy.get("thead").should("be.visible")
      cy.get("tbody").should("be.visible")
   })

   it("removes table after selecting different route", () => {
      cy.get("table").should("not.exist")
      cy.get("select").select(1)
      cy.get("table").should("not.exist")
      cy.get("select").eq(1).select(1)
      cy.get("table").should("not.exist")
      cy.get("select").eq(2).select(1)
      cy.get("table").should("exist")
      cy.get("table").should("be.visible")
      cy.get("select").eq(0).select(2)
      cy.get("table").should("not.exist")
      cy.get("select").eq(2).should("not.exist")
   })

   it("toggles between by route and by stop", () => {
      cy.get("select").should("be.visible")
      cy.get("input").should("not.exist")
      cy.get("button").eq(1).click()
      cy.get("select").should("not.exist")
      cy.get("input").should("be.visible")
      cy.get("button").eq(0).click()
      cy.get("select").should("be.visible")
      cy.get("input").should("not.exist")
   })

   it("routes to stopId page when searching by stop number and displays departure table", () => {
      const stopId = "51405"
      cy.get("button").eq(1).click()
      cy.get("input").type(stopId)
      cy.get("form").submit()
      cy.url().should("contain", stopId)
      cy.get("table").should("exist")
      cy.get("table").should("be.visible")
      cy.get("thead").should("be.visible")
      cy.get("tbody").should("be.visible")
   })

   it("returns to home page from stopIdpage when clicking home link", () => {
      const stopId = "51405"
      cy.get("button").eq(1).click()
      cy.get("input").type(stopId)
      cy.get("form").submit()
      cy.url().should("contain", stopId)
      cy.get("a").click()
      cy.url().should("equal", url)
   })
   
   it("displays invalid stop number", () => {
      const stopId = "514r3r405tgt4a"
      cy.get("button").eq(1).click()
      cy.get("input").type(stopId)
      cy.get("form").submit()
      cy.get("thead").should("contain", "Invalid Stop #")
      cy.get("thead").should("contain", `Stop #: ${stopId}`)
      cy.get("td").should("contain", "There are no departures at this time")
   })

})